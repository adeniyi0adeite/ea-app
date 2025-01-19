import { Router } from 'express';
import { addToCart, removeFromCart, clearCart, getCartItems, updateQuantityInCart } from '../controllers/cartController';
import { authenticate } from '../middleware/authMiddleware'; // Assuming you have authentication

const router = Router();

// Add item to cart
router.post('/add', authenticate, addToCart);

// Remove item from cart
router.delete('/remove/:id', authenticate, removeFromCart);

// Get user cart items from cart
router.get('/', authenticate, getCartItems);

// Update item quantity in cart
router.put('/update', authenticate, updateQuantityInCart);

// Clear the cart
router.delete('/clear', authenticate, clearCart);

export const cartRoutes = router;
