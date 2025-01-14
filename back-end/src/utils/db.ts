// src/db.ts
import knex from 'knex';
import config from '../../knexfile';

// Select the correct environment configuration
const environment = process.env.NODE_ENV || 'development';
const db = knex(config[environment]);

export default db;
