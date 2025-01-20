import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  // Create user_orders table
  await knex.schema.createTable('user_orders', (table) => {
    table.increments('id').primary(); // Auto-incrementing primary key
    table.integer('userId').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
    table.string('delivery_address').notNullable();
    table.string('nearest_bustop').notNullable();
    table.string('phone_number').notNullable();
    table.decimal('shipping_fee', 10, 2).notNullable();
    table.decimal('order_total', 10, 2).notNullable(); // Add order_total column
    table.timestamp('createdAt').defaultTo(knex.fn.now()).notNullable();
    table.timestamp('updatedAt').defaultTo(knex.fn.now()).notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('user_orders');
}
