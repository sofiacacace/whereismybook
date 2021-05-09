import React from 'react';
import axios from "axios";
import Base from '../Base';
import './styleCategorias.css'
import {Link,  useHistory} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import swal from 'sweetalert';

function AgregarCategoria(props) {

    const dispatch = useDispatch();
    const history = useHistory();
    const [form, setForm] = React.useState({
        nombre: ""
    });

    const agregarPersona = async () => {
        try {
            const respuesta = await axios.post("http://localhost:3000/api/categorias", form);
      
            dispatch({ 
                type: "AGREGAR_CATEGORIA", 
                categoriaAAgregar: respuesta.data 
            });

            history.push("/api/categorias");

        } catch (e) {
            console.log("Error agregar categoria" + e.message);
            swal("Error!", "No ingresó el nombre de la categoría.", "error"); 
        }
    };

    const handleNombre = (e) => {
        const newForm = JSON.parse(JSON.stringify(form));
        newForm.nombre = e.target.value;
        setForm(newForm);
    };

    return (
        <div>
            <Base />
            <div className="titles">
                <h2>Agregar Categoria</h2>
            </div>
            <div className="formulario formulario1"> 
                <label>Nombre</label><br/>
                <input type="text" name="nombre" placeholder="nombre" value={form.nombre} onChange={handleNombre}/><br/><br/>

                <div className="botonera">
                    <button onClick={agregarPersona} className="boton btn-guardar">Guardar</button>
                    <Link to={"/api/categorias"}><button className="boton btn-cancelar">Cancelar</button></Link>
                </div>
            </div>
            
        </div>
    );
}

export default AgregarCategoria;