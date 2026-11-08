import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevealDirective } from '../../shared/reveal.directive';

export interface TimelineItem {
  type: 'work' | 'edu';
  badge: string;
  date: string;
  title: string;
  company: string;
  desc: string;
  tags?: string[];
}

type TabKey = 'all' | 'work' | 'edu';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  templateUrl: './experience.component.html',
})
export class ExperienceComponent {
  activeTab: TabKey = 'all';

  get tabIndex(): number { return this.tabs.findIndex(t => t.key === this.activeTab); }

  tabs: { key: TabKey; label: string }[] = [
    { key: 'all',  label: 'Todo' },
    { key: 'work', label: 'Experiencia' },
    { key: 'edu',  label: 'Formación' },
  ];

  items: TimelineItem[] = [
    {
      type: 'work',
      badge: 'Empresa',
      date: '2026',
      title: 'Desarrollador de software — Web Scraping y migración de datos',
      company: 'Digital Wolf IT Solutions · Sevilla',
      desc: 'Desarrollo de un pipeline autónomo que extrajo y normalizó un catálogo completo de e-commerce de 17.517 productos desde una plataforma legacy (99,98% de cobertura, más de 750.000 filas) listo para migrar a Odoo, además de un mapa de 17.513 URLs para las redirecciones 301 de SEO. También automatizaciones con n8n e integraciones web para clientes internos.',
      tags: ['Python', 'Playwright', 'httpx async', 'Pandas', 'Odoo', 'n8n'],
    },
    {
      type: 'work',
      badge: 'Freelance',
      date: '2025 — Actualidad',
      title: 'Desarrollador web freelance',
      company: 'Proyectos independientes · Remoto',
      desc: 'Proyectos web y de automatización para clientes reales: migración de CRM HubSpot → Odoo para una empresa agroalimentaria (histórico completo vía API), automatizaciones con n8n y Python, scraping con Playwright, integraciones de IA con Claude y Gemini, y desarrollo web a medida.',
      tags: ['Python', 'n8n', 'Odoo', 'HubSpot API', 'Claude API', 'Angular', 'Next.js'],
    },
    {
      type: 'work',
      badge: 'Prácticas',
      date: '2025',
      title: 'Desarrollador Full-Stack — Prácticas',
      company: 'CodeArts Solutions · Sevilla',
      desc: 'Desarrollo con Angular, Symfony, Tailwind CSS, Docker y PostgreSQL en proyectos reales de cliente. Trabajo en equipo con metodologías ágiles.',
      tags: ['Angular', 'Symfony', 'Docker', 'PostgreSQL', 'Tailwind'],
    },
    {
      type: 'edu',
      badge: 'Formación',
      date: '2023 — 2025',
      title: 'Grado Superior — Desarrollo de Aplicaciones Web (DAW)',
      company: 'Cesur Sevilla · Desarrollo de Aplicaciones Web',
      desc: 'Formación completa en desarrollo web con Java, PHP, JavaScript, Spring Boot, Laravel y más.',
      tags: ['Java', 'PHP', 'Laravel', 'Spring Boot', 'JavaScript'],
    },
    {
      type: 'work',
      badge: 'Prácticas',
      date: '2022 — 2023',
      title: 'Desarrollador web — Prácticas',
      company: 'Guadaltech Professional Cloud · Sevilla',
      desc: '400h de formación práctica en desarrollo web y sistemas. WordPress, Odoo y Adobe Creative Cloud en proyectos reales.',
      tags: ['WordPress', 'Odoo', 'Adobe CC', 'PHP'],
    },
    {
      type: 'edu',
      badge: 'Formación',
      date: '2020 — 2022',
      title: 'Grado Medio — Sistemas Microinformáticos y Redes (SMR)',
      company: 'Obicex Implika · Sistemas Microinformáticos y Redes',
      desc: 'Fundamentos de sistemas, redes y programación. Primeros pasos en desarrollo web.',
      tags: ['Redes', 'Sistemas', 'WordPress'],
    },
  ];

  setTab(key: TabKey): void {
    this.activeTab = key;
  }

  get filteredItems(): TimelineItem[] {
    if (this.activeTab === 'all') return this.items;
    return this.items.filter(item => item.type === this.activeTab);
  }
}
