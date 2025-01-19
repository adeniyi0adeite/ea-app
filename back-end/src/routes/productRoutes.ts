import { Router } from 'express';
import { create, update, remove, getOne, getAll } from '../controllers/productController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

// Product CRUD routes
router.post('/create', authenticate, create); // Add a new product
router.put('/update/:id', authenticate, update); // Update a product by ID
router.delete('/remove/:id', authenticate, remove); // Delete a product by ID
router.get('/:id', getOne); // Get a product by ID
router.get('/', getAll); // Get all products

export const productRoutes = router;
