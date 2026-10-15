import { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="navbar navbar-portfolio">
      <a className="navbar-logo" href="#inicio" onClick={closeMenu} aria-label="Ir al inicio">
        <span className="text-cyan">TU</span> PORTAFOLIO<span className="logo-dot">.</span>
      </a>
      <div className={`navbar-links ${isOpen ? 'open' : ''}`}>
        <a href="#sobre-mi" onClick={closeMenu}>Perfil</a>
        <a href="#tech-stack" onClick={closeMenu}>Habilidades</a>
        <a href="#proyectos" onClick={closeMenu}>Proyectos</a>
        <a href="#servicios" onClick={closeMenu}>Servicios</a>
        <a href="#contacto" onClick={closeMenu}>Contacto</a>
      </div>
      <button className="navbar-toggle" type="button" aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={isOpen} onClick={() => setIsOpen(!isOpen)}>
        <span className="bar"></span><span className="bar"></span><span className="bar"></span>
      </button>
    </nav>
  );
};

export default Navbar;
