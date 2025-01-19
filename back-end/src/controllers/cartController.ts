import { Request, Response } from 'express';
import { addItemToCart, removeItemFromCart, clearUserCart, getUserCartItems, updateItemQuantityInCart } from '../services/cartService';

export const addToCart = async (req: Request, res: Response) => {
  const userId = (req as any).user.id; // Assuming you have user authentication
  const { productId, quantity } = req.body;
  try {
    const cartItem = await addItemToCart(userId, productId, quantity);
    res.status(201).json(cartItem);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};



export const removeFromCart = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const { id: productId } = req.params; // Extract productId from URL parameters

  try {
    const response = await removeItemFromCart(userId, Number(productId)); // Call service
    res.status(200).json(response); // Send success response
  } catch (error) {
    res.status(400).json({ message: (error as Error).message }); // Send error message if any
  }
};


export const clearCart = async (req: Request, res: Response) => {
  const userId = (req as any).user.id; // Get the userId from the authenticated user

  try {
    const response = await clearUserCart(userId); // Call the service to clear the cart
    res.status(200).json(response); // Respond with success
  } catch (error) {
    res.status(400).json({ message: (error as Error).message }); // Respond with error if something goes wrong
  }
};



// Controller for fetching user cart items
export const getCartItems = async (req: Request, res: Response) => {
  const userId = (req as any).user.id; // Assuming user authentication is done with JWT

  try {
    const cartItems = await getUserCartItems(userId);
    res.status(200).json(cartItems); // Return the cart items
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};



export const updateQuantityInCart = async (req: Request, res: Response) => {
  const userId = (req as any).user.id; // Assuming you have user authentication
  const { productId, quantity } = req.body; // Quantity comes from the request body

  try {
    const updatedCartItem = await updateItemQuantityInCart(userId, productId, quantity);
    res.status(200).json(updatedCartItem); // Respond with the updated cart item
  } catch (error) {
    res.status(400).json({ message: (error as Error).message }); // Respond with error if any
  }
};

