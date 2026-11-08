import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  templateUrl: './about.component.html',
})
export class AboutComponent {
  facts = [
    { label: 'Ubicación', value: 'Sevilla, España' },
    { label: 'Modalidad', value: 'Remoto, híbrido o presencial' },
    { label: 'Idiomas', value: 'Español nativo · Inglés B2' },
    { label: 'Disponibilidad', value: 'Inmediata' },
  ];

  stack = [
    { group: 'Frontend', items: ['Angular', 'Next.js', 'Astro', 'TypeScript', 'Tailwind'] },
    { group: 'Backend', items: ['Python', 'FastAPI', 'Node.js', 'Laravel', 'PostgreSQL'] },
    { group: 'Automatización', items: ['n8n', 'Playwright', 'Pandas', 'APIs REST', 'Odoo'] },
    { group: 'IA', items: ['Claude', 'Gemini', 'Ollama', 'MCP', 'OCR'] },
  ];
}
