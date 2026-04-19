import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService, THEMES } from '../../services/theme.service';

@Component({
  selector: 'app-theme-picker',
  standalone: true,
  imports: [CommonModule],
  styles: [`
    .tp-wrap {
      position: fixed; right: 1.25rem; bottom: 5rem; z-index: 60;
      display: flex; flex-direction: column; align-items: flex-end; gap: .6rem;
    }
    .tp-toggle {
      width: 42px; height: 42px; border-radius: 50%;
      border: 1px solid var(--border); background: var(--surface);
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; transition: transform .25s ease, box-shadow .25s ease;
      box-shadow: 0 4px 18px rgba(0,0,0,.35);
    }
    .tp-toggle:hover { transform: translateY(-2px) rotate(25deg); box-shadow: 0 8px 28px rgba(0,0,0,.5); }
    .tp-toggle svg { color: var(--accent); }

    .tp-panel {
      background: #111; border: 1px solid var(--border); border-radius: 14px;
      padding: .85rem .95rem; box-shadow: 0 16px 48px rgba(0,0,0,.55);
      display: flex; flex-direction: column; gap: .55rem;
      min-width: 200px;
      animation: tpIn .18s ease;
    }
    @keyframes tpIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }

    .tp-title {
      font-size: 10px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase;
      color: var(--text-3); font-family: var(--mono);
    }
    .tp-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: .45rem; }

    .tp-swatch {
      width: 34px; height: 34px; border-radius: 10px; cursor: pointer;
      border: 2px solid transparent; transition: transform .15s ease, border-color .15s ease;
      position: relative;
    }
    .tp-swatch:hover { transform: scale(1.08); }
    .tp-swatch.active { border-color: #fff; }
    .tp-swatch.active::after {
      content: ''; position: absolute; inset: 0; border-radius: 8px;
      box-shadow: 0 0 0 2px rgba(0,0,0,.4) inset;
    }

    @media (max-width: 640px) {
      .tp-wrap { right: .75rem; bottom: 4.25rem; }
    }
  `],
  template: `
    <div class="tp-wrap">
      @if (open) {
        <div class="tp-panel" (click)="$event.stopPropagation()">
          <span class="tp-title">Color del tema</span>
          <div class="tp-grid">
            @for (t of themes; track t.key) {
              <button class="tp-swatch"
                      [class.active]="t.key === theme.current().key"
                      [style.background]="t.accent"
                      [title]="t.label"
                      (click)="select(t.key)"></button>
            }
          </div>
        </div>
      }
      <button class="tp-toggle" (click)="toggle($event)" aria-label="Cambiar color del tema">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/>
          <circle cx="12" cy="7"  r="1.2" fill="currentColor"/>
          <circle cx="17" cy="10" r="1.2" fill="currentColor"/>
          <circle cx="16" cy="15" r="1.2" fill="currentColor"/>
          <circle cx="8"  cy="15" r="1.2" fill="currentColor"/>
          <circle cx="7"  cy="10" r="1.2" fill="currentColor"/>
        </svg>
      </button>
    </div>
  `,
})
export class ThemePickerComponent {
  open   = false;
  themes = THEMES;

  constructor(public theme: ThemeService) {}

  toggle(e: Event): void {
    e.stopPropagation();
    this.open = !this.open;
  }

  select(key: string): void {
    this.theme.set(key);
  }

  @HostListener('document:click')
  onDocClick(): void {
    if (this.open) this.open = false;
  }
}
