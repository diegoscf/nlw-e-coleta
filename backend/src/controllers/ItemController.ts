import { Request, Response } from 'express';
import knex from '../database/conexao';

class ItemController {
    async listar(requisicao: Request, resposta: Response) {
        const itens = await knex('itens').select('*');

        const itensSerializados = itens.map(item => {
            return {
                id: item.id,
                titulo: item.titulo,
                //img_url: `http://localhost:2301/imagens/${item.imagem}`

                // para funcionar no Expo - ReactNative
                img_url: `http://192.168.1.107:2301/imagens/${item.imagem}`
            };
        });

        return resposta.json(itensSerializados);
    }
}

export default ItemController;