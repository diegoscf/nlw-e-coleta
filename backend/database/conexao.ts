import knex from 'knex';
import path from 'path';

const conexao = knex({
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, 'ecoleta.sqlite'),
    },
    useNullAsDefault: true
});

export default conexao;