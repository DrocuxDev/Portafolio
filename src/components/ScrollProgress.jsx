import { useEffect, useRef } from 'react';

/**
 * Barra de progreso de lectura. Se anima con transform (rápido y sin reflow)
 * y queda oculta para lectores de pantalla al ser puramente decorativa.
 */
const ScrollProgress = () => {
  const barRef = useRef(null);

  useEffect(() => {
    const root = document.documentElement;
    let frame = 0;

    const update = () => {
      frame = 0;
      const max = root.scrollHeight - root.clientHeight;
      const progress = max > 0 ? root.scrollTop / max : 0;
      if (barRef.current) barRef.current.style.transform = `scaleX(${progress})`;
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="scroll-progress" aria-hidden="true">
      <span className="scroll-progress__bar" ref={barRef} />
    </div>
  );
};

export default ScrollProgress;
