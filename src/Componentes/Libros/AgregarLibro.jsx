import React from 'react';
import axios from "axios";
import Base from '../Base';
import './styleLibros.css'
import {Link,  useHistory} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import swal from 'sweetalert';

function AgregarLibro(props) {

    const categorias = useSelector((estado) => estado.categorias)
    const dispatch = useDispatch();
    const history = useHistory();
    const [error, setError] = React.useState("");
    const [form, setForm] = React.useState({
        nombre: "",
        descripcion: "",
        categoria_id: ""
    });

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
        }
    }, []);

    const agregarLibro = async () => {
        try {
            const respuesta = await axios.post("http://localhost:3000/api/libros", form);
      
            dispatch({ 
                type: "AGREGAR_LIBRO", 
                libroAAgregar: respuesta.data 
            });

            history.push("/api/libros");

        } catch (e) {
            console.log("Error agregar libro" + e.message);
            swal("Error!", "Faltan datos. Debe completar todos los campos.", "error");  
        }
    };

    const handleNombre = (e) => {
        const newForm = JSON.parse(JSON.stringify(form));
        newForm.nombre = e.target.value;
        setForm(newForm);
    };

    const handleDescripcion = (e) => {
        const newForm = JSON.parse(JSON.stringify(form));
        newForm.descripcion = e.target.value;
        setForm(newForm);
    };

    const handleCategoria = (e) => {
        const newForm = JSON.parse(JSON.stringify(form));
        newForm.categoria_id = e.target.value;
        setForm(newForm);
    };

    return (
        <div>
            <Base />
            <div className="titles">
                <h2>Agregar Libro</h2>
            </div>
            <div className="formulario formulario1"> 
                <label>Nombre</label><br/>
                <input type="text" name="nombre" placeholder="nombre" value={form.nombre} onChange={handleNombre}/><br/><br/>

                <label>Descripcion</label><br/>
                <input type="text" name="descripcion" placeholder="descripcion" value={form.descripcion} onChange={handleDescripcion}/><br/><br/>

                <label>Categoría</label><br/>
                <select name="categoria_id" onChange={handleCategoria} required>
                    <option value="">Seleccione una categoría</option>
                    {categorias.map((unaCategoria) =>
                        unaCategoria ? (
                        <option value={unaCategoria.id}>{unaCategoria.nombre}</option>
                        ) : null
                    )}
                </select><br/><br/>
                <div className="botonera">
                    <button onClick={agregarLibro} className="boton btn-guardar">Guardar</button>
                    <Link to={"/api/libros"}><button className="boton btn-cancelar">Cancelar</button></Link>
                </div>
            </div>
            
        </div>
    );
}

export default AgregarLibro;