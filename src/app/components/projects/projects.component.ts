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
    name: 'Estiumsew',
    tagline: 'Landing page para tienda artesanal de costura',
    description: 'Diseño y desarrollo desde cero de la landing page de Estiumsew, un proyecto artesanal de costura y moda. Foco en transmitir la identidad de marca con un diseño visual cuidado, galería de productos y arquitectura de información orientada a conversión.',
    highlights: [
      'Diseño visual 100% personalizado, alineado con la identidad de marca',
      'Arquitectura de información optimizada para conversión y experiencia de usuario',
      'Deploy continuo en Netlify con pipeline automático desde GitHub',
    ],
    image: 'images/estiumsew.png',
    type: 'Landing Page · Frontend',
    year: '2025',
    slices: [
      { name: 'HTML',       pct: 40, color: '#e34c26' },
      { name: 'CSS',        pct: 35, color: '#264de4' },
      { name: 'JavaScript', pct: 25, color: '#facc15' },
    ],
    demoUrl: 'https://estiumsew.netlify.app/',
    codeUrl: 'https://github.com/moestilos/estiumsew',
  },
  {
    num: '02',
    name: 'FunkMoes',
    tagline: 'E-commerce de camisetas con panel de admin',
    description: 'Tienda online desarrollada de cero: catálogo, carrito, autenticación JWT, pasarela de pagos Stripe y panel de administración completo. Diseño centrado en conversión con experiencia de compra fluida.',
    highlights: [
      'Pasarela de pagos con Stripe, flujo de checkout completo',
      'Panel de administración con gestión de productos, pedidos y clientes',
      'Autenticación JWT con roles de usuario y rutas protegidas',
    ],
    image: 'images/pro1.png',
    type: 'E-commerce · Full Stack',
    year: '2024',
    slices: [
      { name: 'Laravel / PHP', pct: 45, color: '#f97316' },
      { name: 'Tailwind CSS',  pct: 25, color: '#38bdf8' },
      { name: 'MySQL',         pct: 20, color: '#4ade80' },
      { name: 'JavaScript',    pct: 10, color: '#facc15' },
    ],
    codeUrl: 'https://github.com/moestilos',
  },
  {
    num: '03',
    name: 'Vuela21',
    tagline: 'Sistema de gestión de envíos para cliente real',
    description: 'Aplicación de gestión de envíos para cliente real (CodeArts SL). API REST desacoplada con Symfony, frontend Angular responsive y flujos operacionales optimizados para reducir fricción en el día a día.',
    highlights: [
      'API REST desacoplada con Symfony, documentada con Swagger',
      'Frontend Angular con gestión de estado reactiva y navegación protegida',
      'Entorno Docker reproducible para desarrollo y producción',
    ],
    image: 'images/vuela21o.png',
    type: 'SaaS · Full Stack',
    year: '2025',
    slices: [
      { name: 'Angular / TS',  pct: 40, color: '#c084fc' },
      { name: 'Symfony',       pct: 30, color: '#6366f1' },
      { name: 'PostgreSQL',    pct: 20, color: '#38bdf8' },
      { name: 'Docker',        pct: 10, color: '#60a5fa' },
    ],
    codeUrl: 'https://github.com/moestilos',
  },
  {
    num: '04',
    name: 'Portfolio moestilos',
    tagline: 'Portfolio personal de alto impacto visual',
    description: 'Portfolio Angular 17 standalone + Tailwind CSS con sistema de diseño editorial completo. Typewriter animado, donut charts SVG, scroll reveal, fondo de blobs animados y optimización para conversión freelance.',
    highlights: [
      'Sistema de diseño propio con tokens CSS y componentes standalone',
      'Animaciones SVG puras sin dependencias — donut charts y scroll reveal',
      'Puntuación Lighthouse 95+ en performance y accesibilidad',
    ],
    image: 'images/tfgfo.webp',
    type: 'Portfolio · Frontend',
    year: '2025',
    slices: [
      { name: 'Angular 17',   pct: 50, color: '#c084fc' },
      { name: 'Tailwind CSS', pct: 30, color: '#38bdf8' },
      { name: 'TypeScript',   pct: 20, color: '#60a5fa' },
    ],
    codeUrl: 'https://github.com/moestilos',
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
