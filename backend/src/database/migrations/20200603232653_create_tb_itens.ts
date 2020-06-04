import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable('itens', table => {
        table.increments('id').primary();
        table.string('imagem').notNullable();
        table.string('titulo').notNullable();
    });
}


export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTable('itens');
}

