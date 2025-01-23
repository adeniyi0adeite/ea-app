// routes/orderRoutes.ts

import { Router } from 'express';
import { createOrderController, deleteUserOrderController, updateUserOrderController, getUserOrderByOrderIdController, getAllUserOrdersController } from '../controllers/orderController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

// Route to create a new order
router.post('/create', authenticate, createOrderController);

// Route to delete a user order by ID
router.delete('/delete/:orderId', authenticate, deleteUserOrderController);

// Route to update a user order by ID
router.put('/update/:orderId', authenticate, updateUserOrderController);

// Route to get a user order by order ID
router.get('/get/:orderId', authenticate, getUserOrderByOrderIdController);

// Route to get all user orders
router.get('/all', authenticate, getAllUserOrdersController);

export const orderRoutes = router;
