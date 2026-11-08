import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupabaseService } from '../../services/supabase.service';

const TILT_X_DEG = 4;
const TILT_Y_DEG = 5;

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
})
export class HeroComponent {
  rx = '0deg';
  ry = '0deg';

  constructor(private supa: SupabaseService) {}

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
