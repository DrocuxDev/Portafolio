import Icon from '../icons/Icon.jsx';
import './Perfil.css';

const Perfil = () => (
  <section id="sobre-mi" className="section profile-section">
    <div className="section-wrap">
      <div className="section-heading"><span className="section-kicker">Conóceme</span><h2 className="section-title">Sobre mí</h2><p className="section-intro">Un resumen de mi perfil, mi formación y el camino que estoy construyendo en el desarrollo de software.</p></div>
      <div className="profile-grid">
        <article className="profile-card profile-about">
          <div className="profile-card-heading"><span className="profile-icon"><Icon name="user" size={22} /></span><h3>Perfil profesional</h3></div>
          <p>Soy estudiante de Desarrollo de Software y me interesa la creación de aplicaciones web, el diseño de interfaces y la resolución de problemas mediante tecnología. Disfruto aprender herramientas nuevas y convertir ideas en proyectos funcionales.</p>
          <p>Actualmente estoy fortaleciendo mis conocimientos de React, JavaScript, HTML, CSS y control de versiones con Git y GitHub. Mi objetivo es seguir desarrollando proyectos que demuestren mis habilidades técnicas y mi capacidad para aprender.</p>
          <div className="profile-keywords"><span>Curiosidad</span><span>Trabajo en equipo</span><span>Aprendizaje continuo</span></div>
        </article>
        <article className="profile-card">
          <div className="profile-card-heading"><span className="profile-icon"><Icon name="graduation" size={22} /></span><h3>Formación</h3></div>
          <div className="timeline">
            <div className="timeline-item"><span className="timeline-period">ACTUALMENTE</span><h4>Desarrollo de Software</h4><p>Formación técnica y práctica en programación y desarrollo de aplicaciones.</p></div>
            <div className="timeline-item"><span className="timeline-period">EN PROGRESO</span><h4>Desarrollo Frontend</h4><p>HTML, CSS, JavaScript, React y diseño adaptable a diferentes pantallas.</p></div>
            <div className="timeline-item"><span className="timeline-period">PRÁCTICA PERSONAL</span><h4>Proyectos y herramientas</h4><p>Git, GitHub y construcción de un portafolio para mostrar mi aprendizaje.</p></div>
          </div>
        </article>
      </div>
    </div>
  </section>
);
export default Perfil;
