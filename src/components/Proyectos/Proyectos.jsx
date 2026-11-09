import { useState, useEffect } from 'react';
import Icon from '../icons/Icon.jsx';
import AmbientGlow from '../effects/AmbientGlow.jsx';
import { useLanguage } from '../../hooks/useLanguage.js';
import { translations } from '../../i18n/translations.js';
import { PROFILE } from '../../data/portfolio.js';
import { PROJECTS } from '../../data/projects.js';
import './Proyectos.css';

const Proyectos = () => {
  const { lang } = useLanguage();
  const t = translations[lang].proyectos;
  const [highlightedId, setHighlightedId] = useState(null);

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash && hash.startsWith('#proyecto-')) {
        const id = hash.replace('#proyecto-', '');
        setHighlightedId(id);
        const el = document.getElementById(`proyecto-${id}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        const timer = setTimeout(() => {
          setHighlightedId(null);
        }, 2200);
        return () => clearTimeout(timer);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const renderCard = (project, index) => {
    const copy = t.items[project.id];
    const isHighlighted = highlightedId === project.id;

    return (
      <article
        key={project.id}
        id={`proyecto-${project.id}`}
        className={`case-card case-card--${project.id}${isHighlighted ? ' is-highlighted' : ''}`}
        data-reveal
      >
        <div className="case-card__header">
          <div className="case-card__meta">
            <span className="case-card__index">{`0${index + 1}`}</span>
            <span className="case-card__category">{copy.category}</span>
          </div>
          <h3 className="case-card__title">{copy.titulo}</h3>
        </div>

        <div className="case-card__content">
          <div className="case-card__visual">
            <div className="window-frame">
              <div className="window-frame__bar">
                <div className="window-frame__dots" aria-hidden="true">
                  <span className="window-frame__dot window-frame__dot--red" />
                  <span className="window-frame__dot window-frame__dot--yellow" />
                  <span className="window-frame__dot window-frame__dot--green" />
                </div>
                <div className="window-frame__address">
                  <span>{project.windowUrl || `app://${project.id}.drocuxdev`}</span>
                </div>
              </div>

              <div className="case-card__media">
                <img
                  src={project.image}
                  alt={copy.imageAlt}
                  loading="lazy"
                  decoding="async"
                  width="720"
                  height="450"
                />
                <p className="case-card__status">
                  <span className="status-dot" aria-hidden="true" /> {t.statusValue}
                </p>
              </div>
            </div>
          </div>

          <div className="case-card__details">
            <div className="case-points">
              <div className="case-point">
                <span className="case-point__label">{t.problemLabel}</span>
                <p className="case-point__text">{copy.problem}</p>
              </div>

              <div className="case-point">
                <span className="case-point__label">{t.solutionLabel}</span>
                <p className="case-point__text">{copy.solution}</p>
              </div>

              <div className="case-point">
                <span className="case-point__label">{t.roleLabel}</span>
                <p className="case-point__text">{copy.role}</p>
              </div>

              <div className="case-point case-point--highlight">
                <span className="case-point__label">{t.resultLabel}</span>
                <p className="case-point__text">{copy.result}</p>
              </div>
            </div>

            <div className="case-card__footer">
              <div className="case-card__stack" aria-label={t.stackLabel}>
                <ul>
                  {project.tech.map((tech) => (
                    <li key={tech} className="chip">
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="case-card__links">
                {project.repo && (
                  <a
                    className="dx-btn dx-btn--primary case-card__link"
                    href={project.repo}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Icon name="github" size={16} /> {t.codeLabel}
                    <Icon name="externalLink" size={14} />
                  </a>
                )}
                {project.design && (
                  <a
                    className="dx-btn dx-btn--ghost case-card__link"
                    href={project.design}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Icon name="layout" size={16} /> {t.designLabel}
                    <Icon name="externalLink" size={14} />
                  </a>
                )}
                {project.files?.map((file) => (
                  <a
                    className="dx-btn dx-btn--ghost case-card__link"
                    href={file.href}
                    download={file.name}
                    key={file.href}
                  >
                    <Icon name="download" size={16} /> {t[file.label]}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </article>
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

        <div className="projects__list">
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
