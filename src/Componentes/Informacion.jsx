import React from 'react';
import './main.css';
import Base from './Base';
import {Link} from 'react-router-dom';

export default function PaginaPrincipal() {

    return (
        <div>
            <Base />
            <div className="texto">
                <p><b>Consigna del trabajo práctico:</b></p>
                <p>TP Integrador Modulo 5 y 6: Where'is my books? FrontEnd</p>
                <p>Se trata de un proyecto de desarrollo frontend en React, utilizando como servidor, el tp desarrollado en NodeJs para los modulos 3 y 4. Deben realizar un frontend para mostrar e ingresar todos las consultas que su servidor NodeJs ofrece, por lo tanto:</p>
                <p>Se requiere de:</p>
                <p><u>Persona</u></p>
                <ul>
                    <li>Formulario para ingresar una nueva persona (amigos a los que les prestare libros).</li>
                    <li>Un listado o cards desde el que se puedan ver todas las personas y tenga funcion para borrar y modificar sus datos (pueden ser iconos o botones).</li>
                    <li>Se tiene que poder ver los libros que tiene una persona prestados (es decir, los libros que le preste).</li>
                </ul>
                <p><u>Generos</u></p>
                <ul>
                    <li>Formulario para ingresar un nuevo genero.</li>
                    <li>Un listado o cards de generos donde tambien se cuente con la funcionlidad de borrado o modificacion.</li>
                    <li>Se tiene que poder ver todos los libros de un genero, puede ser una funcionalidad extra en el listado/card del punto anterior o bien otra pantalla donde se seleccione el genero y muestren los libros.</li>
                </ul>
                <p><u>Libro</u></p>
                <ul>
                    <li>Formulario para ingresar nuevo libro.</li>
                    <li>Listado de todos los libros que muestre el alias de la persona que lo tiene, en caso de estar prestado, debe contar con boton para borrar, modificar, prestar/devolver libro.</li>
                </ul>
                <br/>
                <p><b>Fecha de entrega:</b> 10/05/2021</p>
                <p><b>Grupo K</b></p>
                <p><b>Integrantes del grupo:</b></p>
                <ul>
                    <li>Lucas Aranguren</li>
                    <li>María Emilia Lesca</li>
                    <li>Ignacio Garcia</li>
                    <li>Sofía Cacace</li>
                    <li>Emmanuel Galera</li>
                    <li>Daniel Flores</li>
                </ul>
            </div> 
        </div>
    )
}