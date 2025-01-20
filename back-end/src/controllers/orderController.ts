// controllers/orderController.ts
import { Request, Response } from 'express';
import { createOrder } from '../services/orderService';
import { getUserCartItems } from '../services/cartService';

export const createOrderController = async (req: Request, res: Response) => {
  try {
    const { deliveryAddress, nearestBustop, phoneNumber } = req.body;
    const userId = (req as any).user.id; // Assume user is authenticated
    const cartItems = await getUserCartItems(userId);

    const order = await createOrder(userId, {
      address: deliveryAddress,
      bustop: nearestBustop,
      phone: phoneNumber,
    }, cartItems);

    res.json({ success: true, orderId: order.orderId });
  } catch (error) {
    if (error instanceof Error) {
      // Now TypeScript knows that 'error' is an instance of Error
      res.status(500).json({ success: false, message: error.message });
    } else {
      // If the error is not an instance of Error, handle it differently
      res.status(500).json({ success: false, message: 'An unknown error occurred' });
    }
  }
};
