import { createStore } from 'redux'

const listaInicial = {
    personas: [],
    libros: [],
    categorias: []
}

function reducer(state = listaInicial, action) {
    const nuevoEstado = JSON.parse(JSON.stringify(state));

    switch (action.type) {
        case 'LISTADO_PERSONAS':
            nuevoEstado.personas = action.lista;
            return nuevoEstado;

        case 'AGREGAR_PERSONA':
            nuevoEstado.personas.push(action.persona);
            return nuevoEstado;

        case 'ELIMINAR_PERSONA':
            nuevoEstado.personas = nuevoEstado.personas.filter(
                (unaPersona) => unaPersona.id !== action.idPersonaAEliminar
            );
            return nuevoEstado;

        case 'LISTADO_CATEGORIAS':
            nuevoEstado.categorias = action.lista;
            return nuevoEstado;

        case 'AGREGAR_CATEGORIA':
            nuevoEstado.categorias.push(action.categoria);
            return nuevoEstado;

        case 'EDITAR_CATEGORIA':
            nuevoEstado.categorias = nuevoEstado.categorias.map(
                (unaCategoria) => {
                    if(unaCategoria.id === action.idCategoria){
                        unaCategoria = action.editarCategoria
                        return unaCategoria;
                    }else{
                        return unaCategoria;
                    }
                }
            );
            return nuevoEstado;

        case 'ELIMINAR_CATEGORIA':
            nuevoEstado.categorias = nuevoEstado.categorias.filter(
                (unaCategoria) => unaCategoria.id !== action.idCategoriaAEliminar
            );
            return nuevoEstado;

        case 'LISTADO_LIBROS':
            nuevoEstado.libros = action.lista;
            return nuevoEstado;

        case 'AGREGAR_LIBRO':
            nuevoEstado.libros.push(action.libro);
            return nuevoEstado;
        
        case 'EDITAR_LIBRO_DEVOLVER':
            nuevoEstado.libros = nuevoEstado.libros.map(
                (unLibro) => {
                    if(unLibro.id !== action.devolver){
                        return unLibro.persona_id = null;
                    } else{
                        return unLibro;
                    }
                }
            );
            return nuevoEstado;

        case 'ELIMINAR_LIBRO':
            nuevoEstado.libros = nuevoEstado.libros.filter(
                (unLibro) => unLibro.id !== action.idLibroAEliminar
            );
            return nuevoEstado;

        default:
            return state;
    }
}

export default createStore(reducer);
