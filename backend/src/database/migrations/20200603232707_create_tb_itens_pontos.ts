import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable('itens_pontos', table => {
        table.increments('id').primary();
        table.integer('ponto_id').notNullable().references('id').inTable('pontos');
        table.string('item_id').notNullable().references('id').inTable('itens');
    });
}


export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTable('itens_pontos');
}

