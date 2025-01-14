import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('cart_items', (table) => {
    table.increments('id').primary();
    table.integer('cartId').unsigned().notNullable().references('id').inTable('cart').onDelete('CASCADE');
    table.integer('productId').unsigned().notNullable().references('id').inTable('products').onDelete('CASCADE');
    table.integer('quantity').notNullable();
    table.decimal('price', 10, 2).notNullable();
    table.timestamp('createdAt').defaultTo(knex.fn.now()).notNullable();
    table.timestamp('updatedAt').defaultTo(knex.fn.now()).notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('cart_items');
}
