import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevealDirective } from '../../shared/reveal.directive';

export interface Project {
  name: string;
  kind: string;
  status: 'live' | 'soon' | 'private';
  statusText: string;
  desc: string;
  role: string;
  year: string;
  context: string;
  stack: string[];
  image?: string;
  imagePos?: string;   // encuadre de la captura (por defecto, arriba y centrada)
  visual?: 'dtf' | 'facturas';
  url?: string;
  urlText?: string;
}

/**
 * Proyectos destacados, elegidos por Guillermo (2026-11-08). Van fijos en el código: la tabla `projects`
 * de Supabase ya no responde y, si volviera, no debe pisar esta selección.
 */
const OWN: Project[] = [
  {
    name: 'Aguilera Studio',
    kind: 'Estudio digital',
    status: 'live',
    statusText: 'En producción',
    desc: 'El estudio desde el que trabajo con pymes y autónomos de Sevilla. La web calcula el presupuesto al momento, enseña demos por sector y hace una auditoría web gratuita. Detrás hay un panel de gestión con solicitudes, envíos, colaboradores y publicaciones programadas, una zona privada para cada cliente y un sistema de captación que manda correos y WhatsApp a diario y contesta las respuestas sencillas con IA.',
    role: 'Producto, diseño y desarrollo',
    year: '2026',
    context: 'Estudio propio · Sevilla',
    stack: ['Angular', 'TypeScript', 'PostgreSQL', 'Vercel', 'Resend', 'Claude'],
    image: 'images/aguilera-studio.webp',
    imagePos: 'left top',
    url: 'https://aguilerastudio.dev',
    urlText: 'aguilerastudio.dev',
  },
  {
    name: 'Motickly',
    kind: 'SaaS',
    status: 'live',
    statusText: 'En producción',
    desc: 'Gestión de gastos con IA para autónomos y pequeñas empresas. La IA lee tickets y facturas en unos 10 segundos, desde la web o enviando una foto por Telegram. Es multi-empresa, con roles y registro de auditoría, planes de pago con Stripe controlados en el servidor y una seguridad cuidada: CSP estricta, límites de peticiones y bloqueo por fuerza bruta.',
    role: 'Full stack',
    year: '2025',
    context: 'Producto propio',
    stack: ['Next.js', 'TypeScript', 'Gemini', 'PostgreSQL', 'Stripe', 'Telegram'],
    image: 'images/motickly.jpg',
    url: 'https://motickly.com/',
    urlText: 'motickly.com',
  },
];

const CLIENTS: Project[] = [
  {
    name: 'DTF al metro',
    kind: 'E-commerce',
    status: 'soon',
    statusText: 'En lanzamiento',
    desc: 'Tienda de impresión DTF por metros para RM Ingenia, de la maqueta al servidor. El cliente sube su diseño, la API comprueba medidas y resolución, calcula el precio y cobra por TPV o transferencia. Incluye un montador de pliegos que genera el PDF a tamaño real, un personalizador de prendas, bonos y un panel de escritorio para que el taller gestione pedidos y envíos.',
    role: 'Full stack, con Ismael Piña',
    year: '2026',
    context: 'Cliente real · RM Ingenia (Sevilla)',
    stack: ['Astro', 'Tailwind', 'FastAPI', 'Python', 'PostgreSQL', 'Docker'],
    visual: 'dtf',
    url: 'https://dtfalmetro.es',
    urlText: 'dtfalmetro.es',
  },
  {
    name: 'Facturas con IA local',
    kind: 'Automatización',
    status: 'private',
    statusText: 'Proyecto privado',
    desc: 'Para un despacho profesional: las facturas de proveedores que llegan por correo se leen y se preparan solas, sin que los datos salgan de su red. Una IA instalada en su propio equipo lee cada factura como imagen y como texto, detecta duplicados, datos que faltan y proveedores nuevos, comprueba el expediente y deja los Excel de contabilidad listos junto a un panel de revisión.',
    role: 'Análisis, desarrollo e implantación',
    year: '2026',
    context: 'Cliente real · Sevilla',
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
  groups = [
    { label: 'Productos propios', items: OWN, from: 0 },
    { label: 'Trabajo para clientes', items: CLIENTS, from: OWN.length },
  ];
  flow = [
    { t: 'Llega por correo', s: 'Buzón de facturas' },
    { t: 'La lee la IA local', s: 'Imagen y texto, en su equipo' },
    { t: 'Se comprueba', s: 'Expediente, duplicados, proveedor' },
    { t: 'Lista para contabilidad', s: 'Excel y panel de revisión' },
  ];

  num(i: number): string { return String(i + 1).padStart(2, '0'); }
}
