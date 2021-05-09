import React from 'react';
import './main.css';
import Base from './Base';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUsers, faBook, faBookReader} from '@fortawesome/free-solid-svg-icons';

export default function PaginaPrincipal() {

    return (
        <div>
            <Base />
            <h1 className="title2">Librería</h1>
            <div className="container">
                <div className="personas">
                <FontAwesomeIcon icon={faUsers} className="icon"/><Link to={"/api/personas"} className="items">Personas</Link>
                </div>
                <div className="libros">
                <FontAwesomeIcon icon={faBook} className="icon"/><Link to={"/api/libros"} className="items">Libros</Link>
                </div>
                <div className="generos">
                <FontAwesomeIcon icon={faBookReader} className="icon"/><Link to={"/api/categorias"} className="items">Categorías</Link>
                </div>
            </div> 
        </div>
    )
}