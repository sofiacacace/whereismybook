import React from 'react'
import Base from '../Base';
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import './stylePersonas.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowAltCircleLeft} from '@fortawesome/free-solid-svg-icons';
import Imagenes from './Imagenes';
import axios from 'axios';
import swal from 'sweetalert';

function VistaPersona(props) {

    const params = useParams();
    const libros = useSelector((estado) => estado.libros)
    const dispatch = useDispatch();
    const lista = useSelector((state) => state.personas);
    const [personas, setPersonas] = React.useState({});

    React.useEffect(() => {
        if (!lista || lista.length === 0) return;
        setPersonas(lista.find((item) => item.id === params.id));

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
            <h2>Datos personales</h2>
        </div>
        <div className="card">
            <table>
                <tr>
                    <td><Imagenes url={'https://placeimg.com/80/80/people?id=' + personas.id}/></td>
                    <td>
                        <ul>
                            <li>Nombre: {personas.nombre}</li>
                            <li>Apellido: {personas.apellido}</li>
                            <li>Alias: {personas.alias}</li>
                            <li>Email: {personas.email}</li>
                            <li>Libros prestados:
                                <ul>
                                    {libros.map((item) =>
                                        item.persona_id == personas.id ? (
                                            <li>{item.nombre}</li>
                                        ) : null
                                    )}
                                </ul>
                            </li>
                         </ul>
                    </td>
                </tr>
            </table>
            
        </div>
        <div className="ruta">   
            <Link to={"/api/personas"} className="ruta-texto"><FontAwesomeIcon icon={faArrowAltCircleLeft} /> Volver a listado de personas</Link>
        </div>
    </div>
  );
}

export default VistaPersona;