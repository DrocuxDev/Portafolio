import { useState } from 'react';
import Icon from '../icons/Icon.jsx';
import './Contacto.css';

const Contacto = () => {
  const [formulario, setFormulario] = useState({ nombre: '', email: '', mensaje: '' });
  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setFormulario((anterior) => ({ ...anterior, [name]: value }));
  };
  const manejarEnvio = (e) => {
    e.preventDefault();
    alert(`¡Gracias por tu mensaje, ${formulario.nombre}! Este formulario es una demostración y todavía no envía correos.`);
    setFormulario({ nombre: '', email: '', mensaje: '' });
  };

  return (
    <section id="contacto" className="section contacto-section">
      <div className="section-wrap">
        <div className="section-heading"><span className="section-kicker">¿Tienes una idea?</span><h2 className="section-title">Trabajemos juntos</h2><p className="section-intro">Puedes utilizar este formulario de demostración para practicar el manejo de datos en React.</p></div>
        <div className="contacto-grid">
          <div className="contacto-info">
            <h3 className="info-title">Ponte en contacto</h3>
            <p className="info-desc">Estoy construyendo mi experiencia y abierto a aprender, colaborar y conversar sobre proyectos de software.</p>
            <div className="info-items">
              <div className="info-item"><span className="info-icon"><Icon name="mail" size={20} /></span><div><span className="item-label">Correo</span><p className="item-text">tu.correo@ejemplo.com</p></div></div>
              <div className="info-item"><span className="info-icon"><Icon name="mapPin" size={20} /></span><div><span className="item-label">Ubicación</span><p className="item-text">Lima, Perú</p></div></div>
              <div className="info-item"><span className="info-icon"><Icon name="github" size={20} /></span><div><span className="item-label">Código fuente</span><p className="item-text"><a href="https://github.com/" target="_blank" rel="noreferrer">Mi GitHub (editar enlace)</a></p></div></div>
            </div>
          </div>
          <div className="contacto-form-wrapper">
            <form onSubmit={manejarEnvio} className="contacto-form">
              <div className="form-group"><label htmlFor="nombre">Nombre</label><input type="text" id="nombre" name="nombre" value={formulario.nombre} onChange={manejarCambio} placeholder="Escribe tu nombre" required /></div>
              <div className="form-group"><label htmlFor="email">Correo electrónico</label><input type="email" id="email" name="email" value={formulario.email} onChange={manejarCambio} placeholder="tu@email.com" required /></div>
              <div className="form-group"><label htmlFor="mensaje">Mensaje</label><textarea id="mensaje" name="mensaje" value={formulario.mensaje} onChange={manejarCambio} placeholder="Cuéntame sobre tu idea..." rows="5" required /></div>
              <button type="submit" className="btn-submit">Enviar mensaje <Icon name="send" size={16} /></button>
              <p className="form-note">El envío es simulado; no se guardan ni envían los datos.</p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Contacto;
