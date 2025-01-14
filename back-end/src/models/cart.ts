import knex from '../utils/db';

export const findCartItem = async (cartId: number, productId: number) => {
  return knex('cart_items').where({ cartId, productId }).first();
};

export const addCartItem = async (cartId: number, productId: number, quantity: number, price: number) => {
  const [newCartItemId] = await knex('cart_items').insert({
    cartId,
    productId,
    quantity,
    price,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  return newCartItemId;
};



export const removeCartItem = async (cartId: number, cartItemId: number) => {
  return knex('cart_items').where({ cartId, id: cartItemId }).del();
};

export const getCartItemsByCartId = async (cartId: number) => {
  return knex('cart_items').where({ cartId }).select('*');
};

export const clearCartItems = async (cartId: number) => {
  return knex('cart_items').where({ cartId }).del();
};

export const findCartByUserId = async (userId: number) => {
  return knex('cart').where({ userId }).first();
};

export const createCartForUser = async (userId: number) => {
  // Check if the user exists before inserting a cart
  const userExists = await knex('users').where('id', userId).first();
  if (!userExists) {
    throw new Error('User not found');
  }

  // Insert a new cart and get the inserted ID
  const [newCartId] = await knex('cart').insert({
    userId,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  // Return the newly created cart
  return findCartByUserId(userId);  // Ensure this works for MySQL
};
