import { useState } from 'react';
import Icon from '../icons/Icon.jsx';
import { useLanguage } from '../../hooks/useLanguage.js';
import { useCvAvailable } from '../../hooks/useCvAvailable.js';
import { translations } from '../../i18n/translations.js';
import { PROFILE } from '../../data/portfolio.js';
import './Banner.css';

const HERO_SCENES = ['/hero-neon.png', '/hero-neon-2.png', '/hero-neon-3.png'];

const Banner = () => {
  const { lang } = useLanguage();
  const t = translations[lang].hero;
  const cvAvailable = useCvAvailable();
  const [activeScene, setActiveScene] = useState(0);
  const changeScene = (step) => {
    setActiveScene((current) => (current + step + HERO_SCENES.length) % HERO_SCENES.length);
  };

  return (
    <section id="inicio" className="hero">
      {HERO_SCENES.map((scene, index) => (
        <div
          key={scene}
          className={`hero__scene${index === activeScene ? ' is-active' : ''}`}
          style={{ '--scene-image': `url('${scene}')` }}
          aria-hidden="true"
        />
      ))}

      <div className="hero__inner">
        <div className="hero__copy" data-reveal>
          <p className="hero__badge">
            <span className="status-dot" aria-hidden="true" /> {t.badge}
          </p>

          <p className="hero__eyebrow">{t.eyebrow}</p>
          <h1 className="hero-title">
            <span className="hero-title__first">{PROFILE.firstName}</span>
            <span className="accent" data-text={PROFILE.lastName}>
              {PROFILE.lastName}
            </span>
          </h1>
          <p className="hero__role">{t.role}</p>
          <p className="hero__desc">{t.desc}</p>

          <div className="hero__actions">
            <a className="dx-btn dx-btn--primary" href="#proyectos">
              {t.ctaProjects} <Icon name="arrowRight" size={18} />
            </a>
            <a className="dx-btn dx-btn--ghost" href="#contacto">
              {t.ctaContact}
            </a>
            {cvAvailable && (
              <a className="dx-btn dx-btn--ghost" href={PROFILE.cvPath} download>
                {t.ctaCv} <Icon name="download" size={17} />
              </a>
            )}
          </div>

          <ul className="hero__socials" aria-label={t.socials}>
            <li>
              <a href={PROFILE.github} target="_blank" rel="noreferrer">
                <Icon name="github" size={17} /> GitHub
              </a>
            </li>
            <li>
              <a href={PROFILE.linkedin} target="_blank" rel="noreferrer">
                <Icon name="linkedin" size={17} /> LinkedIn
              </a>
            </li>
            <li>
              <a href={`mailto:${PROFILE.email}`}>
                <Icon name="mail" size={17} /> {PROFILE.email}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <button className="hero__arrow hero__arrow--prev" type="button" onClick={() => changeScene(-1)} aria-label={t.previousScene}>
        <span aria-hidden="true">‹</span>
      </button>
      <button className="hero__arrow hero__arrow--next" type="button" onClick={() => changeScene(1)} aria-label={t.nextScene}>
        <span aria-hidden="true">›</span>
      </button>
      <div className="hero__dots" role="group" aria-label={t.scenes}>
        {HERO_SCENES.map((scene, index) => (
          <button
            key={scene}
            type="button"
            className={`hero__dot${index === activeScene ? ' is-active' : ''}`}
            aria-label={`${t.scene} ${index + 1}`}
            aria-pressed={index === activeScene}
            onClick={() => setActiveScene(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default Banner;
