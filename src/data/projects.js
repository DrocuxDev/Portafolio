import proyectoTareas from '../assets/proyecto-tareas.svg';

/**
 * Proyectos reales publicados en GitHub. Los archivos descargables del
 * prototipo de electrónica se sirven desde public/proyectos/girasol-dual.
 * Los textos (título, descripción, aporte) viven en i18n/translations.js por id.
 * No hay URL de demostración porque todavía no se ha publicado un despliegue.
 */
export const PROJECTS = [
  {
    id: 'erp',
    repo: 'https://github.com/DrocuxDev/sistema-erp-saas',
    image: '/proyectos/erp-productos.png',
    tech: ['Laravel', 'Blade', 'PHP', 'JavaScript'],
  },
  {
    id: 'tickets',
    repo: 'https://github.com/DrocuxDev/app-sistema-tickets',
    image: '/proyectos/tickets-dashboard.png',
    tech: ['Laravel', 'Bootstrap', 'PHP', 'Blade'],
  },
  {
    id: 'girasol',
    image: '/proyectos/girasol-dual/girasol-dual.png',
    tech: ['Arduino Uno', 'C++', 'EAGLE', 'Tinkercad'],
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
  {
    id: 'apptareas',
    repo: 'https://github.com/josuetareas/AppTareas',
    design: 'https://www.figma.com/make/NYxaM6i9IAu8T1gQlPGHqw/Pantallas-para-app-de-tareas?code-node-id=0-6&fullscreen=1',
    image: proyectoTareas,
    tech: ['Android', 'Java', 'Room', 'XML'],
  },
];
