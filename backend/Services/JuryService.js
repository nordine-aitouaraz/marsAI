const { query } = require('../Utils/db');
const { HttpError } = require('../Utils/http');

function mapJury(row) {
  return {
    id: row.id,
    first_name: row.first_name,
    last_name: row.last_name,
    role: row.role,
    bio: row.bio,
    photo_url: row.photo_url,
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

async function list() {
  const rows = await query('SELECT * FROM jury ORDER BY id DESC');
  return rows.map(mapJury);
}

async function getById(id) {
  const rows = await query('SELECT * FROM jury WHERE id = :id', { id });
  const row = rows[0];
  if (!row) throw new HttpError(404, 'Jury member not found');
  return mapJury(row);
}

async function create(payload) {
  const required = ['first_name', 'last_name'];
  const missing = required.filter((k) => !payload[k]);
  if (missing.length) throw new HttpError(400, 'Missing required fields', { missing });

  const result = await query(
    `INSERT INTO jury
      (first_name, last_name, role, bio, photo_url)
     VALUES
      (:first_name, :last_name, :role, :bio, :photo_url)`,
    {
      first_name: payload.first_name,
      last_name: payload.last_name,
      role: payload.role ?? null,
      bio: payload.bio ?? null,
      photo_url: payload.photo_url ?? null,
    }
  );

  return getById(result.insertId);
}

async function update(id, payload) {
  // Ensure exists
  await getById(id);

  await query(
    `UPDATE jury SET
      first_name = :first_name,
      last_name = :last_name,
      role = :role,
      bio = :bio,
      photo_url = :photo_url
     WHERE id = :id`,
    {
      id,
      first_name: payload.first_name ?? null,
      last_name: payload.last_name ?? null,
      role: payload.role ?? null,
      bio: payload.bio ?? null,
      photo_url: payload.photo_url ?? null,
    }
  );

  return getById(id);
}

async function remove(id) {
  // Ensure exists
  await getById(id);
  await query('DELETE FROM jury WHERE id = :id', { id });
  return true;
}

module.exports = {
  list,
  getById,
  create,
  update,
  remove,
};

