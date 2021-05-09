import React from 'react'
import axios from 'axios';
import Base from '../Base';
import './stylePersonas.css'
import {Link} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrashAlt, faEdit, faEye, faPlus, faArrowAltCircleLeft} from '@fortawesome/free-solid-svg-icons';
import swal from 'sweetalert';

function ListadoPersonas() {

    const personas = useSelector((estado) => estado.personas)
    const dispatch = useDispatch();
    const [error, setError] = React.useState("");

    React.useEffect(async () => {
      try {
        const respuesta = await axios.get("http://localhost:3000/api/personas");
        dispatch({ 
            type: "LISTADO_PERSONAS", 
            lista: respuesta.data 
        });
        setError("");
      } catch (e) {
        setError(e.message);
        swal("Error!", "No hay personas agregadas.", "error");
      }
    }, []);

    const eliminarPersona = async (eliminarPersonaId) => {
        try {
          await axios.delete(`http://localhost:3000/api/personas/${eliminarPersonaId}`);
          dispatch({
            type: 'ELIMINAR_PERSONA',
            idPersonaAEliminar: eliminarPersonaId
          });
          setError("");
        } catch(e){
            setError(e.message);
            swal("Error!", "La persona no puede ser eliminada ya que tiene libros no devueltos.", "error");
        }
    };

    return (
        <div>
            <Base />
            <div className="titles">
                <h2>Listado de Personas</h2> 
            </div>
            <div className="listado">
                <Link to={"/api/personas/agregar"}><button className="add"><FontAwesomeIcon icon={faPlus} /> Añadir</button></Link><br/>
                <table className="tabla">
                    <thead>
                        <tr> 
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody >
                        {personas.map((unaPersona) => 
                            unaPersona ? (
                                <tr key={unaPersona.id}>
                                    <td className="columna">{unaPersona.id}</td>
                                    <td className="columna">{unaPersona.nombre}</td>
                                    <td className="columna">{unaPersona.apellido}</td>
                                    <td className="columna">
                                        <Link to={"/api/personas/editar/" + unaPersona.id}><button  className="boton edit"><FontAwesomeIcon icon={faEdit} /></button></Link>
                                        <Link to={"/api/personas/vista/" + unaPersona.id}><button  className="boton view"><FontAwesomeIcon icon={faEye} /></button></Link>
                                        <button  className="boton danger" onClick={() => eliminarPersona(unaPersona.id)}><FontAwesomeIcon icon={faTrashAlt}/></button>
                                    </td>
                                </tr>  
                            ) : null  
                        )}
                    </tbody>
                </table>
            </div>
            <div className="ruta">   
                <Link to={"/api"} className="ruta-texto"><FontAwesomeIcon icon={faArrowAltCircleLeft} /> Volver a la Aplicación</Link>
            </div>
        </div>
    );
}

export default ListadoPersonas;