import express from 'express';
import bodyParser from 'body-parser';
import { userRoutes } from './routes/userRoutes';
import { productRoutes } from './routes/productRoutes';
import { cartRoutes } from './routes/cartRoutes'; // Import cart routes
import knex from './utils/db'; // Correct import for knex

import cors from 'cors';


const app = express();
app.use(cors());


// Middleware
app.use(bodyParser.json());

// Function to reset the database
// const resetDatabase = async () => {
//   try {
//     await knex.schema.dropTableIfExists('users');
//     await knex.schema.createTable('users', (table) => {
//       table.increments('id').primary();
//       table.string('username', 50).notNullable().unique();
//       table.string('email', 100).notNullable().unique();
//       table.string('password', 100).notNullable();
//       table.timestamp('createdAt').defaultTo(knex.fn.now()).notNullable();
//       table.timestamp('updatedAt').defaultTo(knex.fn.now()).notNullable();
//     });
//     console.log('Database reset successfully');
//   } catch (error) {
//     console.error('Error resetting database:', error);
//   }
// };

// Reset the database on server start
// resetDatabase();

// Routes
app.use('/api/user', userRoutes);
app.use('/api/product', productRoutes); // Use product routes
app.use('/api/cart', cartRoutes); // Use cart routes

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error stack:', err.stack);
  console.error('Error message:', err.message);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;