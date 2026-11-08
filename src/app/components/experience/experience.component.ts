import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevealDirective } from '../../shared/reveal.directive';

export interface TimelineItem {
  type: 'work' | 'edu';
  badge: string;
  date: string;
  current?: boolean;
  title: string;
  place: string;
  desc: string;
  tags: string[];
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

  tabs: { key: TabKey; label: string }[] = [
    { key: 'all', label: 'Todo' },
    { key: 'work', label: 'Experiencia' },
    { key: 'edu', label: 'Formación' },
  ];

  items: TimelineItem[] = [
    {
      type: 'work', badge: 'Estudio', date: '2026 → Actualidad', current: true,
      title: 'Desarrollador full-stack', place: 'Aguilera Studio · Sevilla',
      desc: 'Estudio que llevo junto a Ismael Piña: webs, apps y automatizaciones para pymes y autónomos con precio cerrado. Producto de punta a punta: diseño, desarrollo, panel de gestión y captación automática de clientes.',
      tags: ['Angular', 'PostgreSQL', 'Vercel', 'n8n', 'Claude'],
    },
    {
      type: 'work', badge: 'Freelance', date: '2025 → Actualidad', current: true,
      title: 'Desarrollador web y automatización', place: 'Proyectos para clientes · Remoto',
      desc: 'Proyectos web y de automatización para clientes reales: migración de un CRM de HubSpot a Odoo con todo el histórico, flujos con n8n y Python, scraping con Playwright e integraciones con IA.',
      tags: ['Python', 'n8n', 'Odoo', 'Playwright', 'Next.js'],
    },
    {
      type: 'work', badge: 'Empresa', date: '2026',
      title: 'Desarrollador · scraping y migración de datos', place: 'Digital Wolf IT Solutions · Sevilla',
      desc: 'Pipeline autónomo que extrajo y normalizó un catálogo de 17.517 productos desde una plataforma antigua, con un 99,98 % de cobertura, listo para migrar a Odoo junto al mapa de redirecciones SEO.',
      tags: ['Python', 'Playwright', 'Pandas', 'Odoo'],
    },
    {
      type: 'work', badge: 'Prácticas', date: '2025',
      title: 'Desarrollador full-stack', place: 'CodeArts Solutions · Sevilla',
      desc: 'Desarrollo con Angular, Symfony, Tailwind, Docker y PostgreSQL en proyectos reales de cliente, en equipo y con metodologías ágiles.',
      tags: ['Angular', 'Symfony', 'Docker', 'PostgreSQL'],
    },
    {
      type: 'work', badge: 'Prácticas', date: '2022 → 2023',
      title: 'Desarrollador web', place: 'Guadaltech Professional Cloud · Sevilla',
      desc: '400 horas de prácticas en desarrollo web y sistemas con WordPress, Odoo y Adobe Creative Cloud en proyectos reales.',
      tags: ['WordPress', 'Odoo', 'PHP'],
    },
    {
      type: 'edu', badge: 'Formación', date: '2023 → 2025',
      title: 'Técnico Superior en Desarrollo de Aplicaciones Web', place: 'Cesur Sevilla',
      desc: 'Desarrollo web completo: frontend, backend, bases de datos y despliegue con Java, PHP, JavaScript, Spring Boot y Laravel.',
      tags: ['Java', 'PHP', 'Laravel', 'Spring Boot'],
    },
    {
      type: 'edu', badge: 'Formación', date: '2020 → 2022',
      title: 'Técnico en Sistemas Microinformáticos y Redes', place: 'Obicex Implika',
      desc: 'Fundamentos de sistemas, redes y programación, y primeros pasos en desarrollo web.',
      tags: ['Redes', 'Sistemas'],
    },
  ];

  get tabIndex(): number { return this.tabs.findIndex(t => t.key === this.activeTab); }

  get filteredItems(): TimelineItem[] {
    return this.activeTab === 'all' ? this.items : this.items.filter(i => i.type === this.activeTab);
  }
}
