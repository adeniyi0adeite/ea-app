// routes/paymentRoutes.ts

import { Router } from 'express';
import { PaymentController } from '../controllers/paymentController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

router.post('/initialize', authenticate, PaymentController.initializePayment);
router.get('/verify', authenticate, PaymentController.verifyPayment);

export const paymentRoutes = router;