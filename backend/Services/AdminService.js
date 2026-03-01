const { query } = require('../Utils/db');
const { HttpError } = require('../Utils/http');
const { hashPassword, verifyPassword } = require('../Utils/auth.utils');
const { signToken } = require('../Utils/jwt.utils');


function mapAdmin(row) {
  return {
    id: row.id,
    first_name: row.first_name,
    last_name: row.last_name,
    email: row.email,
    password: row.password,
    role: row.role,
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

async function list() {
  const rows = await query('SELECT * FROM admins WHERE role = "admin"');
  return rows.map(mapAdmin);
}

async function getById(id) {
  const rows = await query('SELECT * FROM admins WHERE id = :id', { id });
  const row = rows[0];
  if (!row) throw new HttpError(404, 'Admin not found');
  return mapAdmin(row);
}

async function create(payload) {
  const required = ['first_name', 'last_name', 'email', 'password'];
  const missing = required.filter((k) => !payload[k]);
  if (missing.length) throw new HttpError(400, 'Missing required fields', { missing });
  payload.password = await hashPassword(payload.password);

  try {
    const result = await query(
      `INSERT INTO admins
        (first_name, last_name, email, password, role)
       VALUES
        (:first_name, :last_name, :email, :password, "admin")`,
      {
        first_name: payload.first_name,
        last_name: payload.last_name,
        email: payload.email,
        password: payload.password
      }
    );

    return getById(result.insertId);
  } catch (err) {
    // 1062 = duplicate key (email unique)
    if (err && err.code === 'ER_DUP_ENTRY') {
      throw new HttpError(409, 'Email already exists');
    }
    throw err;
  }
}

async function logAdmin(payload) {
  const rows = await query('SELECT * FROM admins WHERE email = :email', { email: payload.email });
  const row = rows[0];
  if (!row) throw new HttpError(404, 'Admin not found');
  await verifyPassword(payload.password, row.password);

  const token = signToken({ id: row.id, role: row.role });

  return {
    admin: mapAdmin(row),
    token,
  };
}

async function update(id, payload) {
  // Ensure exists
  await getById(id);

  await query(
    `UPDATE admins SET
      first_name = :first_name,
      last_name = :last_name,
      email = :email,
      password = :password
     WHERE id = :id`,
    {
      id,
      first_name: payload.first_name,
      last_name: payload.last_name,
      email: payload.email,
      password: payload.password
    }
  );

  return getById(id);
}

async function remove(id) {
  // Ensure exists
  await getById(id);
  await query('DELETE FROM admins WHERE id = :id', { id });
  return true;
}

module.exports = {
  list,
  getById,
  create,
  update,
  logAdmin,
  remove,
};

