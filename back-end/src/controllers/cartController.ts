import { Request, Response } from 'express';
import { addItemToCart, removeItemFromCart, getUserCartItems, clearUserCart } from '../services/cartService';

// Add item to cart
export const addToCart = async (req: Request, res: Response) => {
  const userId = (req as any).user.id; // Assuming you have user authentication
  const { productId, quantity, price } = req.body;
  try {
    const cartItem = await addItemToCart(userId, productId, quantity, price);
    res.status(201).json(cartItem);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

// Remove item from cart
export const removeFromCart = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const { id } = req.params;
  try {
    await removeItemFromCart(userId, Number(id));
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

// Get all items in the cart
export const getCartItems = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  try {
    const cartItems = await getUserCartItems(userId);
    res.status(200).json(cartItems);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

// Clear the cart
export const clearCart = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  try {
    await clearUserCart(userId);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};
