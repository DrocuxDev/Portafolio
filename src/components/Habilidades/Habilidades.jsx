import Icon from '../icons/Icon.jsx';
import InteractiveCard from '../effects/InteractiveCard.jsx';
import AmbientGlow from '../effects/AmbientGlow.jsx';
import { useLanguage } from '../../hooks/useLanguage.js';
import { translations } from '../../i18n/translations.js';
import { STACK_GROUPS, LEARNING } from '../../data/stack.js';
import { CERTIFICATES } from '../../data/certificates.js';
import './Habilidades.css';

const Habilidades = () => {
  const { lang } = useLanguage();
  const t = translations[lang].skills;
  const certificateDate = new Intl.DateTimeFormat(lang === 'es' ? 'es-PE' : 'en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  });

  return (
    <section id="tech-stack" className="section skills">
      <AmbientGlow />
      <div className="section-wrap">
        <div className="section-heading" data-reveal>
          <span className="section-kicker">{t.kicker}</span>
          <h2 className="section-title">
            {t.title.split(' ').slice(0, -1).join(' ')}{' '}
            <span className="accent">{t.title.split(' ').slice(-1)}</span>
          </h2>
          <p className="section-intro">{t.intro}</p>
        </div>

        <div className="skills__grid">
          {STACK_GROUPS.map((group, index) => (
            <InteractiveCard
              key={group.id}
              className={`skill-card skills__group skills__group--${group.accent}`}
              delay={index * 0.08}
            >
              <header className="skills__group-head">
                <span className="skills__group-icon">
                  <Icon name={group.icon} size={20} />
                </span>
                <div>
                  <h3>{t.groups[group.id].title}</h3>
                  <p>{t.groups[group.id].desc}</p>
                </div>
              </header>

              <ul className="skills__list">
                {group.items.map((item) => (
                  <li className="skills__item" key={item}>
                    <span className="skills__item-name">{item}</span>
                    <span className="skills__item-note">{t.tech[item]}</span>
                    {LEARNING.includes(item) && (
                      <span className="skills__item-tag">{t.learning}</span>
                    )}
                  </li>
                ))}
              </ul>
            </InteractiveCard>
          ))}
        </div>

        <p className="skills__note" data-reveal>
          <Icon name="shield" size={16} /> {t.note}
        </p>

        <div id="certificados" className="skills__certificates" data-reveal>
          <div className="skills__certificates-heading">
            <span className="section-kicker">{t.certificates.kicker}</span>
            <h3>{t.certificates.title}</h3>
            <p>{t.certificates.intro}</p>
          </div>
          <div className="skills__certificates-grid">
            {CERTIFICATES.map((certificate) => (
              <article className="skills__certificate" key={certificate.id}>
                <span className="skills__certificate-icon" aria-hidden="true">
                  <Icon name="graduation" size={21} />
                </span>
                <div className="skills__certificate-body">
                  <h4>{t.certificates.items[certificate.id]}</h4>
                  <p>{t.certificates.issuer}</p>
                  <time dateTime={certificate.date}>
                    {certificateDate.format(new Date(`${certificate.date}T00:00:00Z`))}
                  </time>
                </div>
                <div className="skills__certificate-actions">
                  <a href={certificate.path} target="_blank" rel="noreferrer">
                    {t.certificates.view} <Icon name="arrowUpRight" size={15} />
                  </a>
                  <a href={certificate.path} download>
                    {t.certificates.download} <Icon name="download" size={15} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Habilidades;
