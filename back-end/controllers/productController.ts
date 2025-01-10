// Handles product-related logic
import { Request, Response } from 'express';
import { Product } from '../models/Product';

const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error });
  }
};

export { getProducts };
