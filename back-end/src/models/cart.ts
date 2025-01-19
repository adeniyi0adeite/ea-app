import knex from '../utils/db';


// Function to create a new cart for a user
export const createCartForUser = async (userId: number): Promise<any> => {
  const [newCartId] = await knex('cart').insert({
    userId,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  return findCartByUserId(userId); // Return the newly created cart
};


// Function to find the cart by userId
export const findCartByUserId = async (userId: number): Promise<any> => {
  return knex('cart')
    .where({ userId })
    .first(); // Fetch the first matching record (assuming one cart per user)
};

export const findCartItem = async (cartId: number, productId: number): Promise<any> => {
  return knex('cart_items').where({ cartId, productId }).first();
};


// Function to fetch all items in the cart for a user
export const getCartItemsByUserId = async (userId: number): Promise<any[]> => {
  const cart = await findCartByUserId(userId);
  
  if (!cart) {
    throw new Error('Cart not found');
  }
  
  return knex('cart_items')
    .join('products', 'cart_items.productId', '=', 'products.id') // Corrected table name
    .select('cart_items.*', 'products.name', 'products.description', 'products.price') // Fetch product details
    .where('cart_items.cartId', cart.id);

};



export const addCartItem = async (cartId: number, productId: number, quantity: number, price: number): Promise<number> => {
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






// Function to remove an item from the cart
export const removeCartItem = async (cartId: number, productId: number): Promise<number> => {
  const result = await knex('cart_items')
    .where({ cartId, productId })
    .del(); // Delete the item from the cart
  return result;
};

// Function to clear all items from a user's cart
export const clearCartItems = async (cartId: number): Promise<number> => {
  const result = await knex('cart_items')
    .where({ cartId })
    .del(); // Delete all cart items for the given cartId
  return result;
};



// Function to update the quantity of a cart item
export const updateCartItemQuantity = async (cartId: number, productId: number, quantity: number): Promise<any> => {
  const result = await knex('cart_items')
    .where({ cartId, productId })
    .update({
      quantity,
      updatedAt: new Date(), // Update the timestamp to reflect the change
    });

  if (result === 0) {
    throw new Error('Item not found in cart');
  }

  return knex('cart_items').where({ cartId, productId }).first();
};
