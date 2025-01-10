// Product-related routes
import { Router } from 'express';
import { getProducts, getProductById } from '../controllers/productController'; // Import the functions

const router = Router();

// Define routes for fetching products
router.get('/', getProducts); // GET /api/products - Get all products
router.get('/:id', getProductById); // GET /api/products/:id - Get product by ID

export { router as productRoutes };
