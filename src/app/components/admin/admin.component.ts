import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { SupabaseService, DashboardStats, DayStat } from '../../services/supabase.service';
import { ProjectsAdminComponent } from './projects-admin.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterModule, ProjectsAdminComponent],
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
      background: #0a0a0a;
      font-family: var(--font);
      color: var(--text-1);
    }

    /* ── Sidebar (desktop only) ── */
    .sidebar {
      width: 220px; flex-shrink: 0;
      background: var(--surface);
      border-right: 1px solid var(--border);
      display: flex; flex-direction: column;
    }
    .nav-link {
      display: flex; align-items: center; gap: 10px;
      padding: 10px 20px; font-size: 13px; font-weight: 500;
      color: var(--text-3); cursor: pointer;
      transition: color .2s, background .2s;
      text-decoration: none; border: none; background: none;
      width: 100%; text-align: left;
    }
    .nav-link:hover  { color: var(--text-1); background: rgba(255,255,255,.03); }
    .nav-link.active { color: var(--accent); background: rgba(245,158,11,.05);
                       border-left: 2px solid var(--accent); padding-left: 18px; }

    /* ── KPI card ── */
    .kpi {
      background: var(--surface); border: 1px solid var(--border);
      border-radius: 12px; padding: 1rem;
      display: flex; flex-direction: column; gap: .35rem;
      transition: border-color .2s;
    }
    .kpi:hover { border-color: rgba(245,158,11,.2); }

    /* ── Mobile bottom tab bar ── */
    .mob-tabs {
      position: fixed; bottom: 0; left: 0; right: 0;
      display: none;
      background: rgba(17,17,17,.97);
      border-top: 1px solid var(--border);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      z-index: 100;
      padding-bottom: env(safe-area-inset-bottom, 0);
    }
    .mob-tab {
      flex: 1; display: flex; flex-direction: column;
      align-items: center; justify-content: center;
      gap: 3px; padding: 10px 4px 8px;
      font-size: 10px; font-weight: 600; letter-spacing: .02em;
      color: var(--text-3); cursor: pointer; border: none;
      background: none; transition: color .2s; text-transform: uppercase;
    }
    .mob-tab.active { color: var(--accent); }
    .mob-tab svg { flex-shrink: 0; }

    /* ── Chart scroll wrapper (mobile) ── */
    .chart-scroll {
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
      margin: 0 -1rem;
      padding: 0 1rem;
    }
    .chart-scroll svg { min-width: 340px; }

    @media (max-width: 1023px) {
      .mob-tabs { display: flex; }
    }
    @media (min-width: 1024px) {
      .mob-tabs { display: none !important; }
    }
  `],
  template: `
<div style="display:flex; min-height:100vh;">

  <!-- ═══════════════════════════════════════════
       SIDEBAR — desktop only
  ═══════════════════════════════════════════ -->
  <aside class="sidebar" style="display:none;" [style.display]="''" [class]="'sidebar'" [ngClass]="{'hidden': true, 'lg:flex': true}">
  </aside>

  <!-- Sidebar real para lg+ -->
  <aside style="width:220px; flex-shrink:0; background:var(--surface);
                border-right:1px solid var(--border); display:none; flex-direction:column;
                min-height:100vh;"
         class="lg:flex" [style.display]="isMd ? 'none' : undefined">
    <!-- Logo -->
    <div style="padding:1.25rem 1.25rem 1rem; border-bottom:1px solid var(--border);">
      <div style="display:flex; align-items:center; gap:8px;">
        <div style="width:32px; height:32px; border-radius:8px; background:var(--accent);
                    display:flex; align-items:center; justify-content:center;
                    font-weight:900; font-size:14px; color:#000; flex-shrink:0;">m</div>
        <span style="font-weight:700; font-size:14px; color:var(--text-1);">
          moestilos<span style="color:var(--accent);">.</span>
        </span>
      </div>
      <div style="font-size:11px; color:var(--text-3); margin-top:6px; font-family:var(--mono);">Panel Admin</div>
    </div>

    <!-- Nav -->
    <nav style="padding:.5rem .75rem; flex:1; display:flex; flex-direction:column; gap:2px;">
      <button class="nav-link" [class.active]="view==='dashboard'" (click)="view='dashboard'">
        <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
          <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
          <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
        </svg>
        Dashboard
      </button>
      <button class="nav-link" [class.active]="view==='analytics'" (click)="view='analytics'">
        <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
        </svg>
        Analíticas
      </button>
      <button class="nav-link" [class.active]="view==='projects'" (click)="view='projects'">
        <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
          <rect x="2" y="7" width="20" height="14" rx="2"/>
          <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/>
        </svg>
        Proyectos
      </button>
    </nav>

    <!-- Footer -->
    <div style="padding:1rem; border-top:1px solid var(--border);">
      <button (click)="logout()"
              style="width:100%; padding:8px 12px; border-radius:8px; font-size:12px;
                     font-weight:500; background:transparent; color:var(--text-3);
                     border:1px solid var(--border); cursor:pointer; transition:all .2s;"
              onmouseover="this.style.borderColor='rgba(239,68,68,.35)';this.style.color='#f87171'"
              onmouseout="this.style.borderColor='var(--border)';this.style.color='var(--text-3)'">
        Cerrar sesión
      </button>
    </div>
  </aside>

  <!-- ═══════════════════════════════════════════
       MAIN CONTENT
  ═══════════════════════════════════════════ -->
  <main style="flex:1; display:flex; flex-direction:column; min-width:0; min-height:100vh;">

    <!-- ── Top header ── -->
    <header style="display:flex; align-items:center; justify-content:space-between;
                   padding:0 1rem; height:56px; flex-shrink:0;
                   border-bottom:1px solid var(--border); background:var(--surface);
                   position:sticky; top:0; z-index:50;">
      <!-- Left: logo (mobile) + title (desktop) -->
      <div style="display:flex; align-items:center; gap:10px;">
        <!-- Logo móvil -->
        <div style="display:flex; align-items:center; gap:8px;" class="lg:hidden">
          <div style="width:28px; height:28px; border-radius:7px; background:var(--accent);
                      display:flex; align-items:center; justify-content:center;
                      font-weight:900; font-size:13px; color:#000; flex-shrink:0;">m</div>
          <span style="font-weight:700; font-size:14px; color:var(--text-1);">
            moestilos<span style="color:var(--accent);">.</span>
          </span>
        </div>
        <!-- Título desktop -->
        <div class="hidden lg:block">
          <div style="font-size:15px; font-weight:700; color:var(--text-1);">{{ viewTitle }}</div>
          <div style="font-size:11px; color:var(--text-3);">{{ today }}</div>
        </div>
      </div>

      <!-- Right -->
      <div style="display:flex; align-items:center; gap:8px;">
        <a href="/" target="_blank"
           style="font-size:12px; color:var(--text-3); font-family:var(--mono);
                  text-decoration:none; transition:color .2s; display:none;"
           class="lg:inline"
           onmouseover="this.style.color='var(--accent)'"
           onmouseout="this.style.color='var(--text-3)'">
          Ver web ↗
        </a>
        <button (click)="logout()"
                style="padding:7px 14px; border-radius:8px; font-size:12px; font-weight:600;
                       background:transparent; color:var(--text-3); border:1px solid var(--border);
                       cursor:pointer; transition:all .2s; white-space:nowrap;"
                class="lg:hidden"
                onmouseover="this.style.borderColor='rgba(239,68,68,.35)';this.style.color='#f87171'"
                onmouseout="this.style.borderColor='var(--border)';this.style.color='var(--text-3)'">
          Salir
        </button>
      </div>
    </header>

    <!-- ── Mobile section title ── -->
    <div class="lg:hidden" style="padding:.75rem 1rem .5rem;
                                   border-bottom:1px solid var(--border);
                                   background:var(--surface);">
      <div style="font-size:16px; font-weight:700; color:var(--text-1);">{{ viewTitle }}</div>
      <div style="font-size:11px; color:var(--text-3);">{{ today }}</div>
    </div>

    <!-- ── Scrollable content ── -->
    <div style="flex:1; overflow-y:auto; padding:1rem;
                padding-bottom:calc(80px + env(safe-area-inset-bottom, 0px));"
         class="sm:p-6 lg:p-8">

      <!-- Loading -->
      @if (loading) {
        <div style="display:flex; align-items:center; justify-content:center; height:50vh;">
          <div style="display:flex; flex-direction:column; align-items:center; gap:12px;">
            <svg style="animation:spin 1s linear infinite; color:var(--accent);"
                 width="28" height="28" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="2">
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
            </svg>
            <span style="font-size:12px; color:var(--text-3);">Cargando datos...</span>
          </div>
        </div>
      } @else {

        <!-- ════ DASHBOARD / ANALYTICS ════ -->
        @if (view === 'dashboard' || view === 'analytics') {

          <!-- KPI grid: 2 cols mobile, 4 cols desktop -->
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:.75rem; margin-bottom:1.25rem;"
               class="lg:grid-cols-4">
            @for (k of kpis; track k.label) {
              <div class="kpi">
                <!-- Icon row -->
                <div style="display:flex; align-items:center; justify-content:space-between;">
                  <div style="width:28px; height:28px; border-radius:8px; display:flex;
                               align-items:center; justify-content:center; flex-shrink:0;"
                       [style.background]="k.color + '18'"
                       [style.border]="'1px solid ' + k.color + '30'">
                    <svg width="13" height="13" fill="none" viewBox="0 0 24 24"
                         stroke="currentColor" stroke-width="2" [style.color]="k.color">
                      <path [attr.d]="k.icon"/>
                    </svg>
                  </div>
                </div>
                <!-- Value -->
                <div style="font-size:1.6rem; font-weight:900; line-height:1; tabular-nums:true;"
                     [style.color]="k.color">{{ k.value }}</div>
                <!-- Label + sub -->
                <div>
                  <div style="font-size:10px; font-weight:600; letter-spacing:.08em; text-transform:uppercase;
                               color:var(--text-3); font-family:var(--mono); margin-bottom:1px;">
                    {{ k.label }}
                  </div>
                  <div style="font-size:11px; color:var(--text-3);">{{ k.sub }}</div>
                </div>
              </div>
            }
          </div>

          <!-- Visits chart -->
          <div style="background:var(--surface); border:1px solid var(--border);
                       border-radius:12px; padding:1rem; margin-bottom:.75rem;">
            <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:1rem;">
              <div>
                <div style="font-size:13px; font-weight:700; color:var(--text-1);">Visitas</div>
                <div style="font-size:11px; color:var(--text-3);">Últimos 14 días</div>
              </div>
              <div style="font-size:1.3rem; font-weight:900; color:var(--accent);">
                {{ stats?.viewsThisWeek ?? 0 }}
                <span style="font-size:11px; font-weight:400; color:var(--text-3);">sem.</span>
              </div>
            </div>
            <div class="chart-scroll">
              <svg [attr.viewBox]="'0 0 ' + chartW + ' ' + chartH"
                   width="100%" [attr.height]="chartH" style="overflow:visible; display:block;">
                <defs>
                  <linearGradient id="vg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%"   stop-color="#f59e0b" stop-opacity="0.22"/>
                    <stop offset="100%" stop-color="#f59e0b" stop-opacity="0"/>
                  </linearGradient>
                </defs>
                @for (g of gridLines(stats?.viewsByDay ?? []); track g.y) {
                  <line [attr.x1]="chartPad.l" [attr.y1]="g.y"
                        [attr.x2]="chartW - chartPad.r" [attr.y2]="g.y"
                        stroke="rgba(255,255,255,0.04)" stroke-width="1"/>
                  <text [attr.x]="chartPad.l - 6" [attr.y]="g.y + 4"
                        text-anchor="end" font-size="9" fill="rgba(255,255,255,0.18)"
                        font-family="monospace">{{ g.label }}</text>
                }
                @if (areaPath(stats?.viewsByDay ?? [])) {
                  <path [attr.d]="areaPath(stats?.viewsByDay ?? [])" fill="url(#vg)"/>
                  <path [attr.d]="linePath(stats?.viewsByDay ?? [])"
                        fill="none" stroke="#f59e0b" stroke-width="1.8"
                        stroke-linecap="round" stroke-linejoin="round"/>
                  @for (pt of chartPoints(stats?.viewsByDay ?? []); track pt.x) {
                    <circle [attr.cx]="pt.x" [attr.cy]="pt.y" r="2.5"
                            fill="#f59e0b" stroke="#0a0a0a" stroke-width="1.5"/>
                  }
                }
                @for (pt of chartPoints(stats?.viewsByDay ?? []); track pt.x; let pi = $index) {
                  @if (pi % 2 === 0) {
                    <text [attr.x]="pt.x" [attr.y]="chartH - 2"
                          text-anchor="middle" font-size="8" fill="rgba(255,255,255,0.25)"
                          font-family="monospace">{{ pt.label }}</text>
                  }
                }
              </svg>
            </div>
          </div>

          <!-- CV downloads chart -->
          <div style="background:var(--surface); border:1px solid var(--border);
                       border-radius:12px; padding:1rem;">
            <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:1rem;">
              <div>
                <div style="font-size:13px; font-weight:700; color:var(--text-1);">Descargas CV</div>
                <div style="font-size:11px; color:var(--text-3);">Últimos 14 días</div>
              </div>
              <div style="font-size:1.3rem; font-weight:900; color:#67e8f9;">
                {{ stats?.totalCvDowns ?? 0 }}
                <span style="font-size:11px; font-weight:400; color:var(--text-3);">total</span>
              </div>
            </div>
            <div class="chart-scroll">
              <svg [attr.viewBox]="'0 0 ' + chartW + ' ' + (chartH * 0.7)"
                   width="100%" [attr.height]="chartH * 0.7" style="display:block;">
                @for (bar of cvBars(stats?.cvDownsByDay ?? []); track bar.x; let bi = $index) {
                  <rect [attr.x]="bar.x - bar.w / 2" [attr.y]="bar.y"
                        [attr.width]="bar.w" [attr.height]="bar.h"
                        rx="3" fill="#67e8f9" opacity="0.65"/>
                  @if (bi % 2 === 0) {
                    <text [attr.x]="bar.x" [attr.y]="chartH * 0.7 - 2"
                          text-anchor="middle" font-size="8" fill="rgba(255,255,255,0.22)"
                          font-family="monospace">{{ bar.label }}</text>
                  }
                }
              </svg>
            </div>
          </div>

        }

        <!-- ════ PROJECTS ════ -->
        @if (view === 'projects') {
          <app-projects-admin />
        }

      }
    </div>
  </main>
</div>

<!-- ═══════════════════════════════════════════
     MOBILE BOTTOM TAB BAR
═══════════════════════════════════════════ -->
<nav class="mob-tabs">
  <button class="mob-tab" [class.active]="view==='dashboard'" (click)="view='dashboard'">
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
      <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
      <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
    </svg>
    Dashboard
  </button>
  <button class="mob-tab" [class.active]="view==='analytics'" (click)="view='analytics'">
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
    </svg>
    Analíticas
  </button>
  <button class="mob-tab" [class.active]="view==='projects'" (click)="view='projects'">
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
      <rect x="2" y="7" width="20" height="14" rx="2"/>
      <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/>
    </svg>
    Proyectos
  </button>
</nav>

<style>
  @keyframes spin {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
</style>
  `,
})
export class AdminComponent implements OnInit {
  view: 'dashboard' | 'analytics' | 'projects' = 'dashboard';
  loading = true;
  stats: DashboardStats | null = null;

  readonly chartW   = 500;
  readonly chartH   = 140;
  readonly chartPad = { l: 32, r: 12, t: 12, b: 24 };

  /** Detecta si el viewport es menor de 1024px */
  get isMd(): boolean {
    return typeof window !== 'undefined' && window.innerWidth < 1024;
  }

  get today(): string {
    return new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
  }

  get viewTitle(): string {
    const map: Record<string, string> = { dashboard: 'Dashboard', analytics: 'Analíticas', projects: 'Proyectos' };
    return map[this.view] ?? 'Admin';
  }

  get kpis() {
    const s = this.stats;
    return [
      { label: 'Visitas',      value: s?.totalViews ?? 0,    sub: `${s?.viewsToday ?? 0} hoy`,  color: '#f59e0b', icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z' },
      { label: 'Sem. actual',  value: s?.viewsThisWeek ?? 0, sub: 'últimos 7 días',              color: '#c084fc', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
      { label: 'CV',           value: s?.totalCvDowns ?? 0,  sub: `${s?.cvDownsToday ?? 0} hoy`, color: '#67e8f9', icon: 'M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
      { label: 'Proyectos',    value: '→',                   sub: 'gestionar',                   color: '#4ade80', icon: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z' },
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

  // ── Chart helpers ────────────────────────────────────────────────────────

  private fill14(raw: { day: string; count: number }[]) {
    const map: Record<string, number> = {};
    raw.forEach(r => { map[r.day] = r.count; });
    const out = [];
    for (let i = 13; i >= 0; i--) {
      const d = new Date(Date.now() - i * 86400000);
      const k = d.toISOString().split('T')[0];
      out.push({ day: k, count: map[k] ?? 0 });
    }
    return out;
  }

  private coords(data: DayStat[]) {
    const filled = this.fill14(data);
    const max    = Math.max(...filled.map(d => d.count), 1);
    const { l, r, t, b } = this.chartPad;
    const iW = this.chartW - l - r;
    const iH = this.chartH - t - b;
    return filled.map((d, i) => ({
      x:     l + (i / (filled.length - 1)) * iW,
      y:     t + iH - (d.count / max) * iH,
      label: new Date(d.day + 'T00:00:00').toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit' }),
    }));
  }

  chartPoints(data: DayStat[]) { return this.coords(data); }

  linePath(data: DayStat[]): string {
    const pts = this.coords(data);
    return pts.reduce((acc, p, i) => {
      if (i === 0) return `M ${p.x} ${p.y}`;
      const prev = pts[i - 1];
      const mx = (prev.x + p.x) / 2;
      return acc + ` C ${mx} ${prev.y}, ${mx} ${p.y}, ${p.x} ${p.y}`;
    }, '');
  }

  areaPath(data: DayStat[]): string {
    const line = this.linePath(data);
    const pts  = this.coords(data);
    if (!pts.length) return '';
    const bot  = this.chartH - this.chartPad.b;
    return `${line} L ${pts[pts.length - 1].x} ${bot} L ${pts[0].x} ${bot} Z`;
  }

  gridLines(data: DayStat[]) {
    const max    = Math.max(...this.fill14(data).map(d => d.count), 1);
    const { t, b } = this.chartPad;
    const iH     = this.chartH - t - b;
    return [0, 1, 2, 3, 4].map(i => ({
      y:     t + iH - (i / 4) * iH,
      label: String(Math.round((i / 4) * max)),
    }));
  }

  cvBars(data: DayStat[]) {
    const filled = this.fill14(data);
    const max    = Math.max(...filled.map(d => d.count), 1);
    const h      = this.chartH * 0.7;
    const { l, r, b, t } = this.chartPad;
    const iW     = this.chartW - l - r;
    const iH     = h - t - b;
    const bw     = (iW / filled.length) * 0.5;
    return filled.map((d, i) => ({
      x:     l + (i / (filled.length - 1)) * iW,
      y:     t + iH - (d.count / max) * iH,
      h:     (d.count / max) * iH,
      w:     bw,
      label: new Date(d.day + 'T00:00:00').toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit' }),
    }));
  }

  private emptyStats(): DashboardStats {
    return { totalViews: 0, viewsToday: 0, viewsThisWeek: 0, totalCvDowns: 0, cvDownsToday: 0, viewsByDay: [], cvDownsByDay: [] };
  }
}
