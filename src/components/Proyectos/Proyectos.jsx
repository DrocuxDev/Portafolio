import Icon from '../icons/Icon.jsx';
import './Proyectos.css';
import proyectoWeb from '../../assets/proyecto-web.svg';
import proyectoDatos from '../../assets/proyecto-datos.svg';
import proyectoApp from '../../assets/proyecto-app.svg';

const proyectosData = [
  { id: 1, imagen: proyectoWeb, titulo: 'Sitio web responsivo', descripcion: 'Página web adaptable a computadoras, tablets y celulares, organizada en componentes reutilizables.', tecnologias: ['HTML5', 'CSS3', 'React'], linkDemo: '#contacto', linkCodigo: 'https://github.com/' },
  { id: 2, imagen: proyectoDatos, titulo: 'Panel de información', descripcion: 'Propuesta de panel para ordenar información importante y presentarla de manera fácil de leer.', tecnologias: ['JavaScript', 'CSS Grid', 'UI'], linkDemo: '#contacto', linkCodigo: 'https://github.com/' },
  { id: 3, imagen: proyectoApp, titulo: 'Prototipo de aplicación', descripcion: 'Interfaz de ejemplo para practicar navegación, formularios y separación del código por componentes.', tecnologias: ['React', 'Bootstrap', 'Git'], linkDemo: '#contacto', linkCodigo: 'https://github.com/' },
];

const Proyectos = () => (
  <section id="proyectos" className="section projects-section">
    <div className="section-wrap">
      <div className="section-heading"><span className="section-kicker">Trabajo seleccionado</span><h2 className="section-title">Proyectos destacados</h2><p className="section-intro">Sustituye estas tarjetas de ejemplo por los trabajos que hayas realizado en clase o por tu cuenta.</p></div>
      <div className="proyectos-grid">
        {proyectosData.map((proyecto) => (
          <article key={proyecto.id} className="proyecto-card">
            <div className="proyecto-imagen"><img src={proyecto.imagen} alt={`Ilustración de ${proyecto.titulo}`} loading="lazy" /></div>
            <div className="proyecto-contenido">
              <span className="project-index">PROYECTO 0{proyecto.id}</span>
              <h3 className="proyecto-titulo">{proyecto.titulo}</h3>
              <p className="proyecto-desc">{proyecto.descripcion}</p>
              <div className="proyecto-tags">{proyecto.tecnologias.map((tech) => <span key={tech} className="tech-tag">{tech}</span>)}</div>
              <div className="proyecto-links">
                <a href={proyecto.linkDemo} className="btn-proyecto btn-demo">Ver proyecto <Icon name="arrowUpRight" size={16} /></a>
                <a href={proyecto.linkCodigo} target="_blank" rel="noreferrer" className="btn-proyecto btn-codigo">Ver código <Icon name="arrowUpRight" size={16} /></a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);
export default Proyectos;
