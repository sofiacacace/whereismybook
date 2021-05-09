import React from 'react';
import axios from 'axios';
import Base from '../Base';
import './styleLibros.css'
import {Link, useHistory} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrashAlt, faEdit, faEye, faPlus, faArrowAltCircleLeft} from '@fortawesome/free-solid-svg-icons';
import swal from 'sweetalert';

function ListadoLibros() {

    const libros = useSelector((estado) => estado.libros)
    const dispatch = useDispatch();
    const [error, setError] = React.useState("");
    const history = useHistory();

    React.useEffect(async () => {
      try {
        const respuesta = await axios.get("http://localhost:3000/api/libros");
        dispatch({ 
            type: "LISTADO_LIBROS", 
            lista: respuesta.data 
        });
        setError("");
      } catch (e) {
        setError(e.message);
        swal("Error!", "No hay libros agregados.", "error");
      }
    }, []);

    const eliminarLibro = async (eliminarLibroId) => {
        try {
          await axios.delete(`http://localhost:3000/api/libros/${eliminarLibroId}`);
          dispatch({
            type: 'ELIMINAR_LIBRO',
            idLibroAEliminar: eliminarLibroId
          });
          setError("");
        } catch(e){
            setError(e.message);
            swal("Error!", "Ese libro está prestado, NO se puede borrar.", "error");
        }
    };

    const devolverLibro = async (libroId, personaId) => {

        if(personaId != null){
            try {
                await axios.put(`http://localhost:3000/api/libros/devolver/${libroId}`);
                swal("Libro devuelto!", "El libro ya se encuentra disponible", "success");
                history.push("/api/libros");
                
              } catch(e){
                  setError(e.message);
                  swal("Error inesperado!", "", "error");
              }

        } else{
            swal("Error!", "El libro no se encuentra prestado.", "error");
        }
        
    }

    const prestarLibro = async (libroId, personaId) => {

        if(personaId == null){
            history.push("/api/libros/prestar/" + libroId);

        } else{
            swal("Error!", "El libro ya se encuentra prestado.", "error");
        }
        
    }

    return (
        <div>
            <Base />
            <div className="titles">
                <h2>Listado de Libros</h2> 
            </div>
            <div className="listado">
                <Link to={"/api/libros/agregar"}><button className="add"><FontAwesomeIcon icon={faPlus} /> Añadir</button></Link><br/>
                <table className="tabla">
                    <thead>
                        <tr> 
                            <th>ID</th>
                            <th>Nombre</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody >
                        {libros.map((unLibro) => 
                            unLibro ? (
                                <tr key={unLibro.id}>
                                    <td className="columna">{unLibro.id}</td>
                                    <td className="columna">{unLibro.nombre}</td>
                                    <td className="columna">
                                        <Link to={"/api/libros/vista/" + unLibro.id}><button  className="boton view"><FontAwesomeIcon icon={faEye} /></button></Link>
                                        <button  className="boton danger" onClick={() => eliminarLibro(unLibro.id)}><FontAwesomeIcon icon={faTrashAlt}/></button>
                                    </td>
                                    <td className="columna">
                                        <button  className="boton btn-action" onClick={() => prestarLibro(unLibro.id, unLibro.persona_id)}>Prestar</button>
                                        <Link to={"/api/libros/vista/" + unLibro.id}><button  className="boton btn-action" onClick={() => devolverLibro(unLibro.id, unLibro.persona_id)}>Devolver</button></Link>
                                        
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

export default ListadoLibros;