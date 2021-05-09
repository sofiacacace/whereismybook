import React, { useState }  from 'react'
import Base from '../Base';
import axios from 'axios';
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import './styleLibros.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowAltCircleLeft} from '@fortawesome/free-solid-svg-icons';
import swal from 'sweetalert';

function VistaLibro(props) {

    const params = useParams();
    const dispatch = useDispatch();
    const lista_libros = useSelector((state) => state.libros);
    const personas = useSelector((estado) => estado.personas)
    const categorias = useSelector((estado) => estado.categorias)
    const [libros, setLibros] = React.useState({});

    React.useEffect(async () => {
        if (!lista_libros || lista_libros.length == 0) return;
        setLibros(lista_libros.find((item) => item.id == params.id));

    }, [params, lista_libros]);

    React.useEffect(async () => {
        try {
          const respuesta1 = await axios.get("http://localhost:3000/api/categorias");
          dispatch({ 
              type: "LISTADO_CATEGORIAS", 
              lista: respuesta1.data 
          });

          const respuesta2 = await axios.get("http://localhost:3000/api/personas");
          dispatch({ 
              type: "LISTADO_PERSONAS", 
              lista: respuesta2.data 
          });

        } catch (e) {
          swal("Error!", "Error en el servidor.", "error");
        }
    }, []);


  return (
    <div>
        <Base/>
        <div className="titles">
            <h2>Detalle de Libro</h2>
        </div>
        <div className="card">
            <table>
                <tr>
                    <td>
                        <ul>
                            <li>Nombre: {libros.nombre}</li>
                            <li>Descripción: {libros.descripcion}</li>
                            {categorias.map((item) =>
                                item.id == libros.categoria_id ? (
                                    <li>Categoría: {item.nombre}</li>
                                ) : null
                            )}
                            {libros.persona_id ? <li>Prestado: Si   
                                {personas.map((item) =>
                                    item.id == libros.persona_id ? (
                                        <p>Libro prestado a {item.alias}</p>
                                    ) : null
                                )} </li>
                            : <li>Prestado: No</li>} 
                        </ul>
                    </td>
                </tr>
            </table>
            
        </div>
        <div className="ruta">   
            <Link to={"/api/libros"} className="ruta-texto"><FontAwesomeIcon icon={faArrowAltCircleLeft} /> Volver a listado de libros</Link>
        </div>
    </div>
  );
}

export default VistaLibro;