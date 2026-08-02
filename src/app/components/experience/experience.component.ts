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
    { key: 'all',  label: 'All' },
    { key: 'work', label: 'Experience' },
    { key: 'edu',  label: 'Education' },
  ];

  items: TimelineItem[] = [
    {
      type: 'work',
      badge: 'Company',
      date: '2026',
      title: 'Software Developer — Web Scraping & Data Migration',
      company: 'Digital Wolf IT Solutions · Seville',
      desc: 'Built an autonomous pipeline that extracted and normalised a full e-commerce catalogue of 17,517 products from a legacy platform (99.98% coverage, >750,000 rows) ready for an Odoo migration, plus a 17,513-URL map for SEO 301 redirects. Also built n8n automations and web integrations for internal clients.',
      tags: ['Python', 'Playwright', 'httpx async', 'Pandas', 'Odoo', 'n8n'],
    },
    {
      type: 'work',
      badge: 'Freelance',
      date: '2025 — Present',
      title: 'Freelance Web Developer',
      company: 'Independent projects · Remote',
      desc: 'Web and automation projects for real clients: HubSpot → Odoo CRM migration for an agri-food company (full history via API), automations with n8n and Python, scraping with Playwright, AI integrations with Claude and Gemini, and custom web development.',
      tags: ['Python', 'n8n', 'Odoo', 'HubSpot API', 'Claude API', 'Angular', 'Next.js'],
    },
    {
      type: 'work',
      badge: 'Internship',
      date: '2025',
      title: 'Full-Stack Developer — Internship',
      company: 'CodeArts Solutions · Seville',
      desc: 'Development with Angular, Symfony, Tailwind CSS, Docker and PostgreSQL on real client projects. Teamwork with agile methodologies.',
      tags: ['Angular', 'Symfony', 'Docker', 'PostgreSQL', 'Tailwind'],
    },
    {
      type: 'edu',
      badge: 'Education',
      date: '2023 — 2025',
      title: 'Higher Diploma — Web Application Development (DAW)',
      company: 'Cesur Seville · Desarrollo de Aplicaciones Web',
      desc: 'Full web development training with Java, PHP, JavaScript, Spring Boot, Laravel and more.',
      tags: ['Java', 'PHP', 'Laravel', 'Spring Boot', 'JavaScript'],
    },
    {
      type: 'work',
      badge: 'Internship',
      date: '2022 — 2023',
      title: 'Web Developer — Internship',
      company: 'Guadaltech Professional Cloud · Seville',
      desc: '400h of hands-on training in web development and systems. WordPress, Odoo and Adobe Creative Cloud on real projects.',
      tags: ['WordPress', 'Odoo', 'Adobe CC', 'PHP'],
    },
    {
      type: 'edu',
      badge: 'Education',
      date: '2020 — 2022',
      title: 'Vocational Diploma — Microcomputer Systems & Networks (SMR)',
      company: 'Obicex Implika · Sistemas Microinformáticos y Redes',
      desc: 'Fundamentals of systems, networking and programming. First steps in web development.',
      tags: ['Networking', 'Systems', 'WordPress'],
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
