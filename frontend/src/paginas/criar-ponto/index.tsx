import React, {useEffect, useState, ChangeEvent, FormEvent} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';

import api from '../../servicos/api';
import apiIBGE from '../../servicos/apiIBGE';
import Dropzone from '../../components/dropzone';

import './estilo.css';
import logo from '../../assets/logo.svg';


interface Item {
    id: number;
    titulo: string;
    img_url: string
}

interface Estado {
    id: number;
    nome: string;
}

interface Municipio {
    id: number;
    nome: string;
}

interface PontoColeta {
    nome: string;
    email: string;
    whatsapp: string;
}

const CriarPonto = () => {

    const historico = useHistory();

    // sempre que o estado for para array ou objeto, será preciso informar o tipo da variável
    const [itens, setItens]     = useState<Item[]>([]);
    const [estados, setEstados] = useState<Estado[]>([]);
    const [cidades, setCidades] = useState<Municipio[]>([]);
    const [arquivoSelecionado, setArquivoSelecionado] = useState<File>();

    const [estadoSelecionado, setEstadoSelecionado] = useState<number>(0);
    const [cidadeSelecionada, setCidadeSelecionada] = useState<number>(0);

    const [pontoMapaInicial, setPontoMapaInicial] = useState<[number, number]>([0,0]);
    const [pontoMapa, setPontoMapa]               = useState<[number, number]>([0,0]);
    
    const [dadosFormulario, setDadosFormulario] = useState<PontoColeta>({
        nome: '',
        email: '',
        whatsapp: ''
    });
    const [itensSelecionados, setItensSelecionados] = useState<number[]>([]);
    
    useEffect(
        () => {
            api.get('itens')
               .then(resposta => setItens(resposta.data));
        }, 
        []
    );

    useEffect(
        () => {
            apiIBGE.get<Estado[]>('localidades/estados?orderBy=nome')
                   .then(resposta => setEstados(resposta.data));
        }, 
        []
    );

    // param1: o quê fazer
    // param2: quando fazer
    useEffect(
        () => {
            if (!estadoSelecionado) {
                return;
            }
            apiIBGE.get<Municipio[]>(`localidades/estados/${estadoSelecionado}/municipios`)
                   .then(resposta => setCidades(resposta.data));
        }, 
        [estadoSelecionado]
    );

    useEffect(
        () => {
            navigator.geolocation.getCurrentPosition(pos => {
                const {latitude, longitude} = pos.coords;
                setPontoMapaInicial([latitude, longitude]);
            });
        }, 
        []
    );

    function aoSelecionarEstado(event: ChangeEvent<HTMLSelectElement>) {
        setEstadoSelecionado(Number(event.target.value));
    }

    function aoSelecionarCidade(event: ChangeEvent<HTMLSelectElement>) {
        setCidadeSelecionada(Number(event.target.value));
    }

    function aoClicarNoMapa(event: LeafletMouseEvent) {
        setPontoMapa([event.latlng.lat, event.latlng.lng]);
    }

    function armazenarValorInput(event: ChangeEvent<HTMLInputElement>) {
        const {name, value} = event.target;
        // spread operator pra manter os dados que já tiverem no objeto, 
        // depois adiciona o name do input e seu value
        setDadosFormulario({...dadosFormulario, [name]: value});
    }

    // arrow funtion no onclick para conseguir passar o id como parâmetro 
    // (uma funcão normal seria executada - para cada item - ao carregar a página)
    function armazenarItensSelecionados(itemId: number) {
        const jaSelecionado = itensSelecionados.filter(id => id === itemId);

        if (jaSelecionado.length) {
            setItensSelecionados(itensSelecionados.filter(id => id !== itemId));
        } else {
            setItensSelecionados([...itensSelecionados, itemId]);
        }
    }

    async function enviar(event: FormEvent) {
        event.preventDefault();

        const {
            nome, 
            email, 
            whatsapp
        }                 = dadosFormulario;
        const imagem      = arquivoSelecionado;
        const uf          = estadoSelecionado;
        const cidade      = cidadeSelecionada;
        const [lat, long] = pontoMapa;
        const itens       = itensSelecionados;
        
        await api.post(
            '/pontos', 
            {
                nome,
                imagem,
                email,
                whatsapp,
                uf,
                cidade,
                lat,
                long,
                itens
            }
        );

        alert('Ponto de Coleta salvo com sucesso');

        historico.push('/');
    }

    return (
        <div id="page-create-point">
            <header>
                <img src={logo} alt="e-Coleta"/>
                <Link to="">
                    <FiArrowLeft />
                    Voltar para página principal
                </Link>
            </header>

            <form onSubmit={enviar}>
                <h1>Cadastro do <br />Ponto de Coleta</h1>

                <Dropzone aoCarregarArquivo={setArquivoSelecionado} />

                <fieldset>
                    <legend>
                        <h2>Dados</h2>
                    </legend>
                    <div className="field">
                        <label htmlFor="nome">Nome da Entidade</label>
                        <input type="text" name="nome" id="nome" onChange={armazenarValorInput} />
                    </div>
                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="email">E-mail</label>
                            <input type="email" name="email" id="email" onChange={armazenarValorInput} />
                        </div>
                        <div className="field">
                            <label htmlFor="whatsapp">Nome da Entidade</label>
                            <input type="text" name="whatsapp" id="whatsapp" onChange={armazenarValorInput} />
                        </div>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>
                        <h2>Endereço</h2>
                        <span>Selecione um endereço no mapa</span>
                    </legend>

                    <Map center={pontoMapaInicial} zoom={15} onClick={aoClicarNoMapa}>
                        <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={pontoMapa} />
                    </Map>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="uf">Estado</label>
                            <select 
                                name="uf" 
                                id="uf" 
                                value={estadoSelecionado} 
                                onChange={aoSelecionarEstado}
                            >
                                <option value="0">Selecione um Estado</option>
                                {estados.map(uf => (
                                    <option key={uf.id} value={uf.id}>{uf.nome}</option>
                                ))}
                            </select>
                        </div>
                        <div className="field">
                            <label htmlFor="cidade">Cidade</label>
                            <select 
                                name="cidade" 
                                id="cidade" 
                                value={cidadeSelecionada} 
                                onChange={aoSelecionarCidade}
                            >
                                <option value="0">Selecione uma Cidade</option>
                                {cidades.map(cidade => (
                                    <option key={cidade.id} value={cidade.id}>{cidade.nome}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>
                        <h2>Itens de Coleta</h2>
                        <span>Selecione um ou mais itens abaixo</span>
                    </legend>
                    <ul className="items-grid">
                        {itens.map(item => (
                            <li 
                                className={itensSelecionados.includes(item.id) ? "selected" : ""}
                                key={item.id} 
                                onClick={() => armazenarItensSelecionados(item.id)}
                            >
                                <img src={item.img_url} alt={item.titulo}/>
                                <span>{item.titulo}}</span>
                            </li>
                        ))}
                    </ul>
                </fieldset>
                <button type="submit">Cadastrar</button>
            </form>
        </div>
    );
}

export default CriarPonto;