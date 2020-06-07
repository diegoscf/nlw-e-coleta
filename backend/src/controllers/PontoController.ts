import {Request, Response, response} from 'express';
import knex from '../database/conexao';

class PontoController {
    async criar (req: Request, resp: Response) {
        // {} = req.body é o mesmo que atribuir cada item ex: const nome = req.body.nome; 
        const {
            nome,
            imagem,
            email,
            whatsapp,
            lat,
            long,
            uf,
            cidade,
            itens
        } = req.body;
    
        const trx = await knex.transaction(); //trx é var padrão e substitui o knex nos inserts
    
        // abaixo tem o uso de short syntax: propriedade = variavel, não precisa atribuir ex: nome: nome
        const idsPontosInseridos = await trx('pontos').insert({
            imagem,
            nome,
            email,
            whatsapp,
            lat,
            long,
            uf,
            cidade
        });
    
        // const itensPontos = items.map((itemId: number) => {
        //     return {
        //         item_id: itemId,
        //         ponto_id: idsPontosInseridos[0] // zero pois só salvou um, mas o método insert retorna um array
        //     }
        // });
    
        const ponto_id = idsPontosInseridos[0];
    
        const itensPontos = itens.map((item_id: number) => {
            return {
                item_id,
                ponto_id
            }
        });
    
        await trx('itens_pontos').insert(itensPontos);

        trx.commit();
    
        return resp.json({success: true});
    }

    async mostrar(req: Request, resp: Response) {
        const {id} = req.params;

        const ponto = await knex('pontos').where('id', id).first();

        if (!ponto) {
            return resp.status(400).json({mensagem: 'Ponto de Coleta não encontrado'});
        }

        const pontoSerializado = {
                ...ponto,
                img_url: `http://192.168.1.107:2301/imagens/${ponto.imagem}`
        };

        const itens = await knex('itens')
        .join('itens_pontos', 'itens.id', '=', 'itens_pontos.item_id')
        .where('itens_pontos.ponto_id', id)
        .select('itens.titulo');

        return resp.json({ponto, itens});
    }

    async listar (req: Request, resp: Response) {
        // aqui vou precisar ver o que acontece caso um dos parâmetros não venha na query
        const {uf, cidade, itens} = req.query;

        // vem separado por vírgula, tranforma em array
        const arrItens = String(itens)
            .split(',')
            .map((i) => Number(i.trim()));

        const pontos = await knex('pontos')
            .join('itens_pontos', 'pontos.id', '=', 'itens_pontos.ponto_id')
            .whereIn('itens_pontos.item_id', arrItens)
            .where('uf', String(uf))
            .where('cidade', String(cidade))
            .distinct()
            .select('pontos.*');

        const pontosSerializados = pontos.map(ponto => {
            return {
                ...ponto,
                img_url: `http://192.168.1.107:2301/imagens/${ponto.imagem}`
            };
        });

        return resp.json(pontosSerializados);
    }
}

export default PontoController;