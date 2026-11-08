import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevealDirective } from '../../shared/reveal.directive';

export interface Service {
  icon: 'web' | 'auto' | 'ai';
  title: string;
  desc: string;
  tags: string[];
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  templateUrl: './services.component.html',
})
export class ServicesComponent {
  services: Service[] = [
    {
      icon: 'web',
      title: 'Webs y aplicaciones a medida',
      desc: 'Desde una web rápida que convierte hasta una aplicación completa con panel, pagos e integraciones.',
      tags: ['Angular', 'Next.js', 'Astro', 'FastAPI'],
    },
    {
      icon: 'auto',
      title: 'Automatización y datos',
      desc: 'Quito trabajo manual: flujos con n8n y Python, scraping a gran escala y migraciones entre CRMs y ERPs.',
      tags: ['n8n', 'Python', 'Playwright', 'Odoo'],
    },
    {
      icon: 'ai',
      title: 'IA aplicada',
      desc: 'Lectura de facturas y documentos, respuestas automáticas y asistentes. Con modelos locales cuando los datos son sensibles.',
      tags: ['Claude', 'Gemini', 'Ollama', 'OCR'],
    },
  ];
}
