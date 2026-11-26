import Icon from '../icons/Icon.jsx';
import { PROJECTS } from '../../data/projects.js';
import { CERTIFICATES } from '../../data/certificates.js';
import { PROFILE } from '../../data/portfolio.js';
import { useLanguage } from '../../hooks/useLanguage.js';
import { translations } from '../../i18n/translations.js';
import './Perfil.css';

const pad = (value) => String(value).padStart(2, '0');

const Perfil = () => {
  const { lang } = useLanguage();
  const t = translations[lang].perfil;

  return (
    <section id="sobre-mi" className="section profile">
      <div className="section-wrap">
        <div className="profile__head" data-reveal>
          <span className="section-kicker">{t.kicker}</span>
          <h2 className="section-title">{t.title}</h2>
          <p className="profile__summary">{t.summary}</p>

          <ul className="profile__meta">
            <li>
              <Icon name="mapPin" size={15} /> {PROFILE.location} · {t.remote}
            </li>
            <li>
              <a href="#proyectos">
                <strong>{pad(PROJECTS.length)}</strong> {t.projectsStat}
              </a>
            </li>
            <li>
              <a href="#certificados">
                <strong>{pad(CERTIFICATES.length)}</strong> {t.certificatesStat}
              </a>
            </li>
          </ul>
        </div>

        <span className="profile__divider" aria-hidden="true" />

        <ul className="profile__highlights">
          {t.highlights.map((item, index) => (
            <li
              className="profile__highlight"
              key={item.title}
              data-reveal
              style={{ '--reveal-delay': `${index * 80}ms` }}
            >
              <span className="profile__highlight-icon">
                <Icon name={item.icon} size={20} />
              </span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Perfil;
