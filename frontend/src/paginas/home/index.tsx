import React from 'react';
import {FiLogIn} from 'react-icons/fi';
import {Link} from 'react-router-dom';

import './estilo.css';

import logo from '../../assets/logo.svg';
// import Cabecalho from '../../Cabecalho';

function Home() {
    return (
        <div id="page-home">
            <div className="content">
                {/* <Cabecalho titulo="">
                    <img src="{logo}" alt="e-Coleta" />
                </Cabecalho> */}
                <header>
                    <img src={logo} alt="e-Coleta" />
                </header>

                <main>
                    <h1>Seu marketplace de coleta de resíduos.</h1>
                    <p>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.</p>

                    <Link to="/criar-ponto">
                        <span><FiLogIn /></span>
                        <strong>Cadastre um Ponto de Coleta</strong>
                    </Link>
                </main>
            </div>
        </div>
    );
}

export default Home;