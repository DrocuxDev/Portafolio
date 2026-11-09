import Icon from '../icons/Icon.jsx';
import AmbientGlow from '../effects/AmbientGlow.jsx';
import { useLanguage } from '../../hooks/useLanguage.js';
import { translations } from '../../i18n/translations.js';
import { CERTIFICATES } from '../../data/certificates.js';
import './Certificados.css';

const Certificados = () => {
  const { lang } = useLanguage();
  const t = translations[lang].skills.certificates;
  const certificateDate = new Intl.DateTimeFormat(lang === 'es' ? 'es-PE' : 'en-US', {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  });

  return (
    <section id="certificados" className="section certificates">
      <AmbientGlow />
      <div className="section-wrap">
        <div className="section-heading" data-reveal>
          <span className="section-kicker">{t.kicker}</span>
          <h2 className="section-title">{t.title}</h2>
          <p className="section-intro">{t.intro}</p>
        </div>

        <div className="certificates__table" data-reveal>
          {CERTIFICATES.map((certificate) => (
            <article className="certificate-row" key={certificate.id}>
              <div className="certificate-row__info">
                <span className="certificate-row__icon" aria-hidden="true">
                  <Icon name="graduation" size={18} />
                </span>
                <div className="certificate-row__main">
                  <h3 className="certificate-row__title">{t.items[certificate.id]}</h3>
                  <p className="certificate-row__issuer">{t.issuer}</p>
                </div>
              </div>

              <div className="certificate-row__meta">
                <time className="certificate-row__date" dateTime={certificate.date}>
                  {certificateDate.format(new Date(`${certificate.date}T00:00:00Z`))}
                </time>
                <div className="certificate-row__actions">
                  <a
                    className="certificate-row__btn"
                    href={certificate.path}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {t.view} <Icon name="arrowUpRight" size={13} />
                  </a>
                  <a
                    className="certificate-row__btn certificate-row__btn--download"
                    href={certificate.path}
                    download
                    aria-label={`${t.download} ${t.items[certificate.id]}`}
                  >
                    <Icon name="download" size={14} />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certificados;
