import React from 'react';
import './main.css';
import Base from './Base';

export default function PaginaPrincipal() {

    const [error, setError] = React.useState('');

    return (
        <div>
            <Base />
            {error ? <>Error en la conexión</> : <></>}
            <h1 className="title1">Trabajo Práctico Final</h1>
            <h2>Diplomatura en Programación Web Full Stack con React JS</h2> 
        </div>
    )
}