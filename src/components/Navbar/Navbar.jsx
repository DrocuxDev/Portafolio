import { useEffect, useRef, useState } from 'react';
import Icon from '../icons/Icon.jsx';
import { useLanguage } from '../../hooks/useLanguage.js';
import { translations } from '../../i18n/translations.js';
import { PROFILE, NAV_SECTIONS } from '../../data/portfolio.js';
import { useActiveSection } from '../../hooks/useActiveSection.js';
import './Navbar.css';

const SECTION_IDS = NAV_SECTIONS.map((section) => section.id);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { lang, toggle } = useLanguage();
  const t = translations[lang].nav;
  const a11y = translations[lang].a11y;
  const activeSection = useActiveSection(SECTION_IDS);
  const panelRef = useRef(null);
  const toggleRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!isOpen) return undefined;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onPointerDown = (event) => {
      const insidePanel = panelRef.current?.contains(event.target);
      const insideToggle = toggleRef.current?.contains(event.target);
      if (!insidePanel && !insideToggle) setIsOpen(false);
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    document.body.classList.add('nav-open');

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
      document.body.classList.remove('nav-open');
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className={`navbar-portfolio${isScrolled ? ' is-scrolled' : ''}`}>
      <div className="navbar-portfolio__inner">
        <a className="navbar-logo" href="#inicio" onClick={closeMenu}>
          <span className="text-cyan">{PROFILE.brand.slice(0, 6)}</span>
          {PROFILE.brand.slice(6)}
          <span className="logo-dot">.</span>
        </a>

        <nav
          id="primary-navigation"
          className={`navbar-links${isOpen ? ' is-open' : ''}`}
          aria-label={t.menu}
          ref={panelRef}
        >
          {NAV_SECTIONS.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              aria-current={activeSection === section.id ? 'true' : undefined}
              onClick={closeMenu}
            >
              {t[section.label]}
            </a>
          ))}

          <button
            className="lang-toggle"
            type="button"
            onClick={toggle}
            aria-label={a11y.langSwitch}
          >
            <Icon name="globe" size={15} />
            <span className={lang === 'es' ? 'is-active' : ''}>ES</span>
            <span aria-hidden="true">/</span>
            <span className={lang === 'en' ? 'is-active' : ''}>EN</span>
          </button>
        </nav>

        <button
          className="navbar-toggle"
          type="button"
          ref={toggleRef}
          aria-label={isOpen ? t.close : t.open}
          aria-expanded={isOpen}
          aria-controls="primary-navigation"
          onClick={() => setIsOpen((value) => !value)}
        >
          <Icon name={isOpen ? 'close' : 'menu'} size={24} />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
