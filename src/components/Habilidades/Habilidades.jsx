import './Habilidades.css';

const skillsData = [
  { id: 1, titulo: 'HTML5', descripcion: 'Estructura semántica para páginas web.', nivel: 'Fundamentos' },
  { id: 2, titulo: 'CSS3', descripcion: 'Diseño, Flexbox, Grid y adaptación responsive.', nivel: 'En práctica' },
  { id: 3, titulo: 'JavaScript', descripcion: 'Variables, funciones, arreglos y eventos.', nivel: 'En aprendizaje' },
  { id: 4, titulo: 'React', descripcion: 'Componentes, props, estado y composición de interfaces.', nivel: 'En aprendizaje' },
  { id: 5, titulo: 'Git y GitHub', descripcion: 'Control de versiones y publicación de repositorios.', nivel: 'En práctica' },
  { id: 6, titulo: 'Bootstrap', descripcion: 'Clases de utilidad y componentes adaptables.', nivel: 'Fundamentos' },
];

const Habilidades = () => (
  <section id="tech-stack" className="section skills-section">
    <div className="section-wrap">
      <div className="section-heading"><span className="section-kicker">Tecnologías</span><h2 className="section-title">Habilidades y herramientas</h2><p className="section-intro">Estas son algunas de las tecnologías que utilizo o que estoy incorporando a mi flujo de trabajo.</p></div>
      <div className="habilidades-grid">
        {skillsData.map((skill, index) => (
          <article key={skill.id} className="skill-card">
            <div className="skill-header"><span className="skill-number">0{index + 1}</span><span className="skill-status">{skill.nivel}</span></div>
            <h3 className="skill-title">{skill.titulo}</h3>
            <p className="skill-desc">{skill.descripcion}</p>
            <div className="skill-progress"><span style={{ width: `${[78, 70, 52, 48, 60, 65][index]}%` }}></span></div>
          </article>
        ))}
      </div>
      <p className="skills-note">Nota: actualiza los niveles según tus conocimientos reales.</p>
    </div>
  </section>
);
export default Habilidades;
