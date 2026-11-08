import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupabaseService } from '../../services/supabase.service';

const ROTATE_MS = 2800;
const TILT_X_DEG = 4;
const TILT_Y_DEG = 5;

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
})
export class HeroComponent implements OnInit, OnDestroy {
  // Final del titular «Desarrollo webs y automatizo …», va cambiando.
  // Cortas a propósito: todas caben en una línea y el titular no salta al cambiar.
  private roles = ['lo que hay detrás.', 'tu CRM y ERP.', 'tareas repetitivas.', 'procesos con IA.'];
  role = this.roles[0];
  private timer: ReturnType<typeof setInterval> | null = null;

  chips = ['Full-stack', 'Automatización y scraping', 'Integraciones con IA'];

  stack = ['Angular', 'Next.js', 'TypeScript', 'Python', 'FastAPI', 'Laravel', 'n8n', 'Playwright',
           'PostgreSQL', 'Supabase', 'Docker', 'Claude API', 'Gemini API', 'Odoo', 'HubSpot', 'Tailwind'];
  stackLoop = [...this.stack, ...this.stack];   // dos copias: la cinta se desplaza el 50 % y empalma

  rx = '0deg';
  ry = '0deg';

  constructor(private supa: SupabaseService) {}

  ngOnInit(): void {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let i = 0;
    this.timer = setInterval(() => { i = (i + 1) % this.roles.length; this.role = this.roles[i]; }, ROTATE_MS);
  }

  ngOnDestroy(): void {
    if (this.timer) clearInterval(this.timer);
  }

  trackCv(): void { this.supa.trackCvDownload(); }

  // Inclinación suave de la foto siguiendo el ratón (como el escaparate de Aguilera Studio).
  tilt(e: PointerEvent): void {
    if (e.pointerType !== 'mouse' || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    this.rx = (-y * TILT_X_DEG).toFixed(2) + 'deg';
    this.ry = (x * TILT_Y_DEG).toFixed(2) + 'deg';
  }

  untilt(): void { this.rx = '0deg'; this.ry = '0deg'; }

  go(e: Event, id: string): void {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }
}
