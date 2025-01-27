import { Request, Response, NextFunction } from 'express';
import { PaymentService } from '../services/paymentService';

export const PaymentController = {
  async initializePayment(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { amount, email, orderId } = req.body;
      const userId = (req as any).user.id;

      if (!userId || !orderId) {
        res.status(400).json({ error: 'User ID and Order ID are required' });
        return;
      }

      const paymentInit = await PaymentService.initializePayment(
        amount, 
        email, 
        orderId, 
        userId
      );

      res.status(200).json(paymentInit);
    } catch (error: any) {
      next(error);
    }
  },

  async verifyPayment(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const reference = req.query.reference as string;
      const userId = (req as any).user.id;

      if (!reference) {
        res.status(400).json({ error: 'Reference is required' });
        return;
      }

      const payment = await PaymentService.verifyPayment(reference, userId);

      res.status(200).json(payment);
    } catch (error: any) {
      next(error);
    }
  }
};