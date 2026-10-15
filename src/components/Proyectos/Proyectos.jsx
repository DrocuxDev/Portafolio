import Icon from '../icons/Icon.jsx';
import { useLanguage } from '../../hooks/useLanguage.js';
import { translations } from '../../i18n/translations.js';
import { PROFILE } from '../../data/portfolio.js';
import { PROJECTS } from '../../data/projects.js';
import './Proyectos.css';

const Proyectos = () => {
  const { lang } = useLanguage();
  const t = translations[lang].proyectos;
  const [featured, ...rest] = PROJECTS;

  const renderCard = (project, index, isFeatured) => {
    const copy = t.items[project.id];
    return (
      <article
        key={project.id}
        className={`project-card${isFeatured ? ' project-card--featured' : ''}`}
        data-reveal
        data-reveal-delay={index * 90}
      >
        <div className="project-card__media">
          <img src={project.image} alt={copy.titulo} loading="lazy" decoding="async" width="720" height="460" />
          <p className="project-card__state">
            <span className="status-dot" aria-hidden="true" /> {t.statusValue}
          </p>
        </div>

        <div className="project-card__body">
          <p className="project-card__label">
            {isFeatured ? t.featuredLabel : `0${index + 1}`}
          </p>
          <h3 className="project-card__title">{copy.titulo}</h3>
          <p className="project-card__desc">{copy.descripcion}</p>

          <p className="project-card__contribution">
            <strong>{t.contributionLabel}:</strong> {copy.contribution}
          </p>

          <div className="project-card__stack">
            <span className="project-card__stack-label">{t.stackLabel}</span>
            <ul>
              {project.tech.map((tech) => (
                <li key={tech} className="chip">
                  {tech}
                </li>
              ))}
            </ul>
          </div>

          <a
            className="dx-btn dx-btn--violet project-card__link"
            href={project.repo}
            target="_blank"
            rel="noreferrer"
          >
            <Icon name="github" size={17} /> {t.codeLabel}
            <Icon name="externalLink" size={15} />
          </a>
        </div>
      </article>
    );
  };

  return (
    <section id="proyectos" className="section projects">
      <div className="section-wrap">
        <div className="section-heading" data-reveal>
          <span className="section-kicker">{t.kicker}</span>
          <h2 className="section-title">{t.title}</h2>
          <p className="section-intro">{t.intro}</p>
        </div>

        <div className="projects__grid">
          {featured && renderCard(featured, 0, true)}
          {rest.map((project, index) => renderCard(project, index + 1, false))}
        </div>

        <p className="projects__more" data-reveal>
          <a href={PROFILE.github} target="_blank" rel="noreferrer">
            {t.all} <Icon name="arrowUpRight" size={16} />
          </a>
        </p>
      </div>
    </section>
  );
};

export default Proyectos;
