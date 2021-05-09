import { BrowserRouter as Router, Route } from 'react-router-dom';
import PaginaPrincipal from './Componentes/PaginaPrincipal';
import Aplicacion from './Componentes/Aplicacion';
import Informacion from './Componentes/Informacion';
import ListadoPersonas from './Componentes/Personas/ListadoPersonas';
import EditarPersona from './Componentes/Personas/EditarPersona';
import AgregarPersona from './Componentes/Personas/AgregarPersona';
import VistaPersona from './Componentes/Personas/VistaPersona';
import ListadoCategorias from './Componentes/Categorias/ListadoCategorias';
import EditarCategoria from './Componentes/Categorias/EditarCategoria';
import AgregarCategoria from './Componentes/Categorias/AgregarCategoria';
import VistaCategoria from './Componentes/Categorias/VistaCategoria';
import ListadoLibros from './Componentes/Libros/ListadoLibros';
import AgregarLibro from './Componentes/Libros/AgregarLibro';
import VistaLibro from './Componentes/Libros/VistaLibro';
import PrestarLibro from './Componentes/Libros/Prestar';


function App() {
  return (
    <div>
      <Router>
        <Route exact path="/" component={PaginaPrincipal} />
        <Route exact path="/api" component={Aplicacion} />
        <Route exact path="/info" component={Informacion} />
        <Route exact path="/api/personas" component={ListadoPersonas} />
        <Route exact path="/api/personas/editar/:id" component={EditarPersona} />
        <Route exact path="/api/personas/agregar" component={AgregarPersona} />
        <Route exact path="/api/personas/vista/:id" component={VistaPersona} />
        <Route exact path="/api/categorias" component={ListadoCategorias} />
        <Route exact path="/api/categorias/editar/:id" component={EditarCategoria} />
        <Route exact path="/api/categorias/agregar" component={AgregarCategoria} />
        <Route exact path="/api/categorias/vista/:id" component={VistaCategoria} />
        <Route exact path="/api/libros" component={ListadoLibros} />
        <Route exact path="/api/libros/agregar" component={AgregarLibro} />
        <Route exact path="/api/libros/vista/:id" component={VistaLibro} />
        <Route exact path="/api/libros/prestar/:id" component={PrestarLibro} />
      </Router>
    </div>
  );
}

export default App;
