import { useEffect, useState } from 'react';

/**
 * Devuelve el id de la sección visible actualmente para resaltar la navegación.
 * @param {string[]} ids Identificadores de sección en orden documental.
 */
export function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0] ?? '');
  const key = ids.join('|');

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el) => el instanceof HTMLElement);

    if (!sections.length || !('IntersectionObserver' in window)) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: '-40% 0px -52% 0px', threshold: [0, 0.2, 0.5, 1] },
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return active;
}
