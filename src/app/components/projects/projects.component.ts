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

// ── Hardcoded fallback data ──────────────────────────────────────────────────
const FALLBACK_PROJECTS: Project[] = [
  {
    num: '01',
    name: 'HubClient',
    tagline: 'HubSpot → Odoo CRM migration with full history',
    description: 'CRM migration for an agri-food company (Navarra) from HubSpot to Odoo, preserving the entire history: emails, notes, tasks, attachments and the relationships between records. Includes an automatic audit of the client exports (it caught IDs corrupted by Excel and unrecoverable data before migrating) and a validated load into Odoo over XML-RPC.',
    highlights: [
      'Extraction via HubSpot API v3, preserving contact-company-deal relationships',
      'Load into Odoo Online over XML-RPC with the full activity history',
      'Audit tool that validates CSV exports before touching production',
      'n8n automations running in production for continuous syncing',
    ],
    image: '',
    type: 'Integration · Backend',
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
    tagline: 'AI-powered expense management SaaS for freelancers and SMEs',
    description: 'Multi-tenant SaaS live in production that automates bookkeeping for Spanish freelancers and small businesses. The AI engine (Gemini 2.5) extracts data from receipts and invoices in ~10 seconds. Two input channels: a web app with drag-and-drop and a Telegram bot. It calculates the Spanish Modelo 130 tax form automatically and exports data ready for the accountant.',
    highlights: [
      'Multi-tenant with workspaces, roles, soft-delete and an immutable audit log',
      'Real server-side plan gating: Free · Freelancer €7 · Pro €19 · Business €49',
      'Four auth methods: email+password, Google, GitHub, Telegram magic link',
      'HSTS preload, strict CSP, rate limiting, brute-force lockout, magic-byte upload checks',
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
    name: 'Catalogue Migration Pipeline',
    tagline: '17,517 products extracted from a legacy platform, ready for Odoo',
    description: 'Autonomous scraping pipeline that extracted and normalised a full e-commerce catalogue from a legacy platform and delivered it as a clean multi-sheet Excel, ready to import into an Odoo store. Built for Digital Wolf IT Solutions with async requests, rate limiting, retry/batch patterns and structured logging so the run could recover from any failure without starting over.',
    highlights: [
      '17,517 products · ~359 fields each · over 750,000 rows exported',
      '99.98% coverage with zero unrecoverable errors across the full run',
      '17,513-URL map generated for the SEO 301 redirects after migration',
      'Async httpx + Playwright with rate limiting, retries and structured logging',
    ],
    image: '',
    type: 'Scraping · Data',
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
    tagline: 'Digital agency — high-performance websites and n8n automations',
    description: 'Digital studio focused on two service lines: high-performance corporate sites and landing pages (Astro, Next.js, Angular with technical SEO) and self-hosted n8n automations connecting 400+ integrations to remove manual work. Includes an admin panel with project and active-client metrics.',
    highlights: [
      'Astro 5 and Next.js sites optimised for Core Web Vitals and organic SEO',
      'n8n workflows that cut manual tasks by 70% on average for clients',
      'REST/GraphQL integrations with OAuth, webhooks and legacy APIs',
      '50+ projects delivered · 30+ active clients',
    ],
    image: 'images/kaladim.jpg',
    type: 'Agency · Full Stack',
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
    tagline: 'Landing page for a handmade accessories workshop',
    description: 'Full design and development of the digital presence for Estiumsew, a craft workshop in Seville. Product catalogue with prices, customisation options (fabrics, colours, initials), a direct WhatsApp ordering flow and a gallery of past work. Warm, handcrafted visual identity consistent with the brand.',
    highlights: [
      'Complete catalogue with categories, prices and customisation options',
      'Frictionless direct ordering flow over WhatsApp',
      'Fully custom visual identity aligned with the craft brand',
      'Deployed on Vercel with an automatic pipeline from GitHub',
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
    tagline: 'Mobile-first PWA todo app with auth and demo mode',
    description: 'Mobile-first task management app with PWA support. Includes a complete authentication system (login, sign-up and demo access without an account), a "today" view as the main screen and an architecture ready for cloud sync. Minimal design focused on speed of use.',
    highlights: [
      'Installable PWA with offline loading and a native feel on mobile',
      'Demo mode with no sign-up so anyone can explore the app instantly',
      '"Today" view as the main dashboard for the day\'s tasks',
      'Full auth: login, sign-up and guest access',
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
