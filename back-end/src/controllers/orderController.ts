// controllers/orderController.ts

import { Request, Response } from 'express';
import { createOrder, deleteUserOrder, updateUserOrder, getUserOrderByOrderId, getAllUserOrders } from '../services/orderService';
import { getUserCartItems } from '../services/cartService';

// Create order controller (already in place)
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
      res.status(500).json({ success: false, message: error.message });
    } else {
      res.status(500).json({ success: false, message: 'An unknown error occurred' });
    }
  }
};

// Controller to delete user order by order ID
export const deleteUserOrderController = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    await deleteUserOrder(Number(orderId));
    res.json({ success: true, message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error instanceof Error ? error.message : 'Unknown error occurred' });
  }
};

// Controller to update user order by order ID
export const updateUserOrderController = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const updates = req.body;
    await updateUserOrder(Number(orderId), updates);
    res.json({ success: true, message: 'Order updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error instanceof Error ? error.message : 'Unknown error occurred' });
  }
};

// Controller to get user order by order ID
export const getUserOrderByOrderIdController = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const order = await getUserOrderByOrderId(Number(orderId));
    if (order) {
      res.json({ success: true, order });
    } else {
      res.status(404).json({ success: false, message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error instanceof Error ? error.message : 'Unknown error occurred' });
  }
};

// Controller to get all user orders
export const getAllUserOrdersController = async (_req: Request, res: Response) => {
  try {
    const orders = await getAllUserOrders();
    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error instanceof Error ? error.message : 'Unknown error occurred' });
  }
};
