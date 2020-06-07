import express from 'express';
import cors from 'cors';
import path from 'path';
import rotas from './rotas';

const app = express();

app.use(cors({
    // origin: 'www.meudominio.com.br'
    origin: 'http://localhost:3000'
}));
app.use(express.json());
app.use(rotas);
//app.use(errors()); //celebrate

app.use('/imagens', express.static(path.resolve(__dirname, '..', 'imagens')));
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

app.listen(2301); 