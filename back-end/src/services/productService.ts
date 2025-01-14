import { findProductById, createProduct, updateProduct, deleteProduct, findAllProducts, findProductByName } from '../models/product';

export const addProduct = async (name: string, description: string, price: number, stock: number) => {
  // Check if a product with the same name already exists
  const existingProduct = await findProductByName(name);
  if (existingProduct) {
    throw new Error('Product with the name already exists');
  }

  const newProductId = await createProduct(name, description, price, stock);
  return await findProductById(newProductId);
};

export const editProduct = async (id: number, data: { name?: string; description?: string; price?: number; stock?: number }) => {
  await updateProduct(id, data);
  return await findProductById(id);
};

export const removeProduct = async (id: number) => {
  await deleteProduct(id);
};

export const getProductById = async (id: number) => {
  const product = await findProductById(id);
  if (!product) throw new Error('Product not found');
  return product;
};

export const getAllProducts = async () => {
  return await findAllProducts();
};