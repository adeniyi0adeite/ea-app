import { Router } from 'express';
import { addToCart, removeFromCart, getCartItems, clearCart } from '../controllers/cartController';
import { authenticate } from '../middleware/authMiddleware'; // Assuming you have authentication

const router = Router();

// Add item to cart
router.post('/add', authenticate, addToCart);

// Remove item from cart
router.delete('/remove/:id', authenticate, removeFromCart);

// Get all items in the cart
router.get('/', authenticate, getCartItems);

// Clear the cart
router.delete('/clear', authenticate, clearCart);

export const cartRoutes = router;
