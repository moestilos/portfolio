import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RevealDirective } from '../../shared/reveal.directive';

const LINK_LABELS: Record<string, string> = { email: 'Correo', linkedin: 'LinkedIn', github: 'GitHub' };

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, RevealDirective],
  templateUrl: './contact.component.html',
})
export class ContactComponent {
  linkLabel(icon: string): string { return LINK_LABELS[icon] ?? ''; }

  form = {
    name: '',
    email: '',
    project: '',
    message: '',
  };

  sending = false;
  sent = false;
  error = false;

  contactLinks = [
    {
      icon: 'email',
      label: 'guillermo.moestilos@gmail.com',
      href: 'mailto:guillermo.moestilos@gmail.com',
      color: '#a855f7',
    },
    {
      icon: 'linkedin',
      label: 'linkedin.com/in/guillermo-mateos',
      href: 'https://www.linkedin.com/in/guillermo-mateos-de-los-santos-aguilera-02427b260/',
      color: '#0077b5',
    },
    {
      icon: 'github',
      label: 'github.com/moestilos',
      href: 'https://github.com/moestilos',
      color: '#e2e8f0',
    },
  ];

  projectTypes = [
    'Web / Landing Page',
    'Aplicación web a medida',
    'Automatización / Scraping',
    'Integración de IA / LLM',
    'E-commerce',
    'API / Backend',
    'Rendimiento / Optimización',
    'Oferta de empleo',
    'Otro',
  ];

  /** Simple mailto fallback — replace with EmailJS or API in production */
  async submit(e: Event): Promise<void> {
    e.preventDefault();
    const { name, email, project, message } = this.form;
    const subject = encodeURIComponent(`[Portfolio] ${project} — ${name}`);
    const body = encodeURIComponent(
      `Hola Guillermo,\n\nMe llamo ${name} (${email}).\n\nProyecto: ${project}\n\n${message}`
    );
    window.location.href = `mailto:guillermo.moestilos@gmail.com?subject=${subject}&body=${body}`;
  }
}
