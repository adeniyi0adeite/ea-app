import knex from '../utils/db';

export const findProductById = async (id: number) => {
  return knex('products').where({ id }).first();
};

export const findProductByName = async (name: string) => {
  return knex('products').where({ name }).first();
};

export const createProduct = async (name: string, description: string, price: number, stock: number) => {
  const [newProductId] = await knex('products').insert({
    name,
    description,
    price,
    stock,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  return newProductId;
};

export const updateProduct = async (id: number, data: { name?: string; description?: string; price?: number; stock?: number }) => {
  const updatedData = {
    ...data,
    updatedAt: new Date(),
  };
  return knex('products').where({ id }).update(updatedData);
};

export const deleteProduct = async (id: number) => {
  return knex('products').where({ id }).del();
};

export const findAllProducts = async () => {
  return knex('products').select('*');
};