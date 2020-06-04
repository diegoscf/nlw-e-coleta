import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable('pontos', table => {
        table.increments('id').primary();
        table.string('imagem').notNullable();
        table.string('nome').notNullable();
        table.string('email').notNullable();
        table.string('whatsapp').notNullable();
        table.string('lat').notNullable();
        table.string('long').notNullable();
        table.string('uf').notNullable();
        table.string('cidade', 2).notNullable();
    });
}


export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTable('pontos');
}

