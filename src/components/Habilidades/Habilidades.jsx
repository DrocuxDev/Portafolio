import Icon from '../icons/Icon.jsx';
import { useLanguage } from '../../hooks/useLanguage.js';
import { translations } from '../../i18n/translations.js';
import { STACK_GROUPS, LEARNING } from '../../data/stack.js';
import './Habilidades.css';

const Habilidades = () => {
  const { lang } = useLanguage();
  const t = translations[lang].skills;

  return (
    <section id="tech-stack" className="section skills">
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
            <article
              key={group.id}
              className={`skill-card skills__group skills__group--${group.accent}`}
              data-reveal
              data-reveal-delay={index * 90}
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
            </article>
          ))}
        </div>

        <p className="skills__note" data-reveal>
          <Icon name="shield" size={16} /> {t.note}
        </p>
      </div>
    </section>
  );
};

export default Habilidades;
