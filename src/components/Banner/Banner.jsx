import { motion, useReducedMotion } from 'framer-motion';
import Icon from '../icons/Icon.jsx';
import { useLanguage } from '../../hooks/useLanguage.js';
import { translations } from '../../i18n/translations.js';
import { PROFILE } from '../../data/portfolio.js';
import heroPhoto from '../../assets/alejandro-hero.png';
import './Banner.css';

const fadeVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

const Banner = () => {
  const { lang } = useLanguage();
  const t = translations[lang].hero;
  const reducedMotion = useReducedMotion();

  const socials = [
    { name: 'mail', href: `mailto:${PROFILE.email}`, label: t.emailLabel },
    { name: 'github', href: PROFILE.github, label: 'GitHub', external: true },
    { name: 'linkedin', href: PROFILE.linkedin, label: 'LinkedIn', external: true },
  ];

  return (
    <section id="inicio" className="hero">
      <div className="hero__container">
        <motion.div
          className="hero__intro"
          initial={reducedMotion ? false : 'hidden'}
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
        >
          <motion.p className="hero__greeting" variants={fadeVariants}>
            {t.greeting}
          </motion.p>

          <motion.h1 className="hero__name" variants={fadeVariants}>
            {PROFILE.displayName}
            <span className="logo-dot">.</span>
          </motion.h1>

          <motion.p className="hero__role" variants={fadeVariants}>
            {t.role}
          </motion.p>

          <motion.p className="hero__subtitle" variants={fadeVariants}>
            {t.subheadline}
          </motion.p>

          <motion.div className="hero__actions" variants={fadeVariants}>
            <ul className="hero__socials" aria-label={t.socials}>
              {socials.map((social) => (
                <li key={social.name}>
                  <a
                    className="hero__social"
                    href={social.href}
                    aria-label={social.label}
                    title={social.label}
                    {...(social.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                  >
                    <Icon name={social.name} size={20} />
                  </a>
                </li>
              ))}
            </ul>
            <a className="dx-btn dx-btn--ghost hero__cta" href="#proyectos">
              {t.ctaProjects} <Icon name="arrowDown" size={15} />
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero__visual"
          initial={reducedMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            className="hero__photo"
            src={heroPhoto}
            alt={t.photoAlt}
            width="767"
            height="1024"
            fetchPriority="high"
            decoding="async"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Banner;
