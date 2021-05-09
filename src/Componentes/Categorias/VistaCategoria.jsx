import React, { useState }  from 'react'
import Base from '../Base';
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import './styleCategorias.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowAltCircleLeft} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import swal from 'sweetalert';

function VistaCategoria(props) {

    const params = useParams();
    const libros = useSelector((estado) => estado.libros)
    const dispatch = useDispatch();
    const lista = useSelector((state) => state.categorias);
    const [categorias, setCategorias] = React.useState({});

    React.useEffect(() => {
        if (!lista || lista.length == 0) return;
        setCategorias(lista.find((item) => item.id == params.id));

    }, [params, lista]);

    React.useEffect(async () => {
        try {
          const respuesta = await axios.get("http://localhost:3000/api/libros");
          dispatch({ 
              type: "LISTADO_LIBROS", 
              lista: respuesta.data 
          });

        } catch (e) {
          swal("Error!", "No hay libros agregados.", "error");
        }
    }, []);

  return (
    <div>
        <Base/>
        <div className="titles">
            <h2>Categoria Detalle</h2>
        </div>
        <div className="card">
            <table>
                <tr>
                    <td><img className="imagen-categorias" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhyKVnMUEnBPvTC1TEsOjNwzhyU6dw1nxk9jW4sAgvmJd8CfQAilBSqjt5ykxEORAqjHk&usqp=CAU" alt="books"></img></td>
                    <td>
                        <ul>
                            <li>Nombre: {categorias.nombre}</li>
                            {libros.find((item) => item.categoria_id == categorias.id) ? (
                                <li>Libros con esta categoría:
                                    <ul>
                                        {libros.map((item) =>
                                            item.categoria_id == categorias.id ? (
                                                <li>{item.nombre}</li>
                                            ) : null
                                        )}
                                    </ul>
                                </li> ) : <li>Libros con esta categoría: No hay libros todavía.</li>
                            }
                         </ul>
                    </td>
                </tr>
            </table>
            
        </div>
        <div className="ruta">   
            <Link to={"/api/categorias"} className="ruta-texto"><FontAwesomeIcon icon={faArrowAltCircleLeft} /> Volver a listado de categorias</Link>
        </div>
    </div>
  );
}

export default VistaCategoria;