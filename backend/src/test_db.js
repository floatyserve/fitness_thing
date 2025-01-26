const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

(async () => {
  try {
    const res = await pool.query('SELECT * FROM training');
    console.log('Data from training table:', res.rows);
    await pool.end();
  } catch (err) {
    console.error('Database connection error:', err);
  }
})();
