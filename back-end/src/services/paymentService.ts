import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { PaymentModel, Payment } from '../models/payment';

const PAYSTACK_BASE_URL = 'https://api.paystack.co';
const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY as string;

export interface PaymentInitResponse {
  authorization_url: string;
  reference: string;
}

export interface PaystackInitResponse {
  data: PaymentInitResponse;
}

export interface PaystackVerifyResponse {
  data: {
    status: string;
    transaction_id: string;
  };
}

export const PaymentService = {
  async initializePayment(
    amount: number,
    email: string,
    orderId: number,
    userId: number
  ): Promise<PaymentInitResponse> {
    const reference = uuidv4();
    const payload = {
      email,
      amount: amount * 100, // Convert to kobo
      reference,
      callback_url: `${process.env.APP_URL}/payment/verify`
    };

    try {
      const response = await axios.post<PaystackInitResponse>(
        `${PAYSTACK_BASE_URL}/transaction/initialize`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );

      // Save payment record
      await PaymentModel.create({
        orderId,
        userId,
        reference,
        amount,
        status: 'pending',
        currency: 'NGN'
      });

      return response.data.data;
    } catch (error: any) {
      throw new Error(`Payment initialization failed: ${error.response?.data?.message || error.message}`);
    }
  },

  async verifyPayment(reference: string, userId: number): Promise<Payment> {
    try {
      const response = await axios.get<PaystackVerifyResponse>(
        `${PAYSTACK_BASE_URL}/transaction/verify/${reference}`,
        {
          headers: {
            Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`
          }
        }
      );

      const paymentData = response.data.data;
      const payment = await PaymentModel.findByReference(reference);

      if (!payment) {
        throw new Error('Payment record not found');
      }

      // Ensure the payment belongs to the requesting user
      if (payment.userId !== userId) {
        throw new Error('Unauthorized payment verification');
      }

      const status = paymentData.status === 'success' ? 'successful' : 'failed';

      await PaymentModel.updateStatus(
        payment.id!,
        status,
        paymentData.transaction_id
      );

      return {
        ...payment,
        status,
        transaction_id: paymentData.transaction_id
      };
    } catch (error: any) {
      throw new Error(`Payment verification failed: ${error.response?.data?.message || error.message}`);
    }
  }
};