import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const poolConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'taskmanager',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'taskmanager',
  port: process.env.DB_PORT || 5432,
};

const pool = new Pool(poolConfig);

// Test the connection immediately
pool.connect()
  .then((client) => {
    console.log('Connected to PostgreSQL database');
    client.release();
  })
  .catch((err) => {
    console.error('Database connection error:', err);
    process.exit(1);
  });

pool.on('error', (err) => {
  console.error('Unexpected database error:', err);
});

export const query = (text, params) => pool.query(text, params);
export default pool;