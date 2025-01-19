import { Request, Response } from 'express';
import { addProduct, editProduct, removeProduct, getProductById, getAllProducts } from '../services/productService';

// Add a new product
export const create = async (req: Request, res: Response): Promise<void> => {
  const { name, description, price, stock } = req.body;
  try {
    const product = await addProduct(name, description, price, stock);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

// Update a product by ID
export const update = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const data = req.body;
  try {
    const updatedProduct = await editProduct(Number(id), data);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

// Delete a product by ID
export const remove = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    await removeProduct(Number(id));
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

// Get a product by ID
export const getOne = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const product = await getProductById(Number(id));
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ message: (error as Error).message });
  }
};

// Get all products
export const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
