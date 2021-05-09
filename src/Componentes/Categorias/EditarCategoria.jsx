import React from 'react'
import axios from 'axios';
import Base from '../Base';
import './styleCategorias.css'
import { Link, useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import swal from 'sweetalert';

function EditarCategoria(props) {

    const params = useParams();
    const history = useHistory();
    const lista = useSelector((state) => state.categorias);
    const [form, setForm] = React.useState({
        nombre: ""
    });

    const listadoCategorias = lista.find((unaCategoria) => unaCategoria.id == params.id);

    const handleChangeNombre = (e) => {
        const newForm = JSON.parse(JSON.stringify(form));
        newForm.nombre = e.target.value;
        setForm(newForm);
    };

    const editarCategoria = async () => {
        try {
            await axios.put("http://localhost:3000/api/categorias/" + params.id, form);
            history.push("/api/categorias");

        } catch (e) {
            swal("Error!", "La categoría tiene libros asignados o faltan datos.", "error");
        }
    };

    return (
        <div>
            <Base />
            <div className="titles">
                <h2>Editar Categoria</h2>
            </div>
            <div className="formulario formulario2"> 
                <label>Nombre</label><br/>
                <input type="text" value={form.nombre} placeholder={listadoCategorias.nombre} onChange={handleChangeNombre}/><br/><br/>
                
                <div className="botonera">
                    <button onClick={editarCategoria} className="boton btn-guardar">Guardar</button>
                    <Link to={"/api/categorias"}><button className="boton btn-cancelar">Cancelar</button></Link>
                </div>
            </div>
        </div>
    );
}

export default EditarCategoria;
