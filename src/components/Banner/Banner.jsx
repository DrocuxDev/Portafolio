import { useState } from 'react';
import Icon from '../icons/Icon.jsx';
import miFoto from '../../assets/miFoto.svg';
import { useLanguage } from '../../hooks/useLanguage.js';
import { useCvAvailable } from '../../hooks/useCvAvailable.js';
import { translations } from '../../i18n/translations.js';
import { PROFILE } from '../../data/portfolio.js';
import './Banner.css';

const Banner = () => {
  const { lang } = useLanguage();
  const t = translations[lang].hero;
  const cvAvailable = useCvAvailable();

  /**
   * La portada original de la marca vive en public/portada-dev.png (ruta /portada-dev.png).
   * Si el archivo no está disponible, el hero cae con elegancia al retrato existente
   * en lugar de mostrar una imagen rota; no se sustituye por una imitación en CSS.
   */
  const [coverFailed, setCoverFailed] = useState(false);

  return (
    <section id="inicio" className="hero">
      <div className="hero__glow hero__glow--violet" aria-hidden="true" />
      <div className="hero__glow hero__glow--cyan" aria-hidden="true" />

      <div className="hero__inner">
        <div className="hero__copy" data-reveal>
          <p className="hero__badge">
            <span className="status-dot" aria-hidden="true" /> {t.badge}
          </p>

          <p className="hero__eyebrow">{t.eyebrow}</p>
          <h1 className="hero-title">
            {PROFILE.firstName}{' '}
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

        <div className="hero__visual" data-reveal data-reveal-delay="140">
          <div className={`hero__frame${coverFailed ? ' hero__frame--avatar' : ' corner-frame'}`}>
            {coverFailed ? (
              <img className="hero__avatar" src={miFoto} alt={t.avatarAlt} width="300" height="300" />
            ) : (
              <img
                className="hero__cover"
                src={PROFILE.coverPath}
                alt={t.coverAlt}
                width="1672"
                height="940"
                decoding="async"
                fetchPriority="high"
                onError={() => setCoverFailed(true)}
              />
            )}
          </div>
        </div>
      </div>

      <div className="hero__band">
        <div className="tech-marquee" aria-hidden="true">
          <div className="tech-marquee__track">
            {[...t.marquee, ...t.marquee].map((tech, index) => (
              <span key={`${tech}-${index}`}>
                {tech}
                <i />
              </span>
            ))}
          </div>
        </div>
      </div>

      <a className="hero__scroll" href="#sobre-mi" aria-label={t.scroll}>
        <Icon name="arrowDown" size={22} />
      </a>
    </section>
  );
};

export default Banner;
