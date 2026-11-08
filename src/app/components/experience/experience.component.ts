import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevealDirective } from '../../shared/reveal.directive';

export interface TimelineItem {
  type: 'work' | 'edu';
  badge: string;
  date: string;
  title: string;
  place: string;
}

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  templateUrl: './experience.component.html',
})
export class ExperienceComponent {
  items: TimelineItem[] = [
    { type: 'work', badge: 'Propio', date: '2026 — Actualidad', title: 'Fundador y desarrollador', place: 'Aguilera Studio · Sevilla' },
    { type: 'work', badge: 'Freelance', date: '2025 — Actualidad', title: 'Desarrollador full-stack y automatización', place: 'Webs, automatizaciones e IA para clientes · Remoto' },
    { type: 'work', badge: 'Empresa', date: '2026', title: 'Scraping y migración de datos a Odoo (17.517 productos)', place: 'Digital Wolf IT Solutions · Sevilla' },
    { type: 'work', badge: 'Prácticas', date: '2025', title: 'Desarrollador full-stack · Angular, Symfony, Docker', place: 'CodeArts Solutions · Sevilla' },
    { type: 'work', badge: 'Prácticas', date: '2022 — 2023', title: 'Desarrollador web · WordPress y Odoo', place: 'Guadaltech Professional Cloud · Sevilla' },
    { type: 'edu', badge: 'Formación', date: '2023 — 2025', title: 'Grado Superior en Desarrollo de Aplicaciones Web', place: 'Cesur Sevilla' },
    { type: 'edu', badge: 'Formación', date: '2020 — 2022', title: 'Grado Medio en Sistemas Microinformáticos y Redes', place: 'Obicex Implika' },
  ];
}
