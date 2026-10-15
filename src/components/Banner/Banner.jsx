import miFoto from '../../assets/miFoto.svg';
import Icon from '../icons/Icon.jsx';
import './Banner.css';

const Banner = () => (
  <section id="inicio" className="hero-section">
    <div className="hero-glow hero-glow-one"></div><div className="hero-glow hero-glow-two"></div>
    <div className="hero-content">
      <div className="status-badge"><span className="status-dot"></span> Disponible para nuevos proyectos</div>
      <div className="profile-photo-container"><img src={miFoto} alt="Ilustración de perfil; reemplázala por tu foto" className="profile-photo" /></div>
      <p className="hero-eyebrow">HOLA, SOY</p>
      <h1 className="hero-title">Tu Nombre<br /><span className="text-cyan">Tu Apellido</span></h1>
      <h2 className="hero-subtitle">Estudiante de Desarrollo de Software | Desarrollador Web</h2>
      <p className="hero-description">Me gusta crear soluciones digitales prácticas, interfaces modernas y aplicaciones web que resuelvan problemas reales. Este portafolio reúne mis habilidades, proyectos y objetivos profesionales.</p>
      <div className="hero-buttons">
        <a href="#proyectos" className="btn-hero btn-primary-hero">Ver mis proyectos <Icon name="arrowUpRight" size={18} /></a>
        <a href="#contacto" className="btn-hero btn-secondary-hero">Contáctame</a>
      </div>
      <div className="hero-techline"><span>REACT</span><i></i><span>JAVASCRIPT</span><i></i><span>CSS</span><i></i><span>GIT</span></div>
    </div>
    <a className="scroll-indicator" href="#sobre-mi" aria-label="Desplazarse a la siguiente sección"><Icon name="arrowDown" size={26} /></a>
  </section>
);
export default Banner;
