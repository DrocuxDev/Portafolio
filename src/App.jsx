import Navbar from './components/Navbar/Navbar.jsx';
import ScrollProgress from './components/ScrollProgress.jsx';
import Icon from './components/icons/Icon.jsx';
import Banner from './components/Banner/Banner.jsx';
import Perfil from './components/Perfil/Perfil.jsx';
import Habilidades from './components/Habilidades/Habilidades.jsx';
import Proyectos from './components/Proyectos/Proyectos.jsx';
import Servicios from './components/Servicios/Servicios.jsx';
import Contacto from './components/Contacto/Contacto.jsx';
import { LanguageProvider } from './context/LanguageProvider.jsx';
import { useLanguage } from './hooks/useLanguage.js';
import { useCvAvailable } from './hooks/useCvAvailable.js';
import { translations } from './i18n/translations.js';
import { PROFILE, NAV_SECTIONS } from './data/portfolio.js';
import { useScrollReveal } from './hooks/useScrollReveal.js';
import './App.css';

function Footer() {
  const { lang } = useLanguage();
  const t = translations[lang].footer;
  const nav = translations[lang].nav;
  const cvAvailable = useCvAvailable();

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <p className="site-footer__brand-name">
            {PROFILE.brand}
            <span className="logo-dot">.</span>
          </p>
          <p>{t.tagline}</p>
          <p>
            <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
          </p>
        </div>

        <div className="site-footer__col">
          <h3>{t.navTitle}</h3>
          <ul>
            {NAV_SECTIONS.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`}>{nav[section.label]}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="site-footer__col">
          <h3>{t.socialTitle}</h3>
          <ul>
            <li>
              <a href={PROFILE.github} target="_blank" rel="noreferrer">
                <Icon name="github" size={16} /> {PROFILE.githubLabel}
              </a>
            </li>
            <li>
              <a href={PROFILE.linkedin} target="_blank" rel="noreferrer">
                <Icon name="linkedin" size={16} /> LinkedIn
              </a>
            </li>
            {cvAvailable && (
              <li>
                <a href={PROFILE.cvPath} download>
                  <Icon name="download" size={16} /> {t.cv}
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="site-footer__bottom">
        <p>
          © {new Date().getFullYear()} {PROFILE.brand} · {t.rights} {t.built}
        </p>
        <a className="back-to-top" href="#inicio">
          {t.top} <Icon name="arrowUp" size={16} />
        </a>
      </div>
    </footer>
  );
}

function Portfolio() {
  const { lang } = useLanguage();
  const a11y = translations[lang].a11y;
  useScrollReveal([lang]);

  return (
    <>
      <a className="skip-link" href="#contenido">
        {a11y.skip}
      </a>
      <ScrollProgress />
      <Navbar />
      <main id="contenido" tabIndex={-1}>
        <Banner />
        <Perfil />
        <Habilidades />
        <Proyectos />
        <Servicios />
        <Contacto />
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <LanguageProvider>
      <Portfolio />
    </LanguageProvider>
  );
}

export default App;
