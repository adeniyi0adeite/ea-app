// Handles product-related logic


import { Request, Response } from 'express';
import { Product } from '../models/Product';

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

// Create a new product
const createProduct = async (req: Request, res: Response) => {
  const { name, description, price } = req.body;

  try {
    // Create the new product
    const newProduct = await Product.create({
      name,
      description,
      price,
    });

    console.log(newProduct);


    // Sequelize instance has an `.get()` method that retrieves data, which includes the `id`
    const productResponse = newProduct.get();
    
    console.log(newProduct);

    res.status(201).json(productResponse); // Return the full product object including the auto-generated id
  } catch (error) {
    res.status(500).json({ message: 'Error creating product', error });
  }
};


export { createProduct, getProducts, getProductById };
