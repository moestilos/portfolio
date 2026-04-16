import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { SupabaseService, DashboardStats, DayStat } from '../../services/supabase.service';
import { ProjectsAdminComponent } from './projects-admin.component';

interface KpiCard {
  label:    string;
  value:    string | number;
  sub:      string;
  color:    string;
  icon:     string; // SVG path
}

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterModule, ProjectsAdminComponent],
  styles: [`
    :host { display: block; min-height: 100vh; background: var(--bg); font-family: var(--font); }

    .sidebar {
      width: 220px; flex-shrink: 0;
      background: var(--surface);
      border-right: 1px solid var(--border);
      display: flex; flex-direction: column;
      padding: 1.5rem 0;
    }
    .nav-link {
      display: flex; align-items: center; gap: 10px;
      padding: 9px 20px; font-size: 13px; font-weight: 500;
      color: var(--text-3); cursor: pointer;
      transition: color .2s, background .2s; border-radius: 0;
      text-decoration: none;
    }
    .nav-link:hover    { color: var(--text-1); background: rgba(255,255,255,.03); }
    .nav-link.active   { color: var(--accent); background: rgba(245,158,11,.05);
                         border-left: 2px solid var(--accent); }
    .kpi-card {
      background: var(--surface); border: 1px solid var(--border);
      border-radius: 12px; padding: 1.25rem 1.5rem;
      display: flex; flex-direction: column; gap: .5rem;
      transition: border-color .2s;
    }
    .kpi-card:hover { border-color: rgba(245,158,11,.2); }
  `],
  template: `
<div class="flex min-h-screen" style="color:var(--text-1);">

  <!-- ── Sidebar ─────────────────────────────────── -->
  <aside class="sidebar hidden lg:flex">
    <!-- Logo -->
    <div class="px-5 pb-6 mb-2" style="border-bottom:1px solid var(--border);">
      <div class="flex items-center gap-2.5">
        <div class="w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm text-black"
             style="background:var(--accent);">m</div>
        <span class="font-bold text-sm" style="color:var(--text-1);">
          moestilos<span style="color:var(--accent);">.</span>
        </span>
      </div>
      <div class="text-xs mt-2" style="color:var(--text-3); font-family:var(--mono);">Panel Admin</div>
    </div>

    <!-- Nav -->
    <nav class="flex flex-col flex-1 px-3 gap-1 mt-2">
      <a class="nav-link" [class.active]="view==='dashboard'" (click)="view='dashboard'">
        <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
          <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
          <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
        </svg>
        Dashboard
      </a>
      <a class="nav-link" [class.active]="view==='analytics'" (click)="view='analytics'">
        <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
        </svg>
        Analíticas
      </a>
      <a class="nav-link" [class.active]="view==='projects'" (click)="view='projects'">
        <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
          <path d="M2 20h20M4 20V10l8-7 8 7v10"/>
        </svg>
        Proyectos
      </a>
    </nav>

    <!-- User footer -->
    <div class="px-4 pt-4 mt-auto" style="border-top:1px solid var(--border);">
      <div class="text-xs truncate mb-3" style="color:var(--text-3); font-family:var(--mono);">
        {{ user?.email }}
      </div>
      <button class="w-full text-xs py-2 px-3 rounded-lg transition-colors duration-200"
              style="background:transparent; border:1px solid var(--border); color:var(--text-3); cursor:pointer; outline:none;"
              (click)="logout()"
              onmouseover="this.style.borderColor='rgba(239,68,68,.35)';this.style.color='#f87171'"
              onmouseout="this.style.borderColor='var(--border)';this.style.color='var(--text-3)'">
        Cerrar sesión
      </button>
    </div>
  </aside>

  <!-- ── Main ─────────────────────────────────────── -->
  <main class="flex-1 flex flex-col min-w-0">

    <!-- Top bar (mobile + desktop header) -->
    <header class="flex items-center justify-between px-6 py-4"
            style="border-bottom:1px solid var(--border); background:var(--surface);">
      <div>
        <h1 class="text-base font-bold" style="color:var(--text-1);">
          {{ viewTitle }}
        </h1>
        <p class="text-xs" style="color:var(--text-3);">{{ today }}</p>
      </div>
      <div class="flex items-center gap-3">
        <!-- View portfolio link -->
        <a href="/" target="_blank"
           class="text-xs flex items-center gap-1.5 transition-colors duration-200"
           style="color:var(--text-3); font-family:var(--mono);"
           onmouseover="this.style.color='var(--accent)'"
           onmouseout="this.style.color='var(--text-3)'">
          Ver web ↗
        </a>
        <!-- Mobile logout -->
        <button class="lg:hidden text-xs py-1.5 px-3 rounded-lg"
                style="border:1px solid var(--border); color:var(--text-3); background:transparent; cursor:pointer; outline:none;"
                (click)="logout()">
          Salir
        </button>
      </div>
    </header>

    <!-- Mobile nav pills -->
    <div class="lg:hidden flex gap-2 px-6 py-3 overflow-x-auto"
         style="border-bottom:1px solid var(--border);">
      @for (v of mobileViews; track v.key) {
        <button class="shrink-0 text-xs px-4 py-1.5 rounded-full transition-all duration-200"
                [style.background]="view === v.key ? 'var(--accent-bg)' : 'var(--surface)'"
                [style.borderColor]="view === v.key ? 'rgba(245,158,11,.35)' : 'var(--border)'"
                [style.color]="view === v.key ? 'var(--accent-l)' : 'var(--text-3)'"
                style="border:1px solid; cursor:pointer; outline:none;"
                (click)="view = v.key">
          {{ v.label }}
        </button>
      }
    </div>

    <!-- Content area -->
    <div class="flex-1 p-5 sm:p-8 overflow-auto">

      @if (loading) {
        <!-- Loading state -->
        <div class="flex items-center justify-center h-64">
          <svg class="animate-spin" width="24" height="24" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="2" style="color:var(--accent);">
            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
          </svg>
        </div>
      } @else {

        <!-- ── DASHBOARD VIEW ── -->
        @if (view === 'dashboard' || view === 'analytics') {

          <!-- KPI Cards -->
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            @for (k of kpis; track k.label) {
              <div class="kpi-card">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-semibold tracking-widest uppercase"
                        style="color:var(--text-3); font-family:var(--mono);">{{ k.label }}</span>
                  <div class="w-7 h-7 rounded-lg flex items-center justify-center"
                       [style.background]="k.color + '18'"
                       [style.border]="'1px solid ' + k.color + '30'">
                    <svg width="13" height="13" fill="none" viewBox="0 0 24 24"
                         stroke="currentColor" stroke-width="2" [style.color]="k.color">
                      <path [attr.d]="k.icon"/>
                    </svg>
                  </div>
                </div>
                <div class="text-3xl font-black tabular-nums" [style.color]="k.color">{{ k.value }}</div>
                <div class="text-xs" style="color:var(--text-3);">{{ k.sub }}</div>
              </div>
            }
          </div>

          <!-- Visits Chart -->
          <div class="rounded-xl p-5 sm:p-6 mb-6"
               style="background:var(--surface); border:1px solid var(--border);">
            <div class="flex items-center justify-between mb-5">
              <div>
                <h3 class="text-sm font-bold" style="color:var(--text-1);">Visitas</h3>
                <p class="text-xs" style="color:var(--text-3);">Últimos 14 días</p>
              </div>
              <div class="text-2xl font-black tabular-nums" style="color:var(--accent);">
                {{ stats?.viewsThisWeek ?? 0 }}
                <span class="text-xs font-normal" style="color:var(--text-3);">esta semana</span>
              </div>
            </div>

            <!-- SVG Area Chart -->
            <svg [attr.viewBox]="'0 0 ' + chartW + ' ' + chartH"
                 width="100%" [attr.height]="chartH" style="overflow:visible; display:block;">
              <defs>
                <linearGradient id="viewGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%"   stop-color="#f59e0b" stop-opacity="0.25"/>
                  <stop offset="100%" stop-color="#f59e0b" stop-opacity="0"/>
                </linearGradient>
              </defs>

              <!-- Grid lines -->
              @for (g of gridLines(stats?.viewsByDay ?? []); track g.y) {
                <line [attr.x1]="chartPad.l" [attr.y1]="g.y"
                      [attr.x2]="chartW - chartPad.r" [attr.y2]="g.y"
                      stroke="rgba(255,255,255,0.04)" stroke-width="1"/>
                <text [attr.x]="chartPad.l - 8" [attr.y]="g.y + 4"
                      text-anchor="end" font-size="9" fill="rgba(255,255,255,0.2)"
                      font-family="JetBrains Mono, monospace">{{ g.label }}</text>
              }

              <!-- Area fill -->
              @if (areaPath(stats?.viewsByDay ?? [])) {
                <path [attr.d]="areaPath(stats?.viewsByDay ?? [])"
                      fill="url(#viewGrad)"/>
                <!-- Line -->
                <path [attr.d]="linePath(stats?.viewsByDay ?? [])"
                      fill="none" stroke="#f59e0b" stroke-width="2"
                      stroke-linecap="round" stroke-linejoin="round"/>
                <!-- Dots -->
                @for (pt of chartPoints(stats?.viewsByDay ?? []); track pt.x) {
                  <circle [attr.cx]="pt.x" [attr.cy]="pt.y" r="3"
                          fill="#f59e0b" stroke="var(--bg)" stroke-width="1.5"/>
                }
              }

              <!-- X labels -->
              @for (pt of chartPoints(stats?.viewsByDay ?? []); track pt.x; let pi = $index) {
                @if (pi % 2 === 0) {
                  <text [attr.x]="pt.x" [attr.y]="chartH - 4"
                        text-anchor="middle" font-size="9" fill="rgba(255,255,255,0.3)"
                        font-family="JetBrains Mono, monospace">{{ pt.label }}</text>
                }
              }
            </svg>
          </div>

          <!-- CV Downloads Chart -->
          <div class="rounded-xl p-5 sm:p-6"
               style="background:var(--surface); border:1px solid var(--border);">
            <div class="flex items-center justify-between mb-5">
              <div>
                <h3 class="text-sm font-bold" style="color:var(--text-1);">Descargas CV</h3>
                <p class="text-xs" style="color:var(--text-3);">Últimos 14 días</p>
              </div>
              <div class="text-2xl font-black tabular-nums" style="color:#67e8f9;">
                {{ stats?.totalCvDowns ?? 0 }}
                <span class="text-xs font-normal" style="color:var(--text-3);">total</span>
              </div>
            </div>
            <!-- Bar chart -->
            <svg [attr.viewBox]="'0 0 ' + chartW + ' ' + (chartH * 0.75)"
                 width="100%" [attr.height]="chartH * 0.75" style="display:block;">
              @for (bar of cvBars(stats?.cvDownsByDay ?? []); track bar.x; let bi = $index) {
                <rect [attr.x]="bar.x - bar.w / 2" [attr.y]="bar.y"
                      [attr.width]="bar.w" [attr.height]="bar.h"
                      rx="3" fill="#67e8f9" opacity="0.7"/>
                @if (bi % 2 === 0) {
                  <text [attr.x]="bar.x" [attr.y]="chartH * 0.75 - 4"
                        text-anchor="middle" font-size="9" fill="rgba(255,255,255,0.3)"
                        font-family="JetBrains Mono, monospace">{{ bar.label }}</text>
                }
              }
            </svg>
          </div>
        }

        <!-- ── PROJECTS VIEW ── -->
        @if (view === 'projects') {
          <app-projects-admin />
        }

      }
    </div>
  </main>
</div>
  `,
})
export class AdminComponent implements OnInit {
  view: 'dashboard' | 'analytics' | 'projects' = 'dashboard';
  loading = true;
  stats: DashboardStats | null = null;
  user = this.supa.getUser();

  readonly chartW   = 600;
  readonly chartH   = 160;
  readonly chartPad = { l: 36, r: 16, t: 16, b: 28 };

  mobileViews = [
    { key: 'dashboard' as const, label: 'Dashboard' },
    { key: 'analytics' as const, label: 'Analíticas' },
    { key: 'projects'  as const, label: 'Proyectos' },
  ];


  get today(): string {
    return new Date().toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  }

  get viewTitle(): string {
    const map: Record<string, string> = { dashboard: 'Dashboard', analytics: 'Analíticas', projects: 'Proyectos' };
    return map[this.view] ?? 'Admin';
  }

  get kpis() {
    const s = this.stats;
    return [
      { label: 'Visitas totales', value: s?.totalViews ?? 0,    sub: `${s?.viewsToday ?? 0} hoy`,          color: '#f59e0b', icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z' },
      { label: 'Esta semana',     value: s?.viewsThisWeek ?? 0, sub: 'últimos 7 días',                      color: '#c084fc', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
      { label: 'Descargas CV',   value: s?.totalCvDowns ?? 0,  sub: `${s?.cvDownsToday ?? 0} hoy`,         color: '#67e8f9', icon: 'M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
      { label: 'Proyectos',      value: '—',                           sub: 'ver sección',                 color: '#4ade80', icon: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z' },
    ];
  }

  constructor(
    private supa:   SupabaseService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.supa.getDashboardStats()
      .then(s  => { this.stats = s; })
      .catch(() => { this.stats = this.emptyStats(); })
      .finally(() => { this.loading = false; });
  }

  logout(): void {
    sessionStorage.removeItem('moe_admin');
    this.router.navigate(['/admin/login']);
  }

  // ─── Chart helpers ─────────────────────────────────────────────────────────

  /** Rellena 14 días de datos, poniendo 0 donde no hay registros */
  private fill14Days(raw: { day: string; count: number }[]): { day: string; count: number }[] {
    const map: Record<string, number> = {};
    raw.forEach(r => { map[r.day] = r.count; });
    const result = [];
    for (let i = 13; i >= 0; i--) {
      const d = new Date(Date.now() - i * 86400000);
      const key = d.toISOString().split('T')[0];
      result.push({ day: key, count: map[key] ?? 0 });
    }
    return result;
  }

  private toCoords(data: DayStat[]): { x: number; y: number; label: string }[] {
    const filled = this.fill14Days(data);
    const max    = Math.max(...filled.map(d => d.count), 1);
    const { l, r, t, b } = this.chartPad;
    const innerW = this.chartW - l - r;
    const innerH = this.chartH - t - b;

    return filled.map((d, i) => ({
      x:     l + (i / (filled.length - 1)) * innerW,
      y:     t + innerH - (d.count / max) * innerH,
      label: new Date(d.day + 'T00:00:00').toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit' }),
    }));
  }

  chartPoints(data: DayStat[]) { return this.toCoords(data); }

  linePath(data: DayStat[]): string {
    const pts = this.toCoords(data);
    return pts.reduce((acc, p, i) => {
      if (i === 0) return `M ${p.x} ${p.y}`;
      const prev = pts[i - 1];
      const mx   = (prev.x + p.x) / 2;
      return acc + ` C ${mx} ${prev.y}, ${mx} ${p.y}, ${p.x} ${p.y}`;
    }, '');
  }

  areaPath(data: DayStat[]): string {
    const line   = this.linePath(data);
    const pts    = this.toCoords(data);
    if (!pts.length) return '';
    const bottom = this.chartH - this.chartPad.b;
    return `${line} L ${pts[pts.length - 1].x} ${bottom} L ${pts[0].x} ${bottom} Z`;
  }

  gridLines(data: DayStat[]): { y: number; label: string }[] {
    const filled = this.fill14Days(data);
    const max    = Math.max(...filled.map(d => d.count), 1);
    const { l: _l, r: _r, t, b } = this.chartPad;
    const innerH = this.chartH - t - b;
    const steps  = 4;
    return Array.from({ length: steps + 1 }, (_, i) => ({
      y:     t + innerH - (i / steps) * innerH,
      label: String(Math.round((i / steps) * max)),
    }));
  }

  cvBars(data: DayStat[]) {
    const filled = this.fill14Days(data);
    const max    = Math.max(...filled.map(d => d.count), 1);
    const h      = this.chartH * 0.75;
    const { l, r, b, t } = this.chartPad;
    const innerW = this.chartW - l - r;
    const innerH = h - t - b;
    const bw     = (innerW / filled.length) * 0.55;

    return filled.map((d, i) => ({
      x:     l + (i / (filled.length - 1)) * innerW,
      y:     t + innerH - (d.count / max) * innerH,
      h:     (d.count / max) * innerH,
      w:     bw,
      label: new Date(d.day + 'T00:00:00').toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit' }),
    }));
  }

  private emptyStats(): DashboardStats {
    return { totalViews: 0, viewsToday: 0, viewsThisWeek: 0, totalCvDowns: 0, cvDownsToday: 0, viewsByDay: [], cvDownsByDay: [] };
  }
}
