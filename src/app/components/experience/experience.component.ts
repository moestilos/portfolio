import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  imports: [CommonModule],
  templateUrl: './experience.component.html',
})
export class ExperienceComponent {
  activeTab: TabKey = 'all';

  tabs: { key: TabKey; label: string }[] = [
    { key: 'all',  label: 'Todo' },
    { key: 'work', label: 'Experiencia' },
    { key: 'edu',  label: 'Formación' },
  ];

  items: TimelineItem[] = [
    {
      type: 'work',
      badge: 'Freelance',
      date: '2026 — Presente',
      title: 'Desarrollador Web Freelance',
      company: 'DigitalWolf · Remoto',
      desc: 'Desarrollo y automatización de procesos para clientes. Integración de flujos con n8n, RPAs, implantación de Odoo CRM y WordPress ERP para la gestión empresarial.',
      tags: ['n8n', 'RPAs', 'Odoo CRM', 'WordPress ERP'],
    },
    {
      type: 'work',
      badge: 'Prácticas',
      date: '2025',
      title: 'Desarrollador Full Stack — Prácticas',
      company: 'CodeArts Solutions · Sevilla',
      desc: 'Desarrollo con Angular, Symfony, Tailwind CSS, Docker y PostgreSQL en proyectos reales para clientes. Trabajo en equipo con metodologías ágiles.',
      tags: ['Angular', 'Symfony', 'Docker', 'PostgreSQL', 'Tailwind'],
    },
    {
      type: 'edu',
      badge: 'Formación',
      date: '2023 — 2025',
      title: 'Grado Superior DAW',
      company: 'Cesur Sevilla · Desarrollo de Aplicaciones Web',
      desc: 'Formación integral en desarrollo web con Java, PHP, JavaScript, Spring Boot, Laravel y más.',
      tags: ['Java', 'PHP', 'Laravel', 'Spring Boot', 'JavaScript'],
    },
    {
      type: 'work',
      badge: 'Prácticas',
      date: '2022 — 2023',
      title: 'Desarrollador Web — Prácticas',
      company: 'Guadaltech Professional Cloud · Sevilla',
      desc: '400h de formación práctica en desarrollo web y sistemas. WordPress, Odoo y Adobe Creative Cloud en proyectos reales.',
      tags: ['WordPress', 'Odoo', 'Adobe CC', 'PHP'],
    },
    {
      type: 'edu',
      badge: 'Formación',
      date: '2020 — 2022',
      title: 'Grado Medio SMR',
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
