const env = require('./env');
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: env.DB_HOST,
  port: env.DB_PORT,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,

  namedPlaceholders: true,
  timezone: 'Z',
  charset: 'utf8mb4',
});

async function checkDatabaseConnection() {
  const connection = await pool.getConnection();
  await connection.ping();
  connection.release();
  console.log('Database connected');
}

module.exports = {
  pool,
  checkDatabaseConnection,
};
