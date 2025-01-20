// routes/orderRoutes.ts
import { Router } from 'express';
import { createOrderController } from '../controllers/orderController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

// Route to create a new order
router.post('/create', authenticate, createOrderController);

export const orderRoutes = router;
