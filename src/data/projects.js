import proyectoErp from '../assets/proyecto-web.svg';
import proyectoTickets from '../assets/proyecto-datos.svg';

/**
 * Proyectos reales publicados en GitHub.
 * Los textos (título, descripción, aporte) viven en i18n/translations.js por id.
 * No hay URL de demostración porque todavía no se ha publicado un despliegue.
 */
export const PROJECTS = [
  {
    id: 'erp',
    repo: 'https://github.com/DrocuxDev/sistema-erp-saas',
    image: proyectoErp,
    featured: true,
    tech: ['Laravel', 'Blade', 'PHP', 'JavaScript'],
  },
  {
    id: 'tickets',
    repo: 'https://github.com/DrocuxDev/app-sistema-tickets',
    image: proyectoTickets,
    featured: false,
    tech: ['Laravel', 'Bootstrap', 'PHP', 'Blade'],
  },
];
