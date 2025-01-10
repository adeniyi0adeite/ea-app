// Server entry point
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
app.use(cors()); // Allow cross-origin requests from frontend
app.use(bodyParser.json()); // Parse incoming JSON requests

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);

// Database connection and sync
db.sync({ force: false }) // Avoid setting `force: true` in production, as it drops tables
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
