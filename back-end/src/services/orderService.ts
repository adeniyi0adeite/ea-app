// services/orderService.ts
import knex from '../utils/db';

import { calculateShippingFee, calculateOrderTotal  } from '../utils/shippingfee';  // Import your utility function

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
