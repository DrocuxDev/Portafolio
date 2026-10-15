import Icon from '../icons/Icon.jsx';
import './Servicios.css';

const services = [
  { icon: 'code', title: 'Desarrollo web', text: 'Construcción de páginas claras, modernas y adaptables a diferentes dispositivos.' },
  { icon: 'devices', title: 'Diseño responsive', text: 'Organización visual de contenidos para una experiencia consistente en PC y móvil.' },
  { icon: 'blocks', title: 'Componentes React', text: 'División de interfaces en piezas reutilizables para mantener el proyecto ordenado.' },
];

const Servicios = () => (
  <section id="servicios" className="section services-section">
    <div className="section-wrap">
      <div className="section-heading"><span className="section-kicker">En qué puedo aportar</span><h2 className="section-title">Servicios</h2><p className="section-intro">Estas tarjetas son ejemplos de áreas de interés. Ajusta el contenido a lo que realmente sabes hacer.</p></div>
      <div className="services-grid">
        {services.map((service) => <article className="service-card" key={service.title}><span className="service-icon"><Icon name={service.icon} size={24} /></span><h3>{service.title}</h3><p>{service.text}</p><a href="#contacto">Hablemos <Icon name="arrowUpRight" size={16} /></a></article>)}
      </div>
    </div>
  </section>
);
export default Servicios;
