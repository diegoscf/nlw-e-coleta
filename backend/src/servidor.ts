import express from 'express';

const app = express();

app.get('/usuarios', (requisicao, resposta) => {
    console.log('node funfando');


    resposta.send('Hallo! Wie gehts dir?'); // formato texto
    // resposta.json([
    //     'Diego', 'Silva', 'Costa', 'Figueirêdo'
    // ]);
});

app.listen(2301); // padrão é 3333