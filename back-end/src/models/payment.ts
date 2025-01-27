import knex from '../utils/db';

export interface Payment {
  id?: number;
  orderId: number;
  userId: number;
  reference: string;
  transaction_id?: string;
  amount: number;
  status: 'pending' | 'successful' | 'failed';
  currency: string;
  metadata?: Record<string, any>;
  createdAt?: string;
  updatedAt?: string;
}

export const PaymentModel = {
  async create(payment: Payment): Promise<number[]> {
    return knex('payments').insert(payment);
  },

  async findByReference(reference: string): Promise<Payment | undefined> {
    return knex('payments').where({ reference }).first();
  },

  async findByOrderId(orderId: number): Promise<Payment[]> {
    return knex('payments').where({ orderId });
  },

  async updateStatus(id: number, status: Payment['status'], transaction_id?: string): Promise<number> {
    return knex('payments')
      .where({ id })
      .update({ 
        status, 
        transaction_id,
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
      });
  }
};