import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  // Create user_order_items table
  await knex.schema.createTable('user_order_items', (table) => {
    table.increments('id').primary(); // Auto-incrementing primary key
    table.integer('orderId').unsigned().notNullable().references('id').inTable('user_orders').onDelete('CASCADE');
    table.integer('productId').unsigned().notNullable().references('id').inTable('products').onDelete('CASCADE');
    table.integer('quantity').unsigned().notNullable().defaultTo(1); // Default quantity of 1
    table.decimal('price', 10, 2).notNullable(); // Price per item
    table.timestamp('createdAt').defaultTo(knex.fn.now()).notNullable();
    table.timestamp('updatedAt').defaultTo(knex.fn.now()).notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('user_order_items');
}
