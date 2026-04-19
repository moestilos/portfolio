import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService, THEMES } from '../../services/theme.service';

@Component({
  selector: 'app-theme-picker',
  standalone: true,
  imports: [CommonModule],
  styles: [`
    /* Anchored relative to the back-to-top button (fixed bottom-8 right-8) */
    .tp-wrap {
      position: fixed; right: 2rem; bottom: calc(2rem + 40px + .6rem); z-index: 60;
      display: flex; flex-direction: column; align-items: flex-end; gap: .6rem;
    }

    /* Match back-to-top dimensions (w-10 h-10 rounded-lg) for visual rhythm */
    .tp-toggle {
      width: 40px; height: 40px; border-radius: 8px;
      border: 1px solid var(--border); background: var(--surface);
      display: flex; align-items: center; justify-content: center;
      cursor: pointer;
      transition: transform .25s ease, border-color .2s ease, background .2s ease, box-shadow .25s ease;
      box-shadow: 0 4px 18px rgba(0,0,0,.35);
    }
    .tp-toggle:hover {
      transform: translateY(-2px) rotate(20deg);
      border-color: rgba(var(--accent-rgb),.45);
      background: var(--surface-2);
      box-shadow: 0 8px 28px rgba(0,0,0,.5);
    }
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
      width: 34px; height: 34px; border-radius: 8px; cursor: pointer;
      border: 2px solid transparent; transition: transform .15s ease, border-color .15s ease;
      position: relative;
    }
    .tp-swatch:hover { transform: scale(1.08); }
    .tp-swatch.active { border-color: #fff; }
    .tp-swatch.active::after {
      content: ''; position: absolute; inset: 0; border-radius: 6px;
      box-shadow: 0 0 0 2px rgba(0,0,0,.4) inset;
    }

    /* Mobile: back-to-top keeps right-8 (2rem). Align theme picker to same column,
       shrink button + swatch panel to avoid crowding near edge. */
    /* Mobile: shrink to match back-to-top (1.25rem/36px) */
    @media (max-width: 640px) {
      .tp-wrap { right: 1.25rem; bottom: calc(1.25rem + 36px + .5rem); gap: .5rem; }
      .tp-toggle { width: 36px; height: 36px; border-radius: 8px; }
      .tp-toggle svg { width: 16px; height: 16px; }
      .tp-panel { min-width: 0; padding: .7rem .8rem; border-radius: 12px; }
      .tp-grid { grid-template-columns: repeat(4, 28px); gap: .4rem; }
      .tp-swatch { width: 28px; height: 28px; border-radius: 7px; }
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
