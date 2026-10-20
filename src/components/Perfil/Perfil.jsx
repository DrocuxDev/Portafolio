import Icon from '../icons/Icon.jsx';
import { Award, FolderCode } from 'lucide-react';
import InteractiveCard from '../effects/InteractiveCard.jsx';
import AmbientGlow from '../effects/AmbientGlow.jsx';
import { PROJECTS } from '../../data/projects.js';
import { CERTIFICATES } from '../../data/certificates.js';
import { useLanguage } from '../../hooks/useLanguage.js';
import { translations } from '../../i18n/translations.js';
import './Perfil.css';

const Perfil = () => {
  const { lang } = useLanguage();
  const t = translations[lang].perfil;

  return (
    <section id="sobre-mi" className="section profile">
      <AmbientGlow />
      <div className="section-wrap">
        <div className="section-heading" data-reveal>
          <span className="section-kicker">{t.kicker}</span>
          <h2 className="section-title">{t.title}</h2>
          <p className="section-intro">{t.intro}</p>
        </div>

        <div className="profile__grid">
          <InteractiveCard className="profile-card profile__about">
            <p className="profile__lead">{t.p1}</p>
            <p className="profile__text">{t.p2}</p>
            <ul className="profile__keywords">
              {t.keywords.map((keyword) => (
                <li key={keyword}>{keyword}</li>
              ))}
            </ul>
          </InteractiveCard>

          <div className="profile__side">
            <InteractiveCard className="profile-card profile__block profile__facts" delay={0.08}>
              <h3 className="profile__heading">
                <span className="profile__heading-icon">
                  <Icon name="user" size={18} />
                </span>
                {t.factsTitle}
              </h3>
              <dl className="profile__dl">
                {t.facts.map((fact) => (
                  <div className="profile__dl-row" key={fact.label}>
                    <dt>{fact.label}</dt>
                    <dd>{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </InteractiveCard>

            <InteractiveCard className="profile-card profile__block profile__focus-card" delay={0.16}>
              <h3 className="profile__heading">
                <span className="profile__heading-icon">
                  <Icon name="spark" size={18} />
                </span>
                {t.focusTitle}
              </h3>
              <ul className="profile__focus">
                {t.focus.map((item) => (
                  <li key={item}>
                    <Icon name="arrowRight" size={14} /> {item}
                  </li>
                ))}
              </ul>
            </InteractiveCard>
          </div>

          <InteractiveCard className="profile-card profile__stat profile__stat--projects" delay={0.08}>
            <FolderCode size={24} aria-hidden="true" />
            <strong className="profile__stat-value">{String(PROJECTS.length).padStart(2, '0')}</strong>
            <a href="#proyectos">{t.projectsStat} <Icon name="arrowUpRight" size={16} /></a>
          </InteractiveCard>
          <InteractiveCard className="profile-card profile__stat profile__stat--certificates" delay={0.16}>
            <Award size={24} aria-hidden="true" />
            <strong className="profile__stat-value">{String(CERTIFICATES.length).padStart(2, '0')}</strong>
            <a href="#certificados">{t.certificatesStat} <Icon name="arrowUpRight" size={16} /></a>
          </InteractiveCard>

          <InteractiveCard className="profile-card profile__timeline" tilt={1}>
            <h3 className="profile__heading">
              <span className="profile__heading-icon">
                <Icon name="graduation" size={18} />
              </span>
              {t.eduTitle}
            </h3>
            <ol className="timeline">
              {t.timeline.map((item) => (
                <li className="timeline__item" key={item.title}>
                  <span className="timeline__period">{item.period}</span>
                  <h4>{item.title}</h4>
                  <p>{item.text}</p>
                </li>
              ))}
            </ol>
          </InteractiveCard>
        </div>
      </div>
    </section>
  );
};

export default Perfil;
