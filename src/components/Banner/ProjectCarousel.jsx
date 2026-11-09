import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import Icon from '../icons/Icon.jsx';
import { useLanguage } from '../../hooks/useLanguage.js';
import { translations } from '../../i18n/translations.js';
import { PROJECTS } from '../../data/projects.js';
import './ProjectCarousel.css';

const AUTOPLAY_INTERVAL = 7000; // 7 segundos

const ProjectCarousel = () => {
  const { lang } = useLanguage();
  const t = translations[lang].hero.carousel;
  const projectItems = translations[lang].proyectos.items;
  const reducedMotion = useReducedMotion();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPlaying, setIsPlaying] = useState(!reducedMotion);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isInViewport, setIsInViewport] = useState(true);

  const containerRef = useRef(null);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const hasDragged = useRef(false);

  const total = PROJECTS.length;

  const goTo = useCallback(
    (nextIdx, newDirection = 1) => {
      setDirection(newDirection);
      setCurrentIndex((nextIdx + total) % total);
    },
    [total]
  );

  const goNext = useCallback(() => {
    goTo(currentIndex + 1, 1);
  }, [currentIndex, goTo]);

  const goPrev = useCallback(() => {
    goTo(currentIndex - 1, -1);
  }, [currentIndex, goTo]);

  // Page Visibility API
  useEffect(() => {
    const handleVisibility = () => {
      setIsVisible(!document.hidden);
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  // IntersectionObserver
  useEffect(() => {
    const node = containerRef.current;
    if (!node || !('IntersectionObserver' in window)) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInViewport(entry.isIntersecting);
      },
      { threshold: 0.25 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Determinar si el autoplay debe estar activo
  const shouldAutoPlay =
    isPlaying &&
    !reducedMotion &&
    !isHovered &&
    !isFocused &&
    isVisible &&
    isInViewport;

  // Ciclo de Autoplay
  useEffect(() => {
    if (!shouldAutoPlay) return undefined;

    const timer = setInterval(() => {
      goNext();
    }, AUTOPLAY_INTERVAL);

    return () => clearInterval(timer);
  }, [shouldAutoPlay, goNext]);

  // Manejo de Teclado
  const handleKeyDown = (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      goPrev();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      goNext();
    }
  };

  // Clic en proyecto -> Scroll suave y actualizar hash
  const handleProjectClick = (projectId, event) => {
    // Si fue un arrastre de mouse/touch, evitar navegar
    if (hasDragged.current) {
      event.preventDefault();
      return;
    }

    const targetHash = `#proyecto-${projectId}`;
    if (window.location.hash !== targetHash) {
      window.history.pushState(null, '', targetHash);
    }
    const targetEl = document.getElementById(`proyecto-${projectId}`);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Disparar evento hashchange manual para navegadores
      window.dispatchEvent(new HashChangeEvent('hashchange'));
    }
  };

  // Variantes de animación
  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
      scale: 0.94,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring', stiffness: 260, damping: 28 },
        opacity: { duration: 0.4 },
        scale: { duration: 0.4 },
      },
    },
    exit: (dir) => ({
      x: dir > 0 ? -80 : 80,
      opacity: 0,
      scale: 0.94,
      transition: {
        x: { type: 'spring', stiffness: 260, damping: 28 },
        opacity: { duration: 0.3 },
      },
    }),
  };

  const currentProject = PROJECTS[currentIndex];
  const currentCopy = projectItems[currentProject.id] || {};
  const prevProject = PROJECTS[(currentIndex - 1 + total) % total];
  const nextProject = PROJECTS[(currentIndex + 1) % total];

  return (
    <div
      ref={containerRef}
      className="carousel-widget"
      role="region"
      aria-roledescription="carousel"
      aria-label={t.regionLabel}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocusCapture={() => setIsFocused(true)}
      onBlurCapture={() => setIsFocused(false)}
    >
      <div className="carousel-stage">
        {/* Peek Tarjeta Previa */}
        <button
          type="button"
          className="carousel-peek carousel-peek--prev"
          onClick={goPrev}
          aria-label={t.prev}
          tabIndex={-1}
        >
          <img
            src={prevProject.image}
            alt=""
            loading="lazy"
            decoding="async"
            width="320"
            height="180"
          />
        </button>

        {/* Tarjeta Activa */}
        <div
          className="carousel-card-wrap"
          aria-live={shouldAutoPlay ? 'off' : 'polite'}
        >
          <AnimatePresence mode="wait" initial={false} custom={direction}>
            <motion.div
              key={currentProject.id}
              custom={direction}
              variants={reducedMotion ? undefined : slideVariants}
              initial={reducedMotion ? false : 'enter'}
              animate="center"
              exit={reducedMotion ? { opacity: 0 } : 'exit'}
              className="carousel-card"
              role="group"
              aria-roledescription="slide"
              aria-label={`${currentIndex + 1} ${t.slideLabel} ${total}`}
              drag={reducedMotion ? false : 'x'}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.15}
              onPointerDown={(e) => {
                dragStartPos.current = { x: e.clientX, y: e.clientY };
                hasDragged.current = false;
              }}
              onPointerMove={(e) => {
                const dx = Math.abs(e.clientX - dragStartPos.current.x);
                const dy = Math.abs(e.clientY - dragStartPos.current.y);
                if (dx > 8 || dy > 8) {
                  hasDragged.current = true;
                }
              }}
              onDragEnd={(_, info) => {
                if (info.offset.x < -45) {
                  goNext();
                } else if (info.offset.x > 45) {
                  goPrev();
                }
              }}
            >
              <div
                className="carousel-card__clickarea"
                onClick={(e) => handleProjectClick(currentProject.id, e)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleProjectClick(currentProject.id, e);
                  }
                }}
              >
                <div className="carousel-card__media">
                  <img
                    src={currentProject.image}
                    alt={currentCopy.imageAlt || currentCopy.titulo}
                    loading={currentIndex === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                    width="440"
                    height="200"
                  />
                  <span className="carousel-card__badge">
                    {currentCopy.category || (lang === 'en' ? 'Project' : 'Proyecto')}
                  </span>
                </div>

                <div className="carousel-card__body">
                  <div className="carousel-card__header">
                    <h3 className="carousel-card__title">
                      {currentCopy.titulo}
                    </h3>
                    <span className="carousel-card__action-hint">
                      {t.viewProject} <Icon name="arrowRight" size={13} />
                    </span>
                  </div>

                  <p className="carousel-card__desc">
                    {currentCopy.shortDesc || currentCopy.problem}
                  </p>

                  <div className="carousel-card__tags">
                    {currentProject.tech.slice(0, 4).map((tag) => (
                      <span key={tag} className="chip">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Peek Tarjeta Siguiente */}
        <button
          type="button"
          className="carousel-peek carousel-peek--next"
          onClick={goNext}
          aria-label={t.next}
          tabIndex={-1}
        >
          <img
            src={nextProject.image}
            alt=""
            loading="lazy"
            decoding="async"
            width="320"
            height="180"
          />
        </button>
      </div>

      {/* Barra de Progreso Fina Bajo la Tarjeta Activa */}
      <div className="carousel-progress" aria-hidden="true">
        <div
          key={`${currentIndex}-${shouldAutoPlay}`}
          className={`carousel-progress__bar${shouldAutoPlay ? ' is-animating' : ''}`}
          style={{ '--progress-duration': `${AUTOPLAY_INTERVAL}ms` }}
        />
      </div>

      {/* Controles de Navegación, Dots y Botón Play/Pausa */}
      <div className="carousel-controls">
        <button
          type="button"
          className="carousel-btn carousel-btn--nav"
          onClick={goPrev}
          aria-label={t.prev}
        >
          <ChevronLeft size={16} aria-hidden="true" />
        </button>

        <div className="carousel-dots" role="tablist" aria-label={t.regionLabel}>
          {PROJECTS.map((project, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={project.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`${t.viewProject}: ${projectItems[project.id]?.titulo || project.id}`}
                className={`carousel-dot${isActive ? ' is-active' : ''}`}
                onClick={() => goTo(idx, idx > currentIndex ? 1 : -1)}
              />
            );
          })}
        </div>

        <button
          type="button"
          className="carousel-btn carousel-btn--nav"
          onClick={goNext}
          aria-label={t.next}
        >
          <ChevronRight size={16} aria-hidden="true" />
        </button>

        {!reducedMotion && (
          <button
            type="button"
            className="carousel-btn carousel-btn--pause"
            onClick={() => setIsPlaying((prev) => !prev)}
            aria-label={isPlaying ? t.pause : t.play}
            aria-pressed={!isPlaying}
          >
            {isPlaying ? (
              <Pause size={14} aria-hidden="true" />
            ) : (
              <Play size={14} aria-hidden="true" />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default ProjectCarousel;
