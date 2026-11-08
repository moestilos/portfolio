import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevealDirective } from '../../shared/reveal.directive';

export interface Project {
  id: string;             // capturas en public/proyectos/<id>.webp (escritorio) y <id>-movil.webp
  name: string;
  kind: string;
  status: 'live' | 'soon' | 'private';
  statusText: string;
  text: string;
  points: string[];
  stack: string[];
  host: string;
  url?: string;
  shots: boolean;         // false: sin capturas públicas, se dibuja una ilustración
}

/**
 * Proyectos destacados, elegidos por Guillermo (2026-11-08). Van fijos en el código: la tabla `projects`
 * de Supabase ya no responde y, si volviera, no debe pisar esta selección.
 */
const PROJECTS: Project[] = [
  {
    id: 'aguilera', name: 'Aguilera Studio', kind: 'Estudio propio · 2026', status: 'live', statusText: 'En producción',
    text: 'Estudio digital para pymes de Sevilla, con el negocio entero montado: web, panel de gestión, zona de cliente y captación automática.',
    points: ['Presupuesto al momento', 'Auditoría web gratis', 'Captación con IA'],
    stack: ['Angular', 'PostgreSQL', 'Claude'],
    host: 'aguilerastudio.dev', url: 'https://aguilerastudio.dev', shots: true,
  },
  {
    id: 'motickly', name: 'Motickly', kind: 'SaaS propio · 2025', status: 'live', statusText: 'En producción',
    text: 'Gestión de gastos con IA para autónomos y pymes: lee tickets y facturas en unos 10 segundos, desde la web o por Telegram.',
    points: ['IA con Gemini', 'Pagos con Stripe', 'Multi-empresa'],
    stack: ['Next.js', 'PostgreSQL', 'Gemini'],
    host: 'motickly.com', url: 'https://motickly.com/', shots: true,
  },
  {
    id: 'dtfalmetro', name: 'DTF al metro', kind: 'Cliente · RM Ingenia · 2026', status: 'soon', statusText: 'En lanzamiento',
    text: 'Tienda de impresión DTF por metros, hecha con Ismael Piña: el cliente sube su diseño, la API calcula el precio y cobra por TPV.',
    points: ['Pago con Redsys', 'Montador de pliegos', 'Panel del taller'],
    stack: ['Astro', 'FastAPI', 'Docker'],
    host: 'dtfalmetro.es', url: 'https://dtfalmetro.es', shots: true,
  },
  {
    id: 'facturas', name: 'Facturas con IA local', kind: 'Cliente · despacho de Sevilla · 2026', status: 'private', statusText: 'Proyecto privado',
    text: 'Las facturas que llegan por correo se leen y se preparan solas con una IA instalada en el propio despacho: los datos no salen de su red.',
    points: ['IA local', 'Detecta duplicados', 'Excel listo para contabilidad'],
    stack: ['Python', 'Ollama', 'n8n'],
    host: 'red interna del cliente', shots: false,
  },
];

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  templateUrl: './projects.component.html',
})
export class ProjectsComponent {
  projects = PROJECTS;
  flow = [
    { t: 'Llega por correo', s: 'Buzón de facturas' },
    { t: 'La lee la IA local', s: 'En su propio equipo' },
    { t: 'Se comprueba', s: 'Expediente y duplicados' },
    { t: 'Lista para contabilidad', s: 'Excel y revisión' },
  ];
}
