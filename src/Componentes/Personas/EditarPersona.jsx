import React from 'react'
import axios from 'axios';
import './stylePersonas.css';
import Base from '../Base';
import { Link, useParams, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import swal from "sweetalert";

function EditarPersona(props) {

    const params = useParams();
    const history = useHistory();
    const list = useSelector((state) => state.personas);
    const [form, setForm] = React.useState({
      nombre: "",
      apellido: "",
      email: "",
      alias: ""  
    });

    const listadoPersonas = list.find((unaPersona) => unaPersona.id == params.id);

    const handleChangeNombre = (e) => {
        const newForm = JSON.parse(JSON.stringify(form));
        newForm.nombre = e.target.value;
        setForm(newForm);
      };
    const handleChangeApellido = (e) => {
        const newForm = JSON.parse(JSON.stringify(form));
        newForm.apellido = e.target.value;
        setForm(newForm);
    };

    const handleChangeAlias = (e) => {
        const newForm = JSON.parse(JSON.stringify(form));
        newForm.alias = e.target.value;
        setForm(newForm);
    };

    const editarPersona = async () => {
        try {
            await axios.put("http://localhost:3000/api/personas/" + params.id, form);
            history.push("/api/personas");

        } catch (e) {
            swal("Error!", "Faltan datos.", "error");
        }
    };

    return (
        <div>
            <Base />
            <div className="titles">
                <h2>Editar Persona</h2>
            </div>
            <div className="formulario formulario2"> 
                <label>Nombre</label><br/>
                <input type="text" placeholder={listadoPersonas.nombre} value={form.nombre} onChange={handleChangeNombre}/><br/><br/>
                <label>Apellido</label><br/>
                <input type="text" placeholder={listadoPersonas.apellido} value={form.apellido} onChange={handleChangeApellido}/><br/><br/>
                <label>E-Mail</label><br/>
                <input type="text" placeholder={listadoPersonas.email} disabled="disabled"/>
                <small>  (*) El mail no puede ser modificado.</small><br/><br/>
                <label>Alias</label><br/>
                <input type="text" placeholder={listadoPersonas.alias} value={form.alias} onChange={handleChangeAlias}/><br/><br/>
                
                <div className="botonera">
                    <button onClick={editarPersona} className="boton btn-guardar">Guardar</button>
                    <Link to={"/api/personas"}><button className="boton btn-cancelar">Cancelar</button></Link>
                </div>
            </div>
        </div>
    );
}

export default EditarPersona;