import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUpload } from 'react-icons/fi';

import './estilo.css';

interface Propriedades {
    aoCarregarArquivo: (arquivo: File) => void
}

const Dropzone: React.FC<Propriedades> = ({aoCarregarArquivo}) => {

    const [urlArquivoSelecionado, setUrlArquivoSelecionado] = useState('');

    const onDrop = useCallback(
        acceptedFiles => {
            const arquivo = acceptedFiles[0];
            const urlArquivo = URL.createObjectURL(arquivo);
            setUrlArquivoSelecionado(urlArquivo);
            aoCarregarArquivo(arquivo);
        },
        [aoCarregarArquivo]
    );
    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: "image/*"
    });

    return (
        <div className="dropzone" {...getRootProps()}>  
            <input {...getInputProps()} accept="image/*" />
            {
                urlArquivoSelecionado
                ? <img src={urlArquivoSelecionado} alt="Miniatura da imagem" />
                : (
                    <p>
                        <FiUpload />
                        Imagem do estabelecimento
                    </p>
                )
            }
        </div>
    )
}

export default Dropzone;