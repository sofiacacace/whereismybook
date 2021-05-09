import React from 'react';
import Base from '../Base';
import axios from 'axios';
import {Link, useHistory, useParams } from 'react-router-dom';
import './styleLibros.css';
import swal from "sweetalert";

function Prestar(props) {

    const params = useParams();
    const history = useHistory();
    const [personas, setPersonas] = React.useState([]);
    const [form, setForm] = React.useState({
      persona_id:''
    });
    const obtenerPersonas = async () => {
      try {
        const respuesta = await axios.get("http://localhost:3000/api/personas");
        setPersonas(respuesta.data);
      } catch (e) {
        swal("Error", e.response.data, "error");
      }
    };

    React.useEffect(() => {
        obtenerPersonas();
    }, []);

    const handlePersonaAPrestar = (e) => {
        const newForm = JSON.parse(JSON.stringify(form));
        newForm.persona_id = e.target.value;
        setForm(newForm);
      };

    const prestarLibro = async () => {
        try {
            await axios.put("http://localhost:3000/api/libros/prestar/" + params.id, form);
            history.push("/api/libros");
            
        } catch (e) {
            swal("Error", "El libro ya se encuentra prestado.", "error");
        }
    };

    return (
        <div>
            <Base />
            <div className="titles">
                <h2>Prestar Libro</h2>
            </div>
            <div className="formulario formulario3"> 
                <label>Persona:</label><br/>
                <select name="nombre" onChange={handlePersonaAPrestar} required>
                    <option value="">Seleccione una persona</option>
                    {personas
                        ? personas.map((unaPersona) => (
                            <option value={unaPersona.id}>{unaPersona.nombre} {unaPersona.apellido}</option>
                        ))
                        : null}
                </select><br/><br/>

                <div className="botonera">
                    <button className="boton btn-guardar" onClick={prestarLibro}>Guardar</button>
                    <Link to={"/api/libros"}><button className="boton btn-cancelar">Cancelar</button></Link>
                </div>
            </div>
            
        </div>
    );
}

export default Prestar;