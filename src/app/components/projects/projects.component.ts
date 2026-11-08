import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevealDirective } from '../../shared/reveal.directive';

export interface Project {
  name: string;
  kind: string;
  year: string;
  status: 'live' | 'soon' | 'private';
  statusText: string;
  lead: string;
  points: string[];
  stack: string[];
  image?: string;
  visual?: 'dtf' | 'facturas';
  url?: string;
  urlText?: string;
}

/**
 * Proyectos destacados, elegidos por Guillermo (2026-11-08). Van fijos en el código: la tabla `projects`
 * de Supabase ya no responde y, si volviera, no debe pisar esta selección.
 */
const PROJECTS: Project[] = [
  {
    name: 'Aguilera Studio',
    kind: 'Estudio propio',
    year: '2026',
    status: 'live',
    statusText: 'En producción',
    lead: 'Mi estudio digital en Sevilla: webs, apps y automatizaciones para pymes y autónomos, con el negocio entero montado y funcionando solo.',
    points: [
      'Web con presupuesto al momento, demos por sector y auditoría web gratuita',
      'Panel de gestión y zona de cliente: solicitudes, envíos, colaboradores y publicaciones',
      'Captación automática: correos y WhatsApp diarios y respuestas sencillas con IA',
    ],
    stack: ['Angular', 'TypeScript', 'PostgreSQL', 'Vercel', 'Claude'],
    image: 'images/aguilera-studio.webp',
    url: 'https://aguilerastudio.dev',
    urlText: 'aguilerastudio.dev',
  },
  {
    name: 'Motickly',
    kind: 'SaaS',
    year: '2025',
    status: 'live',
    statusText: 'En producción',
    lead: 'Gestión de gastos con IA para autónomos y pymes: la IA lee tickets y facturas en unos 10 segundos, desde la web o desde Telegram.',
    points: [
      'Multi-empresa con roles y registro de auditoría',
      'Planes de pago con Stripe controlados en el servidor',
      'Seguridad seria: CSP estricta, límites de peticiones y bloqueo por fuerza bruta',
    ],
    stack: ['Next.js', 'TypeScript', 'Gemini', 'PostgreSQL', 'Stripe'],
    image: 'images/motickly.jpg',
    url: 'https://motickly.com/',
    urlText: 'motickly.com',
  },
  {
    name: 'DTF al metro',
    kind: 'Tienda online · RM Ingenia',
    year: '2026',
    status: 'soon',
    statusText: 'En lanzamiento',
    lead: 'Tienda de impresión DTF por metros para un taller de Sevilla, desarrollada junto a otro programador.',
    points: [
      'Pedido a medida con pago por TPV y por transferencia',
      'API propia para pedidos, bonos, envíos y avisos',
      'Panel de escritorio para gestionar el taller',
    ],
    stack: ['Astro', 'Tailwind', 'FastAPI', 'Python', 'Redsys'],
    visual: 'dtf',
    url: 'https://dtfalmetro.es',
    urlText: 'dtfalmetro.es',
  },
  {
    name: 'Facturas con IA local',
    kind: 'Automatización · Cliente',
    year: '2026',
    status: 'private',
    statusText: 'Proyecto privado',
    lead: 'Para un despacho profesional de Sevilla: las facturas de proveedores que llegan por correo se leen y se preparan solas, sin que los datos salgan de su red.',
    points: [
      'IA en su propio equipo que lee cada factura como imagen y como texto',
      'Detecta duplicados, datos que faltan y proveedores nuevos',
      'Comprueba el expediente, prepara los Excel de contabilidad y deja un panel de revisión',
    ],
    stack: ['Python', 'Ollama', 'n8n', 'Excel'],
    visual: 'facturas',
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
    { t: 'La lee la IA local', s: 'Imagen y texto, en su equipo' },
    { t: 'Se comprueba', s: 'Expediente, duplicados, proveedor' },
    { t: 'Lista para contabilidad', s: 'Excel y panel de revisión' },
  ];
}
