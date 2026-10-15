import Icon from '../icons/Icon.jsx';
import { useLanguage } from '../../hooks/useLanguage.js';
import { translations } from '../../i18n/translations.js';
import './Perfil.css';

const Perfil = () => {
  const { lang } = useLanguage();
  const t = translations[lang].perfil;

  return (
    <section id="sobre-mi" className="section profile">
      <div className="section-wrap">
        <div className="section-heading" data-reveal>
          <span className="section-kicker">{t.kicker}</span>
          <h2 className="section-title">{t.title}</h2>
          <p className="section-intro">{t.intro}</p>
        </div>

        <div className="profile__grid">
          <article className="profile-card profile__about" data-reveal>
            <p className="profile__lead">{t.p1}</p>
            <p className="profile__text">{t.p2}</p>
            <ul className="profile__keywords">
              {t.keywords.map((keyword) => (
                <li key={keyword}>{keyword}</li>
              ))}
            </ul>
          </article>

          <div className="profile__side">
            <article className="profile-card profile__block" data-reveal data-reveal-delay="90">
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
            </article>

            <article className="profile-card profile__block" data-reveal data-reveal-delay="150">
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
            </article>
          </div>

          <article className="profile-card profile__timeline" data-reveal>
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
          </article>
        </div>
      </div>
    </section>
  );
};

export default Perfil;
