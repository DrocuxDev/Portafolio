import { motion, useReducedMotion } from 'framer-motion';
import Icon from '../icons/Icon.jsx';
import { useLanguage } from '../../hooks/useLanguage.js';
import { translations } from '../../i18n/translations.js';
import ProjectCarousel from './ProjectCarousel.jsx';
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

  return (
    <section id="inicio" className="hero">
      <div className="hero__container">
        <motion.div
          className="hero__intro"
          initial={reducedMotion ? false : 'hidden'}
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.07 } },
          }}
        >
          {/* 1. Badge de disponibilidad */}
          <motion.div className="hero__badge" variants={fadeVariants}>
            <span className="status-dot" aria-hidden="true" />
            <span>{t.badge}</span>
          </motion.div>

          {/* 2. Título y Frase de apoyo (1 línea) */}
          <motion.h1 className="hero__title" variants={fadeVariants}>
            {t.headline}
          </motion.h1>

          <motion.p className="hero__subtitle" variants={fadeVariants}>
            {t.subheadline}
          </motion.p>

          {/* 3. Botones principales (sin Descargar CV para evitar desbordes) */}
          <motion.div className="hero__cta-group" variants={fadeVariants}>
            <a className="dx-btn dx-btn--primary" href="#proyectos">
              {t.ctaProjects} <Icon name="arrowDown" size={15} />
            </a>
            <a className="dx-btn dx-btn--ghost" href="#contacto">
              {t.ctaContact}
            </a>
          </motion.div>
        </motion.div>

        {/* 4. Carrusel Inteligente de Proyectos */}
        <motion.div
          className="hero__carousel-area"
          initial={reducedMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <ProjectCarousel />
        </motion.div>
      </div>
    </section>
  );
};

export default Banner;
