const {pool} = require('../Config/db');

async function query(sql, params = {}) {
  const [rows] = await pool.execute(sql, params);
  return rows;
}

async function withTransaction(fn) {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    const api = {
      query: async (sql, params = {}) => {
        const [rows] = await conn.execute(sql, params);
        return rows;
      },
    };
    const result = await fn(api);
    await conn.commit();
    return result;
  } catch (err) {
    try {
      await conn.rollback();
    } catch (_) {
      // ignore rollback errors
    }
    throw err;
  } finally {
    conn.release();
  }
}

async function ping() {
  await query('SELECT 1 as ok');
  return true;
}

module.exports = {
  pool,
  query,
  withTransaction,
  ping,
};

