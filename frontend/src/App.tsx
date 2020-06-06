import React, { useState } from 'react';
import './App.css';

import Cabecalho from './Cabecalho';
import Home from './paginas/home/index';
import CriarPonto from './paginas/criar-ponto/index';
import Rotas from './rotas';

function App() {

  // aqui é necessário utilizar o useState para mudar o estado da variável
  // o conceito de imutabilidade não permite alterar o valor diretamente, como abaixo
  // o contador++ ou contador = novo valor
  
  //const [contador, setContador] = useState(0); //[valor do estado, callback function pra alterar o valor]

  // function aumentarContador() {
  //   setContador(contador + 1);
  // }


  // return (
  //   <div>
  //     <Cabecalho titulo="e-Coleta" />
  //     <h1>Contador: {contador}</h1>
  //     <button type="button" onClick={aumentarContador}>Aumentar</button>
  //   </div>
  // );

  return <Rotas />;
}

export default App;
