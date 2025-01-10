import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { authRoutes } from './routes/authRoutes';
import { productRoutes } from './routes/productRoutes';
import { cartRoutes } from './routes/cartRoutes';
import { db } from './config/db';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);

// Database connection and sync
db.sync({ force: true }) // Avoid using force: true in production to prevent data loss
  .then(() => {
    console.log('Database connected and synced successfully');
  })
  .catch((error) => {
    console.error('Database connection error:', error);
  });

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
