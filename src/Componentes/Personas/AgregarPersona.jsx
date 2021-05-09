import React from 'react';
import axios from "axios";
import Base from '../Base';
import './stylePersonas.css'
import {Link,  useHistory} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import swal from 'sweetalert';

function AgregarPersona(props) {

    const dispatch = useDispatch();
    const history = useHistory();
    const [form, setForm] = React.useState({
        nombre: "",
        apellido: "",
        alias: "",
        email: "",
    });

    const agregarPersona = async () => {
        try {
            const respuesta = await axios.post("http://localhost:3000/api/personas", form);
      
            dispatch({ 
                type: "AGREGAR_PERSONA", 
                personaAAgregar: respuesta.data 
            });

            history.push("/api/personas");

        } catch (e) {
            console.log("Error agregar persona" + e.message);
            swal("Error!", "Falta ingresar datos. Debe completar todos los campos.", "error");
        }
    };

    const handleNombre = (e) => {
        const newForm = JSON.parse(JSON.stringify(form));
        newForm.nombre = e.target.value;
        setForm(newForm);
    };

    const handleApellido = (e) => {
        const newForm = JSON.parse(JSON.stringify(form));
        newForm.apellido = e.target.value;
        setForm(newForm);
    };

    const handleEmail = (e) => {
        const newForm = JSON.parse(JSON.stringify(form));
        newForm.email = e.target.value;
        setForm(newForm);
    };

    const handleAlias = (e) => {
        const newForm = JSON.parse(JSON.stringify(form));
        newForm.alias = e.target.value;
        setForm(newForm);
    }

    return (
        <div>
            <Base />
            <div className="titles">
                <h2>Agregar Persona</h2>
            </div>
            <div className="formulario formulario1"> 
                <label>Nombre</label><br/>
                <input type="text" name="nombre" placeholder="nombre" value={form.nombre} onChange={handleNombre}/><br/><br/>

                <label>Apellido</label><br/>
                <input type="text" name="apellido" placeholder="apellido" value={form.apellido} onChange={handleApellido}/><br/><br/>

                <label>E-Mail</label><br/>
                <input type="text" name="email" placeholder="email" value={form.email} onChange={handleEmail}/><br/><br/>

                <label>Alias</label><br/>
                <input type="text" name="alias" placeholder="alias" value={form.alias} onChange={handleAlias}/><br/><br/>
                
                <div className="botonera">
                    <button onClick={agregarPersona} className="boton btn-guardar">Guardar</button>
                    <Link to={"/api/personas"}><button className="boton btn-cancelar">Cancelar</button></Link>
                </div>
            </div>
            
        </div>
    );
}

export default AgregarPersona;