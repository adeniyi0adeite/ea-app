// migrations/create_payments_table.ts

import { Knex } from 'knex';

export const up = async (knex: Knex): Promise<void> => {
  await knex.schema.createTable('payments', (table) => {
    table.increments('id').primary(); // Auto-incrementing ID
    table.integer('orderId').notNullable().unsigned().references('id').inTable('user_orders').onDelete('CASCADE'); // Correct reference to user_orders
    table.integer('userId').notNullable().unsigned().references('id').inTable('users').onDelete('CASCADE'); // Reference to users
    table.string('reference').notNullable().unique(); // Unique reference for payment
    table.string('transaction_id').nullable(); // Paystack transaction ID
    table.decimal('amount', 10, 2).notNullable(); // Amount of payment
    table.enu('status', ['pending', 'successful', 'failed']).defaultTo('pending'); // Payment status
    table.string('currency').notNullable(); // Currency used for the payment
    table.json('metadata').nullable(); // Metadata (optional, for extra data storage)
    table.timestamp('createdAt').defaultTo(knex.fn.now()); // Timestamp when the payment is created
    table.timestamp('updatedAt').defaultTo(knex.fn.now()); // Timestamp when the payment is last updated
  });
};

export const down = async (knex: Knex): Promise<void> => {
  await knex.schema.dropTableIfExists('payments');
};
