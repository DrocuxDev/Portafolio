import Navbar from './components/Navbar/Navbar.jsx';
import Icon from './components/icons/Icon.jsx';
import Banner from './components/Banner/Banner.jsx';
import Perfil from './components/Perfil/Perfil.jsx';
import Habilidades from './components/Habilidades/Habilidades.jsx';
import Proyectos from './components/Proyectos/Proyectos.jsx';
import Servicios from './components/Servicios/Servicios.jsx';
import Contacto from './components/Contacto/Contacto.jsx';
import './App.css';

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Banner />
        <Perfil />
        <Habilidades />
        <Proyectos />
        <Servicios />
        <Contacto />
      </main>
      <footer className="site-footer">
        <p>© {new Date().getFullYear()} Mi Portafolio. Creado con React.</p>
        <a href="#inicio">Volver arriba <Icon name="arrowUp" size={16} /></a>
      </footer>
    </>
  );
}

export default App;
