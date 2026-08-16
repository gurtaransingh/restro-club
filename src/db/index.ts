import { Pool, QueryResult, QueryResultRow } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const connectionString =
  process.env.DATABASE_URL || 'postgresql://postgres:2366@localhost:5432/restro_club_db';

export const pool = new Pool({
  connectionString,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 4000,
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle PostgreSQL client', err);
});

export async function query<T extends QueryResultRow = any>(
  text: string,
  params?: any[]
): Promise<QueryResult<T>> {
  const start = Date.now();
  try {
    const res = await pool.query<T>(text, params);
    const duration = Date.now() - start;
    if (process.env.NODE_ENV !== 'production' && duration > 50) {
      console.log(`[PG Query] ${text.slice(0, 80)}... (${duration}ms, rows: ${res.rowCount})`);
    }
    return res;
  } catch (error) {
    console.error(`[PG Query Error] ${text}`, error);
    throw error;
  }
}

export async function testConnection(): Promise<boolean> {
  try {
    const res = await query('SELECT NOW() as now, current_database() as db;');
    console.log(`✅ Connected to PostgreSQL [${res.rows[0].db}] at ${res.rows[0].now}`);
    return true;
  } catch (e) {
    console.warn('⚠️ PostgreSQL connection check failed, using fallback store:', e);
    return false;
  }
}
