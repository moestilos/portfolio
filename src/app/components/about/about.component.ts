import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevealDirective } from '../../shared/reveal.directive';

/** Sección «Stack técnico»: cuatro áreas con lo que uso en proyectos reales. */
@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  templateUrl: './about.component.html',
})
export class AboutComponent {
  stack = [
    { group: 'Frontend', desc: 'Interfaces rápidas, accesibles y cuidadas al detalle', items: ['Angular', 'Next.js', 'Astro', 'TypeScript', 'React', 'Tailwind'] },
    { group: 'Backend y datos', desc: 'APIs, lógica de negocio, pagos y bases de datos', items: ['Python', 'FastAPI', 'Node.js', 'Laravel', 'PostgreSQL', 'Supabase'] },
    { group: 'Automatización', desc: 'Que el trabajo repetitivo se haga solo', items: ['n8n', 'Playwright', 'Pandas', 'APIs REST', 'Odoo', 'HubSpot'] },
    { group: 'IA aplicada', desc: 'Modelos en la nube o en local, según lo sensibles que sean los datos', items: ['Claude', 'Gemini', 'Ollama', 'MCP', 'OCR'] },
  ];

  num(i: number): string { return String(i + 1).padStart(2, '0'); }
}
