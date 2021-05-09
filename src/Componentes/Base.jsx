import React from 'react';
import './main.css';
import {Link} from 'react-router-dom';

export default function PaginaPrincipal() {

    return (
        <div>
            <nav>
                <Link to={"/"} className="menu">Inicio</Link>
                <Link to={"/api"} className="menu">Aplicación</Link>
                <Link to={"/info"} className="menu">Información</Link>
            </nav>
        </div>
    )
}