import { useState } from 'react';
import Icon from '../icons/Icon.jsx';
import { useLanguage } from '../../hooks/useLanguage.js';
import { useCvAvailable } from '../../hooks/useCvAvailable.js';
import { translations } from '../../i18n/translations.js';
import { PROFILE } from '../../data/portfolio.js';
import './Contacto.css';

const EMPTY_FORM = { nombre: '', email: '', asunto: '', mensaje: '' };

const Contacto = () => {
  const { lang } = useLanguage();
  const t = translations[lang].contacto;
  const cvAvailable = useCvAvailable();
  const [form, setForm] = useState(EMPTY_FORM);
  const [mailOpened, setMailOpened] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  };

  /**
   * Sin backend: se prepara un enlace mailto: con asunto y cuerpo codificados.
   * El navegador abre el cliente de correo del visitante; no se envía nada solo.
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    const subject = form.asunto.trim() || `${PROFILE.brand} · ${form.nombre.trim()}`;
    const body = [
      form.mensaje.trim(),
      '',
      '—',
      form.nombre.trim(),
      form.email.trim(),
    ]
      .filter(Boolean)
      .join('\n');

    const mailto = `mailto:${PROFILE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    setMailOpened(true);
  };

  return (
    <section id="contacto" className="section contact">
      <div className="section-wrap">
        <div className="section-heading" data-reveal>
          <span className="section-kicker">{t.kicker}</span>
          <h2 className="section-title">{t.title}</h2>
          <p className="section-intro">{t.intro}</p>
        </div>

        <div className="contact__grid">
          <div className="contact__info" data-reveal>
            <h3 className="contact__info-title">{t.infoTitle}</h3>
            <p className="contact__info-desc">{t.infoDesc}</p>

            <ul className="contact__items">
              <li>
                <span className="contact__icon">
                  <Icon name="mail" size={19} />
                </span>
                <div>
                  <span className="contact__label">{t.emailLabel}</span>
                  <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
                </div>
              </li>
              <li>
                <span className="contact__icon">
                  <Icon name="mapPin" size={19} />
                </span>
                <div>
                  <span className="contact__label">{t.locationLabel}</span>
                  <p>{PROFILE.location}</p>
                </div>
              </li>
              <li>
                <span className="contact__icon">
                  <Icon name="github" size={19} />
                </span>
                <div>
                  <span className="contact__label">{t.githubLabel}</span>
                  <a href={PROFILE.github} target="_blank" rel="noreferrer">
                    {PROFILE.githubLabel}
                  </a>
                </div>
              </li>
              <li>
                <span className="contact__icon">
                  <Icon name="linkedin" size={19} />
                </span>
                <div>
                  <span className="contact__label">{t.linkedinLabel}</span>
                  <a href={PROFILE.linkedin} target="_blank" rel="noreferrer">
                    cruz-llocya-alejandro-alfredo
                  </a>
                </div>
              </li>
            </ul>

            {cvAvailable && (
              <a className="dx-btn dx-btn--violet contact__cv" href={PROFILE.cvPath} download>
                <Icon name="download" size={17} /> {translations[lang].footer.cv}
              </a>
            )}
          </div>

          <div className="contact-panel" data-reveal data-reveal-delay="120">
            <h3 className="contact__form-title">{t.formTitle}</h3>

            <form className="contact__form" onSubmit={handleSubmit}>
              <div className="contact__field">
                <label htmlFor="contact-name">{t.name}</label>
                <input
                  id="contact-name"
                  name="nombre"
                  type="text"
                  value={form.nombre}
                  onChange={handleChange}
                  placeholder={t.namePh}
                  autoComplete="name"
                  required
                />
              </div>

              <div className="contact__field">
                <label htmlFor="contact-email">{t.emailField}</label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder={t.emailPh}
                  autoComplete="email"
                  required
                />
              </div>

              <div className="contact__field">
                <label htmlFor="contact-subject">{t.subjectField}</label>
                <input
                  id="contact-subject"
                  name="asunto"
                  type="text"
                  value={form.asunto}
                  onChange={handleChange}
                  placeholder={t.subjectPh}
                />
              </div>

              <div className="contact__field">
                <label htmlFor="contact-message">{t.message}</label>
                <textarea
                  id="contact-message"
                  name="mensaje"
                  rows="5"
                  value={form.mensaje}
                  onChange={handleChange}
                  placeholder={t.messagePh}
                  aria-describedby="contact-mailto-note"
                  required
                />
              </div>

              <button type="submit" className="dx-btn dx-btn--primary contact__submit">
                {t.submit} <Icon name="send" size={17} />
              </button>
            </form>

            <p className="contact__note" id="contact-mailto-note">
              <Icon name="shield" size={15} /> {t.mailtoNote}
            </p>

            <p className="contact__status" role="status" aria-live="polite">
              {mailOpened && (
                <>
                  {t.openedNote}{' '}
                  <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contacto;
