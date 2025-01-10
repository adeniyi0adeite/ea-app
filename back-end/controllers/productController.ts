// Handles product-related logic


import { Request, Response } from 'express';
import { Product } from '../models/Product'; // Import your product model

// Get all products
const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.findAll(); // Fetch all products from the database
    res.json(products); // Send products as JSON
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error });
  }
};

// Get a product by ID
const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findByPk(req.params.id); // Find product by ID
    if (product) {
      res.json(product); // Send the product as JSON
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error });
  }
};

export { getProducts, getProductById }; // Export both functions

