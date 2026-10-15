/**
 * Stack tecnológico agrupado. Las claves coinciden con los títulos y notas
 * definidos en i18n/translations.js, así que añadir una tecnología solo
 * requiere agregar su nombre aquí y su nota en las traducciones.
 */
export const STACK_GROUPS = [
  {
    id: 'frontend',
    icon: 'layout',
    accent: 'cyan',
    items: ['React', 'JavaScript', 'HTML5', 'CSS3'],
  },
  {
    id: 'backend',
    icon: 'database',
    accent: 'violet',
    items: ['Laravel', 'PHP', 'Python', 'Java'],
  },
  {
    id: 'tooling',
    icon: 'cpu',
    accent: 'green',
    items: ['Vite', 'Bootstrap', 'Tailwind CSS', 'Git'],
  },
];

/** Tecnologías que se están aprendiendo actualmente (etiqueta honesta). */
export const LEARNING = ['Python', 'Java', 'Tailwind CSS'];
