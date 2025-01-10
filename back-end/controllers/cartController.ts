// Handles cart logic
import { Request, Response } from 'express';

const getCartItems = async (req: Request, res: Response) => {
  // Cart logic here
  res.json({ message: 'Cart items fetched successfully' });
};

const addToCart = async (req: Request, res: Response) => {
  const { productId } = req.body;
  // Add to cart logic here
  res.json({ message: 'Product added to cart' });
};

export { getCartItems, addToCart };
