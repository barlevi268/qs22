import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('orgs', table => {
    table.bigIncrements('id').unsigned().primary();
    table.string('name', 255).notNullable();
  });

  await knex.schema.createTable('users', table => {
    table.bigIncrements('id').unsigned().primary();
    table.string('name', 255).notNullable();
    table.string('email', 45).notNullable();
    table.string('password', 255).notNullable();
    table.bigInteger('org_id').references('id').inTable('users').onDelete('cascade');
  });

  await knex.schema.createTable('collections', table => {
    table.bigIncrements('id').unsigned().primary();
    table.string('name', 255).notNullable();
    table.bigInteger('org_id').references('id').inTable('users').onDelete('cascade');
  });

  await knex.schema.createTable('slugs', table => {
    table.bigIncrements('id').unsigned().primary();
    table.string('slug', 45).notNullable();
    table.string('url', 255).notNullable();
    table.bigInteger('collection_id').references('id').inTable('collections').onDelete('cascade');
    table.bigInteger('org_id').references('id').inTable('users').onDelete('cascade');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('users');
}
