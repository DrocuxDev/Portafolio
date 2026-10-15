/**
 * Datos reales del perfil de DrocuxDev.
 * Todo lo que se muestra en el sitio proviene de este archivo o de i18n/translations.js.
 */
export const PROFILE = {
  brand: 'DrocuxDev',
  firstName: 'Alejandro Alfredo',
  lastName: 'Cruz Llocya',
  role: 'Desarrollador Full Stack | Web & Software',
  level: 'En formación / Junior',
  email: 'acruzlloc@gmail.com',
  location: 'Lima, Perú',
  github: 'https://github.com/DrocuxDev',
  githubLabel: 'github.com/DrocuxDev',
  linkedin: 'https://pe.linkedin.com/in/cruz-llocya-alejandro-alfredo-70997b3b2',
  cvPath: '/cv.pdf',
  /** Portada de marca servida desde public/ (no se versiona dentro de src). */
  coverPath: '/portada-dev.png',
};

/** Secciones del sitio, en orden documental, para la navegación por anclas. */
export const NAV_SECTIONS = [
  { id: 'inicio', label: 'inicio' },
  { id: 'sobre-mi', label: 'perfil' },
  { id: 'tech-stack', label: 'habilidades' },
  { id: 'proyectos', label: 'proyectos' },
  { id: 'servicios', label: 'servicios' },
  { id: 'contacto', label: 'contacto' },
];
