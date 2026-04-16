import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
})
export class HeroComponent implements OnInit, OnDestroy {

  // Typewriter
  currentText  = '';
  cursorOn     = true;
  private roles = [
    'Fullstack Developer',
    'Angular Specialist',
    'Laravel Expert',
    'Freelance Developer',
  ];
  private ri    = 0;
  private ci    = 0;
  private del   = false;
  private timer: ReturnType<typeof setTimeout> | null = null;
  private blink: ReturnType<typeof setInterval> | null = null;

  stats = [
    { num: '2+',   label: 'Años de experiencia' },
    { num: '10+',  label: 'Proyectos entregados' },
    { num: '100%', label: 'Compromiso' },
  ];

  constructor(private supa: SupabaseService) {}

  ngOnInit(): void { this.type(); this.startBlink(); }

  trackCv(): void { this.supa.trackCvDownload(); }

  ngOnDestroy(): void {
    if (this.timer) clearTimeout(this.timer);
    if (this.blink) clearInterval(this.blink);
  }

  private type(): void {
    const word  = this.roles[this.ri];
    const speed = this.del ? 55 : 100;
    if (!this.del) this.currentText = word.slice(0, ++this.ci);
    else           this.currentText = word.slice(0, --this.ci);

    if (!this.del && this.ci === word.length) {
      this.timer = setTimeout(() => { this.del = true; this.type(); }, 1800);
      return;
    }
    if (this.del && this.ci === 0) {
      this.del = false;
      this.ri  = (this.ri + 1) % this.roles.length;
      this.timer = setTimeout(() => this.type(), 400);
      return;
    }
    this.timer = setTimeout(() => this.type(), speed);
  }

  private startBlink(): void {
    this.blink = setInterval(() => this.cursorOn = !this.cursorOn, 520);
  }

  go(e: Event, id: string): void {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }
}
