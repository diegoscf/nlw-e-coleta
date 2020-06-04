import express from 'express';
import cors from 'cors';
import path from 'path';
import rotas from './rotas';

const app = express();

app.use(cors({
    // origin: 'www.meudominio.com.br'
    origin: 'http://localhost:2301'
}));
app.use(express.json());
app.use(rotas);

app.use('/imagens', express.static(path.resolve(__dirname, '..', 'imagens')));

app.listen(2301); 