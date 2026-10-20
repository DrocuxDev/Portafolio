import Icon from '../icons/Icon.jsx';
import InteractiveCard from '../effects/InteractiveCard.jsx';
import AmbientGlow from '../effects/AmbientGlow.jsx';
import { useLanguage } from '../../hooks/useLanguage.js';
import { translations } from '../../i18n/translations.js';
import { PROFILE } from '../../data/portfolio.js';
import { PROJECTS } from '../../data/projects.js';
import './Proyectos.css';

const movePreview = (event) => {
  if (event.pointerType === 'touch'
    || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const bounds = event.currentTarget.getBoundingClientRect();
  const x = Math.min(100, Math.max(0, ((event.clientX - bounds.left) / bounds.width) * 100));
  const y = Math.min(100, Math.max(0, ((event.clientY - bounds.top) / bounds.height) * 100));

  event.currentTarget.style.setProperty('--preview-x', `${x}%`);
  event.currentTarget.style.setProperty('--preview-y', `${y}%`);
};

const resetPreview = (event) => {
  event.currentTarget.style.setProperty('--preview-x', '50%');
  event.currentTarget.style.setProperty('--preview-y', '50%');
};

const Proyectos = () => {
  const { lang } = useLanguage();
  const t = translations[lang].proyectos;

  const renderCard = (project, index) => {
    const copy = t.items[project.id];
    return (
      <InteractiveCard
        key={project.id}
        className={`project-card project-card--${project.id}`}
        delay={index * 0.08}
        tilt={1.5}
      >
        <div
          className="project-card__media"
          onPointerMove={movePreview}
          onPointerLeave={resetPreview}
        >
          <img src={project.image} alt={copy.imageAlt} loading="lazy" decoding="async" width="720" height="460" />
          <p className="project-card__state">
            <span className="status-dot" aria-hidden="true" /> {t.statusValue}
          </p>
        </div>

        <div className="project-card__body">
          <p className="project-card__label">{`0${index + 1}`}</p>
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

          <div className="project-card__links">
            {project.repo && (
              <a
                className="dx-btn dx-btn--violet project-card__link"
                href={project.repo}
                target="_blank"
                rel="noreferrer"
              >
                <Icon name="github" size={17} /> {t.codeLabel}
                <Icon name="externalLink" size={15} />
              </a>
            )}
            {project.design && (
              <a
                className="dx-btn dx-btn--ghost project-card__link"
                href={project.design}
                target="_blank"
                rel="noreferrer"
              >
                <Icon name="layout" size={17} /> {t.designLabel}
                <Icon name="externalLink" size={15} />
              </a>
            )}
            {project.files?.map((file) => (
              <a
                className="dx-btn dx-btn--ghost project-card__link"
                href={file.href}
                download={file.name}
                key={file.href}
              >
                <Icon name="download" size={17} /> {t[file.label]}
              </a>
            ))}
          </div>
        </div>
      </InteractiveCard>
    );
  };

  return (
    <section id="proyectos" className="section projects">
      <AmbientGlow />
      <div className="section-wrap">
        <div className="section-heading" data-reveal>
          <span className="section-kicker">{t.kicker}</span>
          <h2 className="section-title">{t.title}</h2>
          <p className="section-intro">{t.intro}</p>
        </div>

        <div className="projects__grid">
          {PROJECTS.map((project, index) => renderCard(project, index))}
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
