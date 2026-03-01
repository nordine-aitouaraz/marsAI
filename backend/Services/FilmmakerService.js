const { query } = require('../Utils/db');
const { HttpError } = require('../Utils/http');

function mapFilmmaker(row) {
  return {
    id: row.id,
    civility: row.civility,
    first_name: row.first_name,
    last_name: row.last_name,
    birth_date: row.birth_date,
    email: row.email,
    phone: row.phone,
    mobile: row.mobile,
    job: row.job,
    street: row.street,
    postal_code: row.postal_code,
    city: row.city,
    country: row.country,
    discovery_source: row.discovery_source,
    newsletter: !!row.newsletter,
  };
}

async function list() {
  const rows = await query('SELECT * FROM filmmaker ORDER BY id DESC');
  return rows.map(mapFilmmaker);
}

async function getById(id) {
  const rows = await query('SELECT * FROM filmmaker WHERE id = :id', { id });
  const row = rows[0];
  if (!row) throw new HttpError(404, 'Filmmaker not found');
  return mapFilmmaker(row);
}

async function create(payload) {
  const required = ['first_name', 'last_name', 'birth_date', 'email'];
  const missing = required.filter((k) => !payload[k]);
  if (missing.length) throw new HttpError(400, 'Missing required fields', { missing });

  try {
    const result = await query(
      `INSERT INTO filmmaker
        (civility, first_name, last_name, birth_date, email, phone, mobile, job, street, postal_code, city, country, discovery_source, newsletter)
       VALUES
        (:civility, :first_name, :last_name, :birth_date, :email, :phone, :mobile, :job, :street, :postal_code, :city, :country, :discovery_source, :newsletter)`,
      {
        civility: payload.civility ?? null,
        first_name: payload.first_name,
        last_name: payload.last_name,
        birth_date: payload.birth_date,
        email: payload.email,
        phone: payload.phone ?? null,
        mobile: payload.mobile ?? null,
        job: payload.job ?? null,
        street: payload.street ?? null,
        postal_code: payload.postal_code ?? null,
        city: payload.city ?? null,
        country: payload.country ?? null,
        discovery_source: payload.discovery_source ?? null,
        newsletter: payload.newsletter ? 1 : 0,
      }
    );

    // Si le réalisateur souhaite la newsletter, on enregistre son email dans la table newsletters
    if (payload.newsletter) {
      try {
        await query(
          'INSERT INTO newsletters (email) VALUES (:email)',
          { email: payload.email }
        );
      } catch (err) {
        // 1062 = duplicate (email déjà inscrit) → on ignore
        if (!(err && err.code === 'ER_DUP_ENTRY')) {
          throw err;
        }
      }
    }

    return getById(result.insertId);
  } catch (err) {
    throw err;
  }
}

async function update(id, payload) {
  // Ensure exists
  const existing = await getById(id);

  await query(
    `UPDATE filmmaker SET
      civility = :civility,
      first_name = :first_name,
      last_name = :last_name,
      birth_date = :birth_date,
      email = :email,
      phone = :phone,
      mobile = :mobile,
      job = :job,
      street = :street,
      postal_code = :postal_code,
      city = :city,
      country = :country,
      discovery_source = :discovery_source,
      newsletter = :newsletter
     WHERE id = :id`,
    {
      id,
      civility: payload.civility ?? null,
      first_name: payload.first_name ?? null,
      last_name: payload.last_name ?? null,
      birth_date: payload.birth_date ?? null,
      email: payload.email ?? null,
      phone: payload.phone ?? null,
      mobile: payload.mobile ?? null,
      job: payload.job ?? null,
      street: payload.street ?? null,
      postal_code: payload.postal_code ?? null,
      city: payload.city ?? null,
      country: payload.country ?? null,
      discovery_source: payload.discovery_source ?? null,
      newsletter: payload.newsletter ? 1 : 0,
    }
  );

  // Si le champ newsletter vient d'être activé, on inscrit l'email dans newsletters
  if (payload.newsletter && !existing.newsletter && (payload.email || existing.email)) {
    const email = payload.email || existing.email;
    try {
      await query(
        'INSERT INTO newsletters (email) VALUES (:email)',
        { email }
      );
    } catch (err) {
      if (!(err && err.code === 'ER_DUP_ENTRY')) {
        throw err;
      }
    }
  }

  return getById(id);
}

async function remove(id) {
  // Ensure exists
  await getById(id);
  await query('DELETE FROM filmmaker WHERE id = :id', { id });
  return true;
}

module.exports = {
  list,
  getById,
  create,
  update,
  remove,
};

