import Icon from '../icons/Icon.jsx';
import InteractiveCard from '../effects/InteractiveCard.jsx';
import AmbientGlow from '../effects/AmbientGlow.jsx';
import { useLanguage } from '../../hooks/useLanguage.js';
import { translations } from '../../i18n/translations.js';
import './Servicios.css';

const Servicios = () => {
  const { lang } = useLanguage();
  const t = translations[lang].servicios;

  return (
    <section id="servicios" className="section services">
      <AmbientGlow />
      <div className="section-wrap">
        <div className="services__head">
          <div className="section-heading" data-reveal>
            <span className="section-kicker">{t.kicker}</span>
            <h2 className="section-title">{t.title}</h2>
            <p className="section-intro">{t.intro}</p>
          </div>
          <a className="dx-btn dx-btn--primary services__cta" href="#contacto" data-reveal>
            {t.cta} <Icon name="arrowRight" size={18} />
          </a>
        </div>

        <div className="services__grid">
          {t.items.map((service, index) => (
            <InteractiveCard
              key={service.title}
              className="service-card"
              delay={index * 0.06}
            >
              <span className="service-card__index" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="service-card__icon">
                <Icon name={service.icon} size={22} />
              </span>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
            </InteractiveCard>
          ))}
        </div>

        <p className="services__note" data-reveal>
          <Icon name="spark" size={16} /> {t.note}
        </p>
      </div>
    </section>
  );
};

export default Servicios;
