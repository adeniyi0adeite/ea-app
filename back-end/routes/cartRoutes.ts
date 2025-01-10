// Cart routes
import express from 'express';
import { getCartItems, addToCart } from '../controllers/cartController';

const router = express.Router();

router.get('/', getCartItems);
router.post('/', addToCart);

export { router as cartRoutes };
