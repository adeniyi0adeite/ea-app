// model/order.ts

import knex from '../utils/db';

// Define the types for user orders and order items
export interface UserOrder {
  id: number;
  userId: number;
  delivery_address: string;
  nearest_bustop: string;
  phone_number: string;
  shipping_fee: number;
  order_total: number;
  createdAt: string;
  updatedAt: string;
}

export interface UserOrderItem {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  price: number;
  createdAt: string;
  updatedAt: string;
}

// Query to get user order by id
export const getUserOrderById = (id: number): Promise<UserOrder | undefined> => {
  return knex('user_orders').where({ id }).first();
};

// Insert a new user order into the database
export const insertUserOrder = (order: UserOrder): Promise<number[]> => {
  return knex('user_orders').insert(order);
};

// Insert order items associated with an order
export const insertUserOrderItems = (orderItems: UserOrderItem[]): Promise<void> => {
  return knex('user_order_items').insert(orderItems);
};

// Delete user order by id
export const deleteUserOrderById = (id: number): Promise<number> => {
  return knex('user_orders').where({ id }).del();
};

// Update user order by id
export const updateUserOrderById = (id: number, updates: Partial<UserOrder>): Promise<number> => {
  return knex('user_orders').where({ id }).update(updates);
};

// Get all user orders (missing in your original code)
export const getAllUserOrders = (): Promise<UserOrder[]> => {
  return knex('user_orders').select('*');
};
