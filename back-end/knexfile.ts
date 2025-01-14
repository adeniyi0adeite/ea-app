// knexfile.ts
import type { Knex } from "knex";
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from a .env file

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'mysql2', // or 'pg' for PostgreSQL, 'sqlite3' for SQLite, etc.
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    migrations: {
      directory: './migrations',
    },
    seeds: {
      directory: './seeds',
    },
  },

  production: {
    client: 'mysql2',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    migrations: {
      directory: './migrations',
    },
    seeds: {
      directory: './seeds',
    },
  },
};

export default config;
