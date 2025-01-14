// src/testConnection.ts
import knex from 'knex';
import config from '../knexfile';

const environment = process.env.NODE_ENV || 'development';
const db = knex(config[environment]);

db.raw('SELECT 1 + 1 AS result')
  .then(() => {
    console.log('Database connected successfully!');
    db.destroy(); // Close the connection
  })
  .catch((err) => {
    console.error('Database connection failed:', err);
    db.destroy(); // Close the connection in case of error
  });
