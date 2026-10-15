import { useEffect, useState } from 'react';
import { PROFILE } from '../data/portfolio.js';

/**
 * Comprueba en tiempo de ejecución si el CV existe (/cv.pdf).
 * Si el archivo no está publicado, los botones de descarga se ocultan
 * para no ofrecer un enlace roto. Cuando se añada public/cv.pdf,
 * los botones reaparecen solos sin más cambios.
 */
export function useCvAvailable() {
  const [available, setAvailable] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const check = async () => {
      try {
        const response = await fetch(PROFILE.cvPath, { method: 'HEAD' });
        if (!cancelled) setAvailable(response.ok);
      } catch {
        if (!cancelled) setAvailable(false);
      }
    };

    check();
    return () => {
      cancelled = true;
    };
  }, []);

  return available;
}
