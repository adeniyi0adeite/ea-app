// Product-related routes
import { Router } from 'express';
import { createProduct, getProducts, getProductById } from '../controllers/productController'; // Import the functions
import { validateProduct } from '../middleware/validateProduct';


const router = Router();

// Define routes for fetching products
router.get('/', getProducts); // GET /api/products - Get all products
router.get('/:id', getProductById); // GET /api/products/:id - Get product by ID


// Route for creating a product
router.post('/', validateProduct, createProduct);



export { router as productRoutes };
