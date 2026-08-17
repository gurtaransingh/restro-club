import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { Pool, QueryResult } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private pool: Pool;
  private readonly logger = new Logger(DatabaseService.name);

  constructor() {
    const connectionString =
      process.env.DATABASE_URL ||
      'postgresql://postgres:2366@localhost:5432/restro_club_db';

    this.pool = new Pool({
      connectionString,
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000,
    });

    this.pool.on('error', (err) => {
      this.logger.error('Unexpected PostgreSQL Pool Error:', err);
    });
  }

  async onModuleInit() {
    try {
      const res = await this.pool.query('SELECT NOW() as now, current_database() as db;');
      this.logger.log(`✅ Connected to PostgreSQL [${res.rows[0]?.db}] at ${res.rows[0]?.now}`);
    } catch (err) {
      this.logger.warn(`⚠️ PostgreSQL Connection Warning: ${(err as Error).message}`);
    }
  }

  async onModuleDestroy() {
    await this.pool.end();
  }

  async query<T = any>(text: string, params?: any[]): Promise<QueryResult<T>> {
    const start = Date.now();
    try {
      const res = await this.pool.query<T>(text, params);
      const duration = Date.now() - start;
      if (duration > 100) {
        this.logger.debug(`[Slow Query ${duration}ms] ${text.slice(0, 80)}...`);
      }
      return res;
    } catch (err) {
      this.logger.error(`Database Query Error: ${(err as Error).message} - Query: ${text}`);
      throw err;
    }
  }

  getPool(): Pool {
    return this.pool;
  }
}
