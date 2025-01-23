// services/orderService.ts
import knex from '../utils/db';

import { calculateShippingFee, calculateOrderTotal } from '../utils/shippingfee';  // Import your utility function
import { UserOrder, deleteUserOrderById, updateUserOrderById, getUserOrderById, getAllUserOrders as fetchAllUserOrders } from '../models/order';  // Renamed import for clarity

// Create order service (already in place)
export const createOrder = async (userId: number, deliveryDetails: any, cartItems: any[]): Promise<any> => {
  return knex.transaction(async (trx) => {
    // Insert into user_orders
    const [orderId] = await trx('user_orders').insert({
      userId,
      delivery_address: deliveryDetails.address,
      nearest_bustop: deliveryDetails.bustop,
      phone_number: deliveryDetails.phone,
      shipping_fee: calculateShippingFee(deliveryDetails),  // Now using the utility function
      order_total: calculateOrderTotal(cartItems),
      createdAt: new Date(),
    });

    // Insert order items
    const orderItems = cartItems.map(item => ({
      orderId,
      productId: item.productId,
      quantity: item.quantity,
      price: item.price,
    }));
    await trx('user_order_items').insert(orderItems);

    return { orderId };
  });
};

// Delete user order service
export const deleteUserOrder = async (orderId: number): Promise<number> => {
  return deleteUserOrderById(orderId);
};

// Update user order service
export const updateUserOrder = async (orderId: number, updates: Partial<UserOrder>): Promise<number> => {
  return updateUserOrderById(orderId, updates);
};

// Get user order by order ID service
export const getUserOrderByOrderId = async (orderId: number): Promise<UserOrder | undefined> => {
  return getUserOrderById(orderId);
};

// Get all user orders service
export const getAllUserOrders = async (): Promise<UserOrder[]> => {
  return fetchAllUserOrders();  // Use the function from the model
};
