import express from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import PontoController from './controllers/PontoController';
import ItemController from './controllers/ItemController';

const rotas  = express.Router();
const upload = multer(multerConfig);

const ctrlPonto = new PontoController();
const ctrlItem  = new ItemController();

rotas.get('/itens', ctrlItem.listar);

rotas.get('/pontos', ctrlPonto.listar);
rotas.get('/pontos/:id', ctrlPonto.mostrar);

// com o upload adicionado, o body não pode mais ser JSON, precisar ser um Multipart Form
rotas.post(
    '/pontos', 
    upload.single('imagem'), 
    // celebrate({
    //     body: 
    // }),
    ctrlPonto.criar
);

// faltou implementar o EDIT

export default rotas;