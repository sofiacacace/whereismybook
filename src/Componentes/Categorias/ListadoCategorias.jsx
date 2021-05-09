import React from 'react'
import axios from 'axios';
import Base from '../Base';
import './styleCategorias.css'
import {Link} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrashAlt, faEdit, faEye, faPlus, faArrowAltCircleLeft} from '@fortawesome/free-solid-svg-icons';
import swal from 'sweetalert';

function ListadoCategorias() {

    const categorias = useSelector((estado) => estado.categorias)
    const dispatch = useDispatch();
    const [error, setError] = React.useState("");

    React.useEffect(async () => {
      try {
        const respuesta = await axios.get("http://localhost:3000/api/categorias");
        dispatch({ 
            type: "LISTADO_CATEGORIAS", 
            lista: respuesta.data 
        });
        setError("");
      } catch (e) {
        setError(e.message);
        swal("Error!", "No hay categorías agregadas.", "error");
      }
    }, []);

    const eliminarCategoria = async (eliminarCategoriaId) => {
        try {
          await axios.delete(`http://localhost:3000/api/categorias/${eliminarCategoriaId}`);
          dispatch({
            type: 'ELIMINAR_CATEGORIA',
            idCategoriaAEliminar: eliminarCategoriaId
          });
          setError("");
        } catch(e){
            setError(e.message);
            swal("Error!", "La categoría tiene libros asociados. No se puede borrar.", "error");
            
        }
      };

    return (
        <div>
            <Base />
            <div className="titles">
                <h2>Listado de Categorias</h2> 
            </div>
            <div className="listado">
                <Link to={"/api/categorias/agregar"}><button className="add"><FontAwesomeIcon icon={faPlus} /> Añadir</button></Link><br/>
                <table className="tabla">
                    <thead>
                        <tr> 
                            <th>ID</th>
                            <th>Nombre</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody >
                        {categorias.map((unaCategoria) => 
                            unaCategoria ? (
                                <tr key={unaCategoria.id}>
                                    <td className="columna">{unaCategoria.id}</td>
                                    <td className="columna">{unaCategoria.nombre}</td>
                                    <td className="columna">
                                        <Link to={"/api/categorias/editar/" + unaCategoria.id}><button  className="boton edit"><FontAwesomeIcon icon={faEdit} /></button></Link>
                                        <Link to={"/api/categorias/vista/" + unaCategoria.id}><button  className="boton view"><FontAwesomeIcon icon={faEye} /></button></Link>
                                        <button  className="boton danger" onClick={() => eliminarCategoria(unaCategoria.id)}><FontAwesomeIcon icon={faTrashAlt}/></button>
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

export default ListadoCategorias;