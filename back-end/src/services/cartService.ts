import { createCartForUser, findCartItem, addCartItem, removeCartItem, clearCartItems, findCartByUserId, getCartItemsByUserId, updateCartItemQuantity } from '../models/cart';
import { findProductById } from '../models/product'; // Assuming this function is defined to fetch product details

export const addItemToCart = async (userId: number, productId: number, quantity: number = 1): Promise<any> => {
  let cart = await findCartByUserId(userId);
  
  if (!cart) {
    cart = await createCartForUser(userId);
  }

  const existingCartItem = await findCartItem(cart.id, productId);
  if (existingCartItem) {
    throw new Error('Item already in cart');
  }

  const product = await findProductById(productId);
  if (!product) {
    throw new Error('Product not found');
  }

  const price = product.price;
  const newCartItemId = await addCartItem(cart.id, productId, quantity, price);
  return await findCartItem(cart.id, productId);
};


export const removeItemFromCart = async (userId: number, productId: number): Promise<any> => {
  const cart = await findCartByUserId(userId);

  if (!cart) {
    throw new Error('Cart not found');
  }

  const product = await findProductById(productId);
  if (!product) {
    throw new Error('Product not found');
  }

  const result = await removeCartItem(cart.id, productId);
  
  if (result === 0) {
    throw new Error('Item not found in cart');
  }

  return { message: 'Item removed from cart successfully' };
};


export const clearUserCart = async (userId: number): Promise<any> => {
  const cart = await findCartByUserId(userId);

  if (!cart) {
    throw new Error('Cart not found');
  }

  // Clear all items in the cart
  const result = await clearCartItems(cart.id);
  
  if (result === 0) {
    throw new Error('No items to remove from the cart');
  }

  return { message: 'Cart cleared successfully' };
};


// Service function to fetch all cart items for a user
export const getUserCartItems = async (userId: number): Promise<any[]> => {
  const cartItems = await getCartItemsByUserId(userId);
  if (cartItems.length === 0) {
    throw new Error('No items in cart');
  }
  return cartItems;
};


export const updateItemQuantityInCart = async (userId: number, productId: number, quantity: number): Promise<any> => {
  const cart = await findCartByUserId(userId);

  if (!cart) {
    throw new Error('Cart not found');
  }

  const product = await findProductById(productId);
  if (!product) {
    throw new Error('Product not found');
  }

  const updatedCartItem = await updateCartItemQuantity(cart.id, productId, quantity);
  return updatedCartItem;
};

