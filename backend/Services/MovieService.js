const { get } = require('../Routes');
const { query, withTransaction } = require('../Utils/db');
const { HttpError } = require('../Utils/http');

function mapMovie(row) {
  const movie = {
    id: row.id,
    original_title: row.original_title,
    english_title: row.english_title,
    duration: row.duration,
    language: row.language,
    synopsis_original: row.synopsis_original,
    synopsis_english: row.synopsis_english,
    youtube_url: row.youtube_url ?? null,
    video_url: row.video_url ?? null,
    status: row.status,
    decision_reason: row.decision_reason,
    decision_at: row.decision_at,
    filmmaker_id: row.filmmaker_id,
    is_winner: !!row.winner_id,
    winner_ranking: row.winner_ranking ?? null,
    winner_category: row.winner_category ?? null,
  };
  if (row.filmmaker_first_name != null || row.filmmaker_last_name != null) {
    movie.filmmaker = {
      first_name: row.filmmaker_first_name ?? '',
      last_name: row.filmmaker_last_name ?? '',
    };
  }
  return movie;
}

async function list() {
  const rows = await query(
    `SELECT
       m.*,
       w.id AS winner_id,
       w.ranking AS winner_ranking,
       w.category AS winner_category,
       f.first_name AS filmmaker_first_name,
       f.last_name AS filmmaker_last_name
     FROM movie m
     LEFT JOIN winner w ON w.movie_id = m.id
     LEFT JOIN filmmaker f ON f.id = m.filmmaker_id
     WHERE m.status = 'selected'
     ORDER BY m.id DESC`
  );
  return rows.map(mapMovie);
}

async function listWinners() {
  const rows = await query(
    `SELECT
       m.*,
       w.id AS winner_id,
       w.ranking AS winner_ranking,
       w.category AS winner_category,
       f.first_name AS filmmaker_first_name,
       f.last_name AS filmmaker_last_name
     FROM winner w
     INNER JOIN movie m ON m.id = w.movie_id
     LEFT JOIN filmmaker f ON f.id = m.filmmaker_id
     ORDER BY w.ranking ASC, w.id ASC
     LIMIT 6`
  );
  return rows.map(mapMovie);
}

async function getById(id) {
  const rows = await query(
    `SELECT
       m.*,
       w.id AS winner_id,
       w.ranking AS winner_ranking,
       w.category AS winner_category
     FROM movie m
     LEFT JOIN winner w ON w.movie_id = m.id
     WHERE m.id = :id`,
    { id }
  );
  const row = rows[0];
  if (!row) throw new HttpError(404, 'Movie not found');
  return mapMovie(row);
}

async function remove(id) {
  await getById(id);
  await query('DELETE FROM movie WHERE id = :id', { id });
  return true;
}

async function listAssets(movieId) {
  await getById(movieId);
  return query('SELECT * FROM asset WHERE movie_id = :movieId ORDER BY id DESC', { movieId });
}

async function getAssetById(movieId, assetId) {
  await getById(movieId);
  return query('SELECT * FROM asset WHERE movie_id = :movieId AND id = :assetId', { movieId, assetId });
}

async function addAsset(movieId, payload) {
  await getById(movieId);
  const result = await query(
    `INSERT INTO asset (asset_type, file_path, file_format,movie_id)
     VALUES (:asset_type, :file_path, :file_format, :movie_id)`,
    {
      movie_id: movieId,
      asset_type: payload.asset_type ?? null,
      file_path: payload.file_path ?? null,
      file_format: payload.file_format ?? null,
    }
  );
  return getAssetById(movieId, result.insertId);
}


async function listCollaborators(movieId) {
  await getById(movieId);
  return query('SELECT * FROM collaborator WHERE movie_id = :movieId ORDER BY id DESC', { movieId });
}

async function addCollaborator(movieId, payload) {
  await getById(movieId);
  const result = await query(
    `INSERT INTO collaborator (civility, first_name, last_name, role, email, movie_id)
     VALUES (:civility, :first_name, :last_name, :role, :email, :movie_id)`,
    {
      movie_id: movieId,
      civility: payload.civility ?? null,
      first_name: payload.first_name ?? null,
      last_name: payload.last_name ?? null,
      role: payload.role ?? null,
      email: payload.email ?? null,
    }
  );
  return getMovieCollaboratorsById(movieId);
}

async function getMovieCollaboratorsById(id) {
  return query('SELECT * FROM collaborator WHERE movie_id = :id', { id });
}

async function listTags(movieId) {
  await getById(movieId);
  return query(
    `SELECT t.id, t.label
     FROM tag t
     INNER JOIN movie_tag mt ON mt.tag_id = t.id
     WHERE mt.movie_id = :movieId
     ORDER BY t.label ASC`,
    { movieId }
  );
}

async function addTag(movieId, label) {
  if (!label) throw new HttpError(400, 'Missing tag label');

  return withTransaction(async (trx) => {
    await getById(movieId);

    // Upsert tag by label (unique)
    let tagRows = await trx.query('SELECT id, label FROM tag WHERE label = :label', { label });
    let tagId;
    if (tagRows[0]) {
      tagId = tagRows[0].id;
    } else {
      const insertTag = await trx.query('INSERT INTO tag (label) VALUES (:label)', { label });
      tagId = insertTag.insertId;
    }

    // Link (ignore if already exists)
    try {
      await trx.query('INSERT INTO movie_tag (movie_id, tag_id) VALUES (:movieId, :tagId)', { movieId, tagId });
    } catch (err) {
      if (err && err.code !== 'ER_DUP_ENTRY') throw err;
    }

    return listTags(movieId);
  });
}

async function removeTag(movieId, tagId) {
  await getById(movieId);
  await query('DELETE FROM movie_tag WHERE movie_id = :movieId AND tag_id = :tagId', { movieId, tagId });
  return listTags(movieId);
}

async function getAiDeclaration(movieId) {
  await getById(movieId);
  const rows = await query('SELECT * FROM ai_declaration WHERE movie_id = :movieId', { movieId });
  return rows[0] || null;
}

async function upsertAiDeclaration(movieId, payload) {
  await getById(movieId);
  if (!payload || !payload.artwork_type) throw new HttpError(400, 'Missing artwork_type');

  return withTransaction(async (trx) => {
    const existing = await trx.query('SELECT id FROM ai_declaration WHERE movie_id = :movieId', { movieId });
    if (existing[0]) {
      await trx.query(
        `UPDATE ai_declaration SET
          artwork_type = :artwork_type,
          tech_stack = :tech_stack,
          methodology = :methodology
         WHERE movie_id = :movieId`,
        {
          movieId,
          artwork_type: payload.artwork_type,
          tech_stack: payload.tech_stack ?? null,
          methodology: payload.methodology ?? null,
        }
      );
    } else {
      await trx.query(
        `INSERT INTO ai_declaration (artwork_type, tech_stack, methodology, movie_id)
         VALUES (:artwork_type, :tech_stack, :methodology, :movieId)`,
        {
          movieId,
          artwork_type: payload.artwork_type,
          tech_stack: payload.tech_stack ?? null,
          methodology: payload.methodology ?? null,
        }
      );
    }
    return getAiDeclaration(movieId);
  });
}

async function setVideoUrl(movieId, url) {
  await query(
    'UPDATE movie SET video_url = :url WHERE id = :movieId',
    { movieId, url }
  );
  return getById(movieId);
}

async function setYoutubeUrl(movieId, url) {
  await query(
    'UPDATE movie SET youtube_url = :url WHERE id = :movieId',
    { movieId, url }
  );
  return getById(movieId);
}

module.exports = {
  list,
  getById,
  remove,
  setVideoUrl,
  setYoutubeUrl,
  listAssets,
  addAsset,
  getAssetById,
  listCollaborators,
  addCollaborator,
  listTags,
  addTag,
  removeTag,
  getAiDeclaration,
  upsertAiDeclaration,
  listWinners,
};

