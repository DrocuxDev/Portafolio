import { useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Icon from '../icons/Icon.jsx';
import { useLanguage } from '../../hooks/useLanguage.js';
import { useCvAvailable } from '../../hooks/useCvAvailable.js';
import { translations } from '../../i18n/translations.js';
import { PROFILE } from '../../data/portfolio.js';
import './Banner.css';

const HERO_SCENES = ['/hero-neon.png', '/hero-neon-2.png', '/hero-neon-3.png'];
const sceneVariants = {
  enter: (direction) => ({ x: direction * 100, opacity: 0, scale: 1.04 }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (direction) => ({ x: direction * -100, opacity: 0 }),
};
const copyVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};
const wordVariants = {
  hidden: { y: '110%' },
  visible: { y: 0, transition: { type: 'spring', stiffness: 180, damping: 24 } },
};

function TitleWords({ text }) {
  return text.split(' ').map((word, index) => (
    <span key={`${word}-${index}`} className="hero-title__clip">
      <motion.span variants={wordVariants}>{word}</motion.span>
      {index < text.split(' ').length - 1 ? '\u00a0' : ''}
    </span>
  ));
}

const Banner = () => {
  const { lang } = useLanguage();
  const t = translations[lang].hero;
  const cvAvailable = useCvAvailable();
  const reducedMotion = useReducedMotion();
  const touchStart = useRef(null);
  const [[activeScene, direction], setScene] = useState([0, 1]);
  const changeScene = (step) => {
    setScene(([current]) => [(current + step + HERO_SCENES.length) % HERO_SCENES.length, Math.sign(step)]);
  };
  const handleKeyDown = (event) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    changeScene(event.key === 'ArrowRight' ? 1 : -1);
  };
  const startSwipe = (event) => {
    touchStart.current = event.target.closest('a, button')
      ? null
      : { x: event.touches[0].clientX, y: event.touches[0].clientY };
  };
  const endSwipe = (event) => {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start) return;
    const dx = event.changedTouches[0].clientX - start.x;
    const dy = event.changedTouches[0].clientY - start.y;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.5) changeScene(dx < 0 ? 1 : -1);
  };

  return (
    <section
      id="inicio"
      className="hero"
      aria-label={t.scenes}
      aria-roledescription={t.carousel}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div className="hero__visual">
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          <motion.div
            key={activeScene}
            className="hero__scene"
            style={{ '--scene-image': `url('${HERO_SCENES[activeScene]}')` }}
            custom={direction}
            variants={reducedMotion ? undefined : sceneVariants}
            initial={reducedMotion ? false : 'enter'}
            animate={reducedMotion ? { opacity: 1 } : 'center'}
            exit={reducedMotion ? { opacity: 0 } : 'exit'}
            transition={reducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 300, damping: 30 }}
            drag={reducedMotion ? false : 'x'}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.06}
            onDragEnd={(_, info) => {
              if (Math.abs(info.offset.x) > 45) changeScene(info.offset.x < 0 ? 1 : -1);
            }}
            aria-hidden="true"
          />
        </AnimatePresence>
      </div>

      <div className="hero__inner">
        <motion.div
          className="hero__copy"
          onTouchStart={startSwipe}
          onTouchEnd={endSwipe}
          onTouchCancel={() => { touchStart.current = null; }}
          initial={reducedMotion ? false : 'hidden'}
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
        >
          <motion.p className="hero__badge" variants={copyVariants}>
            <span className="status-dot" aria-hidden="true" /> {t.badge}
          </motion.p>

          <motion.p className="hero__eyebrow" variants={copyVariants}>{t.eyebrow}</motion.p>
          <motion.h1
            className="hero-title"
            aria-label={`${PROFILE.firstName} ${PROFILE.lastName}`}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          >
            <span className="hero-title__first" aria-hidden="true"><TitleWords text={PROFILE.firstName} /></span>
            <span className="accent" aria-hidden="true">
              <TitleWords text={PROFILE.lastName} />
            </span>
          </motion.h1>
          <motion.p className="hero__role" variants={copyVariants}>{t.role}</motion.p>
          <motion.p className="hero__desc" variants={copyVariants}>{t.desc}</motion.p>

          <motion.div className="hero__actions" variants={copyVariants}>
            <a className="dx-btn dx-btn--primary" href="#proyectos">
              {t.ctaProjects} <Icon name="arrowRight" size={18} />
            </a>
            <a className="dx-btn dx-btn--ghost" href="#contacto">
              {t.ctaContact}
            </a>
            {cvAvailable && (
              <a className="dx-btn dx-btn--ghost" href={PROFILE.cvPath} download>
                {t.ctaCv} <Icon name="download" size={17} />
              </a>
            )}
          </motion.div>

          <motion.ul className="hero__socials" aria-label={t.socials} variants={copyVariants}>
            <li>
              <a href={PROFILE.github} target="_blank" rel="noreferrer">
                <Icon name="github" size={17} /> GitHub
              </a>
            </li>
            <li>
              <a href={PROFILE.linkedin} target="_blank" rel="noreferrer">
                <Icon name="linkedin" size={17} /> LinkedIn
              </a>
            </li>
            <li>
              <a href={`mailto:${PROFILE.email}`}>
                <Icon name="mail" size={17} /> {PROFILE.email}
              </a>
            </li>
          </motion.ul>
        </motion.div>
      </div>
      <button className="hero__arrow hero__arrow--prev" type="button" onClick={() => changeScene(-1)} aria-label={t.previousScene}>
        <ChevronLeft size={20} aria-hidden="true" />
      </button>
      <button className="hero__arrow hero__arrow--next" type="button" onClick={() => changeScene(1)} aria-label={t.nextScene}>
        <ChevronRight size={20} aria-hidden="true" />
      </button>
      <div className="hero__dots" role="group" aria-label={t.scenes}>
        <span className="hero__scene-count" aria-live="polite" aria-atomic="true">
          <span className="sr-only">{t.scene} </span>0{activeScene + 1} <span aria-hidden="true">/</span> 03
        </span>
        {HERO_SCENES.map((scene, index) => (
          <button
            key={scene}
            type="button"
            className={`hero__dot${index === activeScene ? ' is-active' : ''}`}
            aria-label={`${t.scene} ${index + 1}`}
            aria-pressed={index === activeScene}
            onClick={() => {
              if (index !== activeScene) setScene([index, index > activeScene ? 1 : -1]);
            }}
          >
            <span className="hero__dot-track">
              {index === activeScene && (
                <motion.span
                  className="hero__dot-fill"
                  layoutId="hero-scene-indicator"
                  transition={reducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default Banner;
