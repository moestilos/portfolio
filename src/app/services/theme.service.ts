import { Injectable, signal } from '@angular/core';

export interface ThemeColor {
  key:       string;
  label:     string;
  accent:    string;
  accentL:   string;
  accentRgb: string; // "r,g,b"
}

export const THEMES: ThemeColor[] = [
  { key: 'amber',   label: 'Amber',   accent: '#f59e0b', accentL: '#fbbf24', accentRgb: '245,158,11'  },
  { key: 'blue',    label: 'Blue',    accent: '#3b82f6', accentL: '#60a5fa', accentRgb: '59,130,246'  },
  { key: 'purple',  label: 'Purple',  accent: '#a855f7', accentL: '#c084fc', accentRgb: '168,85,247'  },
  { key: 'green',   label: 'Green',   accent: '#22c55e', accentL: '#4ade80', accentRgb: '34,197,94'   },
  { key: 'pink',    label: 'Pink',    accent: '#ec4899', accentL: '#f472b6', accentRgb: '236,72,153'  },
  { key: 'red',     label: 'Red',     accent: '#ef4444', accentL: '#f87171', accentRgb: '239,68,68'   },
  { key: 'teal',    label: 'Teal',    accent: '#14b8a6', accentL: '#2dd4bf', accentRgb: '20,184,166'  },
  { key: 'cyan',    label: 'Cyan',    accent: '#06b6d4', accentL: '#22d3ee', accentRgb: '6,182,212'   },
];

const STORAGE_KEY = 'portfolio:theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  current = signal<ThemeColor>(THEMES[0]);

  constructor() {
    const saved = typeof localStorage !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
    const theme = THEMES.find(t => t.key === saved) ?? THEMES[0];
    this.apply(theme);
  }

  set(key: string): void {
    const theme = THEMES.find(t => t.key === key);
    if (theme) this.apply(theme);
  }

  private apply(theme: ThemeColor): void {
    this.current.set(theme);
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    root.style.setProperty('--accent',    theme.accent);
    root.style.setProperty('--accent-l',  theme.accentL);
    root.style.setProperty('--accent-bg', `rgba(${theme.accentRgb},0.07)`);
    root.style.setProperty('--accent-rgb', theme.accentRgb);
    try { localStorage.setItem(STORAGE_KEY, theme.key); } catch {}
  }
}
