import express from 'express';

import PontoController from './controllers/PontoController';
import ItemController from './controllers/ItemController';

const rotas     = express.Router();
const ctrlPonto = new PontoController();
const ctrlItem  = new ItemController();

rotas.get('/itens', ctrlItem.listar);

rotas.get('/pontos', ctrlPonto.listar);
rotas.post('/pontos', ctrlPonto.criar);
rotas.get('/pontos/:id', ctrlPonto.mostrar);
// faltou implementar o EDIT

export default rotas;