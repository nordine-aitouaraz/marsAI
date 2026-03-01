const { query } = require('../Utils/db');
const { HttpError } = require('../Utils/http');

function mapPartner(row) {
  return {
    id: row.id,
    name: row.name,
    logo_url: row.logo_url,
    description: row.description,
    website_url: row.website_url,
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

async function list() {
  const rows = await query('SELECT * FROM partners ORDER BY id DESC');
  return rows.map(mapPartner);
}

async function getById(id) {
  const rows = await query('SELECT * FROM partners WHERE id = :id', { id });
  const row = rows[0];
  if (!row) throw new HttpError(404, 'Partner not found');
  return mapPartner(row);
}

async function create(payload) {
  const required = ['name'];
  const missing = required.filter((k) => !payload[k]);
  if (missing.length) throw new HttpError(400, 'Missing required fields', { missing });

  const result = await query(
    `INSERT INTO partners
      (name, logo_url, description, website_url)
     VALUES
      (:name, :logo_url, :description, :website_url)`,
    {
      name: payload.name,
      logo_url: payload.logo_url ?? null,
      description: payload.description ?? null,
      website_url: payload.website_url ?? null,
    }
  );

  return getById(result.insertId);
}

async function update(id, payload) {
  // Ensure exists
  await getById(id);

  await query(
    `UPDATE partners SET
      name = :name,
      logo_url = :logo_url,
      description = :description,
      website_url = :website_url
     WHERE id = :id`,
    {
      id,
      name: payload.name ?? null,
      logo_url: payload.logo_url ?? null,
      description: payload.description ?? null,
      website_url: payload.website_url ?? null,
    }
  );

  return getById(id);
}

async function remove(id) {
  // Ensure exists
  await getById(id);
  await query('DELETE FROM partners WHERE id = :id', { id });
  return true;
}

module.exports = {
  list,
  getById,
  create,
  update,
  remove,
};

