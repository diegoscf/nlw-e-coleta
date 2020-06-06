import React from 'react';
import {Route, BrowserRouter} from 'react-router-dom';

import Home from './paginas/home';
import CriarPonto from './paginas/criar-ponto';

const Rotas = () => {
    return (
        <BrowserRouter>
            <Route component={Home} path="/" exact />
            <Route component={CriarPonto} path="/criar-ponto" />
        </BrowserRouter>
    );
}

export default Rotas;