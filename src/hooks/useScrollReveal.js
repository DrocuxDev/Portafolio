import { useEffect } from 'react';

/**
 * Aparición progresiva de los elementos marcados con [data-reveal].
 * Solo oculta contenido cuando JavaScript y el observador están disponibles,
 * de modo que sin JS todo el contenido permanece visible y accesible.
 * @param {unknown[]} deps Dependencias que fuerzan el re-escaneo (p. ej. el idioma).
 */
export function useScrollReveal(deps = []) {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll('[data-reveal]'));
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!('IntersectionObserver' in window) || reduceMotion) {
      elements.forEach((el) => el.classList.add('is-in'));
      return undefined;
    }

    document.documentElement.classList.add('js');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -6% 0px', threshold: 0.1 },
    );

    elements.forEach((el) => {
      const delay = el.dataset.revealDelay;
      if (delay) el.style.setProperty('--reveal-delay', `${delay}ms`);
      observer.observe(el);
    });

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
