import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupabaseService } from '../../services/supabase.service';
import { RevealDirective } from '../../shared/reveal.directive';

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


// ── Hardcoded fallback data ──────────────────────────────────────────────────
const FALLBACK_PROJECTS: Project[] = [
  {
    num: '01',
    name: 'HubClient',
    tagline: 'Migración de CRM HubSpot → Odoo con histórico completo',
    description: 'Migración del CRM de una empresa agroalimentaria (Navarra) de HubSpot a Odoo conservando todo el histórico: emails, notas, tareas, adjuntos y las relaciones entre registros. Incluye una auditoría automática de las exportaciones del cliente (detectó IDs corrompidos por Excel y datos irrecuperables antes de migrar) y una carga validada en Odoo vía XML-RPC.',
    highlights: [
      'Extracción con la API v3 de HubSpot conservando las relaciones contacto-empresa-negocio',
      'Carga en Odoo Online vía XML-RPC con todo el histórico de actividad',
      'Herramienta de auditoría que valida los CSV antes de tocar producción',
      'Automatizaciones n8n en producción para la sincronización continua',
    ],
    image: '',
    type: 'Integración · Backend',
    year: '2026',
    slices: [
      { name: 'Python',      pct: 45, color: '#3776ab' },
      { name: 'HubSpot API', pct: 20, color: '#ff7a59' },
      { name: 'Odoo XML-RPC',pct: 20, color: '#714b67' },
      { name: 'n8n',         pct: 15, color: '#ea4b71' },
    ],
  },
  {
    num: '02',
    name: 'Motickly',
    tagline: 'SaaS de gestión de gastos con IA para autónomos y pymes',
    description: 'SaaS multi-tenant en producción que automatiza la contabilidad de autónomos y pequeñas empresas en España. El motor de IA (Gemini 2.5) extrae los datos de tickets y facturas en unos 10 segundos. Dos canales de entrada: app web con drag-and-drop y bot de Telegram. Calcula el Modelo 130 automáticamente y exporta los datos listos para la gestoría.',
    highlights: [
      'Multi-tenant con workspaces, roles, soft-delete y registro de auditoría inmutable',
      'Control de planes real en servidor: Free · Freelancer 7€ · Pro 19€ · Business 49€',
      'Cuatro métodos de autenticación: email+contraseña, Google, GitHub y magic link de Telegram',
      'HSTS preload, CSP estricta, rate limiting, bloqueo por fuerza bruta y validación de magic bytes en subidas',
    ],
    image: 'images/motickly.jpg',
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
    num: '03',
    name: 'Pipeline de migración de catálogo',
    tagline: '17.517 productos extraídos de una plataforma legacy, listos para Odoo',
    description: 'Pipeline de scraping autónomo que extrajo y normalizó un catálogo completo de e-commerce desde una plataforma legacy y lo entregó como un Excel limpio de varias hojas, listo para importar en una tienda Odoo. Desarrollado para Digital Wolf IT Solutions con peticiones asíncronas, rate limiting, patrones de reintento/lotes y logging estructurado para poder recuperarse de cualquier fallo sin empezar de cero.',
    highlights: [
      '17.517 productos · ~359 campos cada uno · más de 750.000 filas exportadas',
      '99,98% de cobertura y cero errores irrecuperables en toda la ejecución',
      'Mapa de 17.513 URLs generado para las redirecciones 301 de SEO tras la migración',
      'httpx asíncrono + Playwright con rate limiting, reintentos y logging estructurado',
    ],
    image: '',
    type: 'Scraping · Datos',
    year: '2026',
    slices: [
      { name: 'Python',     pct: 45, color: '#3776ab' },
      { name: 'Playwright', pct: 22, color: '#2ead33' },
      { name: 'httpx async',pct: 18, color: '#f59e0b' },
      { name: 'Pandas',     pct: 15, color: '#150458' },
    ],
  },
  {
    num: '04',
    name: 'Kaladim',
    tagline: 'Agencia digital — webs de alto rendimiento y automatizaciones n8n',
    description: 'Estudio digital centrado en dos líneas de servicio: webs corporativas y landings de alto rendimiento (Astro, Next.js, Angular con SEO técnico) y automatizaciones n8n self-hosted que conectan más de 400 integraciones para eliminar trabajo manual. Incluye panel de administración con métricas de proyectos y clientes activos.',
    highlights: [
      'Webs con Astro 5 y Next.js optimizadas para Core Web Vitals y SEO orgánico',
      'Workflows n8n que reducen las tareas manuales un 70% de media en los clientes',
      'Integraciones REST/GraphQL con OAuth, webhooks y APIs legacy',
      'Más de 50 proyectos entregados · más de 30 clientes activos',
    ],
    image: 'images/kaladim.jpg',
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
    num: '05',
    name: 'Estiumsew',
    tagline: 'Landing page para un taller de complementos artesanales',
    description: 'Diseño y desarrollo completo de la presencia digital de Estiumsew, un taller artesanal de Sevilla. Catálogo de productos con precios, opciones de personalización (telas, colores, iniciales), flujo de pedido directo por WhatsApp y galería de trabajos. Identidad visual cálida y artesanal, coherente con la marca.',
    highlights: [
      'Catálogo completo con categorías, precios y opciones de personalización',
      'Flujo de pedido directo por WhatsApp, sin fricción',
      'Identidad visual totalmente a medida alineada con la marca artesanal',
      'Desplegado en Vercel con pipeline automático desde GitHub',
    ],
    image: 'images/estiumsew.jpg',
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
    num: '06',
    name: 'Cosas que hacer',
    tagline: 'PWA de tareas mobile-first con autenticación y modo demo',
    description: 'App de gestión de tareas mobile-first con soporte PWA. Incluye sistema de autenticación completo (login, registro y acceso demo sin cuenta), una vista "hoy" como pantalla principal y una arquitectura preparada para sincronización en la nube. Diseño minimalista centrado en la rapidez de uso.',
    highlights: [
      'PWA instalable con carga offline y sensación nativa en móvil',
      'Modo demo sin registro para poder explorar la app al instante',
      'Vista "Hoy" como panel principal de las tareas del día',
      'Autenticación completa: login, registro y acceso como invitado',
    ],
    image: 'images/cosas-que-hacer.jpg',
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
  imports: [CommonModule, RevealDirective],
  templateUrl: './projects.component.html',
})
export class ProjectsComponent implements OnInit {
  selected: Project | null = null;
  private opener: HTMLElement | null = null;
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
      // On error or empty table, the hardcoded fallback data stays in place
    });
  }

  private parseTech(tech: unknown): TechSlice[] {
    try {
      const arr = Array.isArray(tech) ? tech : JSON.parse(tech as string ?? '[]');
      if (arr.length && typeof arr[0] === 'object' && 'pct' in arr[0]) {
        return arr as TechSlice[];
      }
      // If it is an array of strings, assign default colours
      const defaultColors = ['#c084fc', '#38bdf8', '#f59e0b', '#4ade80', '#f97316', '#6366f1'];
      return (arr as string[]).map((name: string, i: number) => ({
        name, pct: Math.round(100 / arr.length), color: defaultColors[i % defaultColors.length],
      }));
    } catch {
      return [];
    }
  }

  /** Bento de 6 columnas: dos anchas arriba y luego filas de tres; si la última fila no se llena, sus tarjetas van anchas. */
  wide(i: number): boolean {
    const n = this.projects.length;
    const rest = (n - 2) % 3;
    if (i < 2) return true;
    if (rest === 2) return i >= n - 2;
    if (rest === 1) return i >= n - 4;
    return false;
  }

  open(p: Project): void {
    this.opener = document.activeElement as HTMLElement | null;
    this.selected = p;
    document.documentElement.style.overflow = 'hidden';
  }

  @HostListener('document:keydown.escape')
  close(): void {
    if (!this.selected) return;
    this.selected = null;
    document.documentElement.style.overflow = '';
    this.opener?.focus();
  }
}
