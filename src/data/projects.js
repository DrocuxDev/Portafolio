import proyectoTareas from '../assets/proyecto-tareas.svg';

/**
 * Proyectos y casos de estudio reales.
 * Los textos estructurados viven en i18n/translations.js por id.
 */
export const PROJECTS = [
  {
    id: 'erp',
    repo: 'https://github.com/DrocuxDev/sistema-erp-saas',
    image: '/proyectos/erp-productos.png',
    tech: ['Laravel', 'Blade', 'PHP', 'MySQL', 'JavaScript'],
  },
  {
    id: 'tickets',
    repo: 'https://github.com/DrocuxDev/app-sistema-tickets',
    image: '/proyectos/tickets-dashboard.png',
    tech: ['Laravel', 'PHP', 'MySQL', 'Blade', 'Responsive CSS'],
  },
  {
    id: 'apptareas',
    repo: 'https://github.com/josuetareas/AppTareas',
    design: 'https://www.figma.com/make/NYxaM6i9IAu8T1gQlPGHqw/Pantallas-para-app-de-tareas?code-node-id=0-6&fullscreen=1',
    image: proyectoTareas,
    tech: ['Android', 'Java', 'Room SQLite', 'XML', 'Figma'],
  },
  {
    id: 'girasol',
    image: '/proyectos/girasol-dual/girasol-dual.png',
    tech: ['Arduino Uno', 'C++', 'EAGLE', 'IoT'],
    files: [
      {
        href: '/proyectos/girasol-dual/girasol-dual.ino',
        name: 'girasol-dual.ino',
        label: 'downloadCode',
      },
      {
        href: '/proyectos/girasol-dual/girasol-dual-senati.brd',
        name: 'girasol-dual-senati.brd',
        label: 'downloadBoard',
      },
    ],
  },
];
