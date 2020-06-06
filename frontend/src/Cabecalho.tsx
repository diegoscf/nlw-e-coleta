import React from 'react';

// function Header() {
//     return (
//     <header>
//         <h1>Ecoleta</h1>
//     </header>
//     );
// }

interface Propriedades {
    titulo: string;
}

const Cabecalho: React.FC<Propriedades> = (props) => {
    return (
    <header>
        <h1>{props.titulo}</h1>
    </header>
    );
}

export default Cabecalho;