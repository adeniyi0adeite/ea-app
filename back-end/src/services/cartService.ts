import { findCartItem, addCartItem, removeCartItem, getCartItemsByCartId, clearCartItems } from '../models/cart';
import { findCartByUserId, createCartForUser } from '../models/cart'; // Assuming this function retrieves a user's cart.

export const addItemToCart = async (userId: number, productId: number, quantity: number, price: number) => {
  let cart = await findCartByUserId(userId);  // Retrieve the user's cart.
  
  if (!cart) {
    // Create a new cart if not found
    cart = await createCartForUser(userId);  // Add a function to create a cart for the user
  }
  
  const existingCartItem = await findCartItem(cart.id, productId);
  if (existingCartItem) {
    throw new Error('Item already in cart');
  }
  
  const newCartItemId = await addCartItem(cart.id, productId, quantity, price);
  return await findCartItem(cart.id, productId);
};
export const removeItemFromCart = async (userId: number, cartItemId: number) => {
  const cart = await findCartByUserId(userId);
  if (!cart) throw new Error('Cart not found for this user');

  await removeCartItem(cart.id, cartItemId);
};

export const getUserCartItems = async (userId: number) => {
  const cart = await findCartByUserId(userId);
  if (!cart) throw new Error('Cart not found for this user');
  
  return await getCartItemsByCartId(cart.id);
};

export const clearUserCart = async (userId: number) => {
  const cart = await findCartByUserId(userId);
  if (!cart) throw new Error('Cart not found for this user');

  await clearCartItems(cart.id);
};
