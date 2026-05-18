import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupabaseService } from '../../services/supabase.service';

export interface TechSlice { name: string; pct: number; color: string; }
export interface Project {
  num: string;
  name: string;
  tagline: string;
  description: string;
  highlights: string[];
  image: string;
  type: string;
  year: string;
  slices: TechSlice[];
  demoUrl?: string;
  codeUrl?: string;
}

const R = 44;
export const C = 2 * Math.PI * R;

// ── Datos hardcodeados como fallback ─────────────────────────────────────────
const FALLBACK_PROJECTS: Project[] = [
  {
    num: '01',
    name: 'Motickly',
    tagline: 'SaaS de gestión de gastos e IA para autónomos y pymes',
    description: 'SaaS multi-tenant en producción que automatiza la contabilidad de autónomos y pymes españolas. El motor IA (Gemini 2.5) extrae datos de tickets y facturas en ~10 segundos. Dos canales de entrada: web con drag-drop y bot de Telegram. Calcula automáticamente el Modelo 130 e incluye exportación lista para gestor.',
    highlights: [
      'Multi-tenant con workspaces, roles, soft-delete y auditoría inmutable',
      'Plan gating real server-side: Free · Autónomo 7 € · Pro 19 € · Empresa 49 €',
      'Cuatro métodos de auth: email+password, Google, GitHub, magic link Telegram',
      'HSTS preload, CSP estricto, rate limiting, brute-force lockout, magic bytes en uploads',
    ],
    image: 'images/motickly.png',
    type: 'SaaS · Full Stack',
    year: '2025',
    slices: [
      { name: 'Next.js / TS', pct: 35, color: '#e2e8f0' },
      { name: 'Gemini API',   pct: 20, color: '#4285f4' },
      { name: 'PostgreSQL',   pct: 20, color: '#38bdf8' },
      { name: 'Stripe',       pct: 15, color: '#635bff' },
      { name: 'Telegram',     pct: 10, color: '#29b6f6' },
    ],
    demoUrl: 'https://motickly.com/',
  },
  {
    num: '02',
    name: 'Kaladim',
    tagline: 'Agencia digital — webs de alto rendimiento y automatizaciones n8n',
    description: 'Studio digital especializado en dos líneas de servicio: webs corporativas y landing pages de alto rendimiento (Astro, Next.js, Angular con SEO técnico) y automatizaciones n8n self-hosted que conectan 400+ integraciones para eliminar trabajo manual. Panel de administración con métricas de proyectos y clientes activos.',
    highlights: [
      'Webs con Astro 5 y Next.js optimizadas para Core Web Vitals y SEO orgánico',
      'Workflows n8n que reducen tareas manuales un 70% de media en clientes',
      'Integraciones REST/GraphQL con OAuth, webhooks y APIs legacy',
      '50+ proyectos entregados · 30+ clientes activos',
    ],
    image: 'images/kaladim.png',
    type: 'Agencia · Full Stack',
    year: '2025',
    slices: [
      { name: 'Astro',       pct: 45, color: '#ff5d01' },
      { name: 'TypeScript',  pct: 30, color: '#3178c6' },
      { name: 'Tailwind',    pct: 15, color: '#38bdf8' },
      { name: 'n8n',         pct: 10, color: '#ea4b71' },
    ],
    demoUrl: 'https://kaladim.vercel.app/',
    codeUrl: 'https://github.com/moestilos/kaladim',
  },
  {
    num: '03',
    name: 'Estiumsew',
    tagline: 'Landing page para tienda artesanal de accesorios hechos a mano',
    description: 'Diseño y desarrollo completo de la presencia digital de Estiumsew, taller artesanal de Sevilla. Catálogo de productos con precios, opciones de personalización (telas, colores, iniciales), flujo de pedido directo por WhatsApp y galería de trabajos realizados. Identidad visual cálida y artesanal coherente con la marca.',
    highlights: [
      'Catálogo completo con categorías, precios y opciones de personalización',
      'Flujo de pedido directo por WhatsApp sin fricción para el cliente',
      'Identidad visual 100% personalizada alineada con la marca artesanal',
      'Deploy en Vercel con pipeline automático desde GitHub',
    ],
    image: 'images/estiumsew.png',
    type: 'Landing Page · Frontend',
    year: '2025',
    slices: [
      { name: 'HTML',        pct: 45, color: '#e34c26' },
      { name: 'Astro',       pct: 30, color: '#ff5d01' },
      { name: 'TypeScript',  pct: 15, color: '#3178c6' },
      { name: 'CSS',         pct: 10, color: '#264de4' },
    ],
    demoUrl: 'https://estiumsew.vercel.app/',
    codeUrl: 'https://github.com/moestilos/estiumsew',
  },
  {
    num: '04',
    name: 'Cosas que hacer',
    tagline: 'Todo app mobile-first PWA con auth y modo demo',
    description: 'Aplicación de gestión de tareas mobile-first con soporte PWA. Incluye sistema de autenticación completo (login, registro y acceso demo sin cuenta), vista "hoy" como pantalla principal y arquitectura preparada para sincronización en la nube. Diseño minimalista enfocado en velocidad de uso.',
    highlights: [
      'PWA instalable con carga offline y experiencia nativa en móvil',
      'Modo demo sin registro para explorar la app sin fricción',
      'Vista "Today" como dashboard principal de tareas del día',
      'Auth completa: login, registro y acceso invitado',
    ],
    image: 'images/cosas-que-hacer.png',
    type: 'App · Frontend',
    year: '2025',
    slices: [
      { name: 'TypeScript', pct: 55, color: '#3178c6' },
      { name: 'Astro',      pct: 25, color: '#ff5d01' },
      { name: 'CSS',        pct: 12, color: '#264de4' },
      { name: 'JavaScript', pct: 8,  color: '#facc15' },
    ],
    demoUrl: 'https://cosas-que-hacer.vercel.app/today',
    codeUrl: 'https://github.com/moestilos/cosas-que-hacer',
  },
];

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
})
export class ProjectsComponent implements OnInit {
  readonly R = R;
  readonly C = C;

  expanded: number | null = null;
  projects: Project[] = FALLBACK_PROJECTS;

  constructor(private supa: SupabaseService) {}

  ngOnInit(): void {
    this.supa.getProjects().then(({ data, error }) => {
      if (!error && data && data.length > 0) {
        this.projects = data.map(p => ({
          num:         p['num'],
          name:        p['name'],
          tagline:     p['tagline'] ?? '',
          description: p['description'] ?? '',
          highlights:  p['highlights'] ?? [],
          image:       p['image'] ?? '',
          type:        p['type'] ?? '',
          year:        p['year'] ?? '',
          slices:      this.parseTech(p['tech']),
          demoUrl:     p['demo_url'] ?? undefined,
          codeUrl:     p['code_url'] ?? undefined,
        }));
      }
      // Si hay error o la tabla está vacía, se mantienen los datos hardcodeados
    });
  }

  private parseTech(tech: unknown): TechSlice[] {
    try {
      const arr = Array.isArray(tech) ? tech : JSON.parse(tech as string ?? '[]');
      if (arr.length && typeof arr[0] === 'object' && 'pct' in arr[0]) {
        return arr as TechSlice[];
      }
      // Si es array de strings, asigna colores por defecto
      const defaultColors = ['#c084fc', '#38bdf8', '#f59e0b', '#4ade80', '#f97316', '#6366f1'];
      return (arr as string[]).map((name: string, i: number) => ({
        name, pct: Math.round(100 / arr.length), color: defaultColors[i % defaultColors.length],
      }));
    } catch {
      return [];
    }
  }

  toggle(id: number): void {
    this.expanded = this.expanded === id ? null : id;
  }

  segments(slices: TechSlice[]) {
    const GAP   = 5;
    let offset  = 0;
    const total = slices.reduce((s, sl) => s + sl.pct, 0);
    return slices.map(sl => {
      const dash = (sl.pct / total) * (C - GAP * slices.length);
      const seg  = { dash, gap: C - dash, offset: -offset, color: sl.color, name: sl.name, pct: sl.pct };
      offset += dash + GAP;
      return seg;
    });
  }

  go(e: Event, id: string): void {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }
}
