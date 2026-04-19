import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SupabaseService, DashboardStats, DayStat } from '../../services/supabase.service';
import { ProjectsAdminComponent } from './projects-admin.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, ProjectsAdminComponent],
  styles: [`
    /* ── Layout shell ── */
    .shell {
      display: flex;
      min-height: 100vh;
      background: #0a0a0a;
      color: var(--text-1);
      font-family: var(--font);
    }

    /* ── Sidebar ── */
    .sidebar {
      display: none; /* móvil: oculto */
      flex-direction: column;
      width: 220px;
      flex-shrink: 0;
      background: var(--surface);
      border-right: 1px solid var(--border);
      min-height: 100vh;
      position: sticky;
      top: 0;
      align-self: flex-start;
    }

    .sidebar-logo {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 1.25rem;
      border-bottom: 1px solid var(--border);
    }

    .logo-mark {
      width: 32px; height: 32px;
      border-radius: 8px;
      background: var(--accent);
      display: flex; align-items: center; justify-content: center;
      font-weight: 900; font-size: 14px; color: #000;
      flex-shrink: 0;
    }

    .sidebar-nav {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 2px;
      padding: .5rem .75rem;
    }

    .nav-btn {
      display: flex; align-items: center; gap: 10px;
      width: 100%; padding: 10px 16px;
      font-size: 13px; font-weight: 500;
      color: var(--text-3);
      background: none; border: none;
      border-radius: 8px;
      cursor: pointer;
      transition: color .15s, background .15s;
      text-align: left;
    }
    .nav-btn:hover { color: var(--text-1); background: rgba(255,255,255,.04); }
    .nav-btn.on    {
      color: var(--accent);
      background: rgba(var(--accent-rgb),.06);
      border-left: 2px solid var(--accent);
      padding-left: 14px;
    }

    .sidebar-foot {
      padding: 1rem;
      border-top: 1px solid var(--border);
    }

    .btn-logout-desk {
      width: 100%; padding: 8px; border-radius: 8px;
      font-size: 12px; font-weight: 500;
      background: transparent;
      color: var(--text-3);
      border: 1px solid var(--border);
      cursor: pointer;
      transition: border-color .15s, color .15s;
    }
    .btn-logout-desk:hover { border-color: rgba(239,68,68,.4); color: #f87171; }

    /* ── Main area ── */
    .main {
      flex: 1;
      display: flex;
      flex-direction: column;
      min-width: 0;
    }

    /* ── Top header ── */
    .topbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 56px;
      padding: 0 1.25rem;
      background: var(--surface);
      border-bottom: 1px solid var(--border);
      position: sticky;
      top: 0;
      z-index: 40;
      flex-shrink: 0;
    }

    .topbar-logo { display: flex; align-items: center; gap: 8px; }
    .topbar-title { display: none; }

    .topbar-right { display: flex; align-items: center; gap: 8px; }

    .link-web {
      display: none;
      font-size: 12px; color: var(--text-3);
      font-family: var(--mono); text-decoration: none;
      transition: color .15s;
    }
    .link-web:hover { color: var(--accent); }

    .btn-logout-mob {
      padding: 6px 14px; border-radius: 8px;
      font-size: 12px; font-weight: 600;
      background: transparent; color: var(--text-3);
      border: 1px solid var(--border);
      cursor: pointer; transition: border-color .15s, color .15s;
    }
    .btn-logout-mob:hover { border-color: rgba(239,68,68,.4); color: #f87171; }

    /* ── Section subtitle bar (mobile) ── */
    .mob-section {
      padding: .625rem 1.25rem;
      background: var(--surface);
      border-bottom: 1px solid var(--border);
    }

    /* ── Scrollable content ── */
    .content {
      flex: 1;
      overflow-y: auto;
      padding: 1.25rem;
      /* Room for the bottom tab bar on mobile */
      padding-bottom: calc(72px + env(safe-area-inset-bottom, 12px));
    }

    /* ── KPI grid ── */
    .kpi-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: .75rem;
      margin-bottom: 1.25rem;
    }

    .kpi-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: .875rem;
      display: flex; flex-direction: column; gap: .5rem;
      transition: border-color .2s;
    }
    .kpi-card:hover { border-color: rgba(var(--accent-rgb),.2); }

    .kpi-icon {
      width: 28px; height: 28px; border-radius: 8px;
      display: flex; align-items: center; justify-content: center;
    }

    .kpi-value {
      font-size: 1.75rem; font-weight: 900;
      line-height: 1; font-variant-numeric: tabular-nums;
    }

    .kpi-label {
      font-size: 10px; font-weight: 600;
      letter-spacing: .08em; text-transform: uppercase;
      color: var(--text-3); font-family: var(--mono);
    }

    .kpi-sub { font-size: 11px; color: var(--text-3); }

    /* ── Chart card ── */
    .chart-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 1rem;
      margin-bottom: .75rem;
    }

    .chart-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1rem;
    }

    .chart-scroll {
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
    }
    .chart-scroll svg { min-width: 320px; display: block; }

    /* ── Spinner ── */
    @keyframes spin { to { transform: rotate(360deg); } }
    .spinner {
      width: 24px; height: 24px;
      border: 2px solid rgba(var(--accent-rgb),.2);
      border-top-color: var(--accent);
      border-radius: 50%;
      animation: spin .8s linear infinite;
    }

    /* ── Bottom tab bar — mobile only ── */
    .bottom-tabs {
      position: fixed;
      bottom: 0; left: 0; right: 0;
      display: flex; /* shown on mobile by default */
      background: rgba(10,10,10,.96);
      border-top: 1px solid var(--border);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      z-index: 50;
      padding-bottom: env(safe-area-inset-bottom, 0);
    }

    .tab-btn {
      flex: 1; display: flex; flex-direction: column;
      align-items: center; justify-content: center;
      gap: 4px; padding: 10px 4px 8px;
      font-size: 10px; font-weight: 600;
      letter-spacing: .04em; text-transform: uppercase;
      color: var(--text-3);
      background: none; border: none;
      cursor: pointer; transition: color .15s;
    }
    .tab-btn.on { color: var(--accent); }

    /* ── Desktop overrides ── */
    @media (min-width: 1024px) {
      .sidebar      { display: flex; position: sticky; top: 0; height: 100vh; }
      .topbar-logo  { display: none; }
      .topbar-title { display: block; }
      .link-web     { display: inline; }
      .btn-logout-mob { display: none; }
      .mob-section  { display: none; }
      .bottom-tabs  { display: none; }
      .content      { padding-bottom: 1.5rem; }
      .kpi-grid     { grid-template-columns: repeat(4, 1fr); }
    }
  `],
  template: `
<div class="shell">

  <!-- ══════════════ SIDEBAR (desktop) ══════════════ -->
  <aside class="sidebar">
    <div class="sidebar-logo">
      <div class="logo-mark">m</div>
      <div>
        <div style="font-size:14px; font-weight:700; color:var(--text-1);">
          moestilos<span style="color:var(--accent);">.</span>
        </div>
        <div style="font-size:11px; color:var(--text-3); font-family:var(--mono);">Panel Admin</div>
      </div>
    </div>

    <nav class="sidebar-nav">
      <button class="nav-btn" [class.on]="view==='dashboard'" (click)="view='dashboard'">
        <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
          <rect x="3" y="3" width="7" height="7" rx="1"/>
          <rect x="14" y="3" width="7" height="7" rx="1"/>
          <rect x="3" y="14" width="7" height="7" rx="1"/>
          <rect x="14" y="14" width="7" height="7" rx="1"/>
        </svg>
        Dashboard
      </button>
      <button class="nav-btn" [class.on]="view==='analytics'" (click)="view='analytics'">
        <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
        </svg>
        Analíticas
      </button>
      <button class="nav-btn" [class.on]="view==='projects'" (click)="view='projects'">
        <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
          <rect x="2" y="7" width="20" height="14" rx="2"/>
          <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/>
        </svg>
        Proyectos
      </button>
    </nav>

    <div class="sidebar-foot">
      <button class="btn-logout-desk" (click)="logout()">Cerrar sesión</button>
    </div>
  </aside>

  <!-- ══════════════ MAIN ══════════════ -->
  <main class="main">

    <!-- Top bar -->
    <header class="topbar">
      <!-- Mobile: logo -->
      <div class="topbar-logo">
        <div class="logo-mark" style="width:28px;height:28px;font-size:13px;">m</div>
        <span style="font-size:14px;font-weight:700;color:var(--text-1);">
          moestilos<span style="color:var(--accent);">.</span>
        </span>
      </div>
      <!-- Desktop: page title + date -->
      <div class="topbar-title">
        <div style="font-size:15px;font-weight:700;color:var(--text-1);">{{ viewTitle }}</div>
        <div style="font-size:11px;color:var(--text-3);">{{ today }}</div>
      </div>

      <div class="topbar-right">
        <a class="link-web" href="/" target="_blank">Ver web ↗</a>
        <button class="btn-logout-mob" (click)="logout()">Salir</button>
      </div>
    </header>

    <!-- Mobile section title -->
    <div class="mob-section">
      <div style="font-size:16px;font-weight:700;color:var(--text-1);">{{ viewTitle }}</div>
      <div style="font-size:11px;color:var(--text-3);">{{ today }}</div>
    </div>

    <!-- ── Content ── -->
    <div class="content">

      <!-- Loading -->
      @if (loading) {
        <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;
                    height:50vh;gap:12px;">
          <div class="spinner"></div>
          <span style="font-size:12px;color:var(--text-3);">Cargando datos...</span>
        </div>
      } @else {

        <!-- ═════ DASHBOARD / ANALYTICS ═════ -->
        @if (view === 'dashboard' || view === 'analytics') {

          <!-- KPI cards -->
          <div class="kpi-grid">
            @for (k of kpis; track k.label) {
              <div class="kpi-card">
                <div class="kpi-icon"
                     [style.background]="k.color + '18'"
                     [style.border]="'1px solid ' + k.color + '25'">
                  <svg width="13" height="13" fill="none" viewBox="0 0 24 24"
                       stroke="currentColor" stroke-width="2" [style.color]="k.color">
                    <path [attr.d]="k.icon"/>
                  </svg>
                </div>
                <div class="kpi-value" [style.color]="k.color">{{ k.value }}</div>
                <div class="kpi-label">{{ k.label }}</div>
                <div class="kpi-sub">{{ k.sub }}</div>
              </div>
            }
          </div>

          <!-- Visits chart -->
          <div class="chart-card">
            <div class="chart-head">
              <div>
                <div style="font-size:13px;font-weight:700;color:var(--text-1);">Visitas</div>
                <div style="font-size:11px;color:var(--text-3);">Últimos 14 días</div>
              </div>
              <div style="font-size:1.4rem;font-weight:900;color:var(--accent);">
                {{ stats?.viewsThisWeek ?? 0 }}
                <span style="font-size:11px;font-weight:400;color:var(--text-3);">/ sem.</span>
              </div>
            </div>
            <div class="chart-scroll">
              <svg [attr.viewBox]="'0 0 ' + cW + ' ' + cH" width="100%" [attr.height]="cH"
                   style="overflow:visible;">
                <defs>
                  <linearGradient id="grad1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%"   stop-color="#f59e0b" stop-opacity=".22"/>
                    <stop offset="100%" stop-color="#f59e0b" stop-opacity="0"/>
                  </linearGradient>
                </defs>
                @for (g of gridLines(stats?.viewsByDay ?? []); track g.y) {
                  <line [attr.x1]="cPad.l" [attr.y1]="g.y"
                        [attr.x2]="cW - cPad.r" [attr.y2]="g.y"
                        stroke="rgba(255,255,255,.05)" stroke-width="1"/>
                  <text [attr.x]="cPad.l - 6" [attr.y]="g.y + 4"
                        text-anchor="end" font-size="9" fill="rgba(255,255,255,.2)"
                        font-family="monospace">{{ g.label }}</text>
                }
                @if (areaPath(stats?.viewsByDay ?? [])) {
                  <path [attr.d]="areaPath(stats?.viewsByDay ?? [])" fill="url(#grad1)"/>
                  <path [attr.d]="linePath(stats?.viewsByDay ?? [])"
                        fill="none" stroke="#f59e0b" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round"/>
                  @for (pt of chartPts(stats?.viewsByDay ?? []); track pt.x) {
                    <circle [attr.cx]="pt.x" [attr.cy]="pt.y" r="3"
                            fill="#f59e0b" stroke="#0a0a0a" stroke-width="1.5"/>
                  }
                }
                @for (pt of chartPts(stats?.viewsByDay ?? []); track pt.x; let i = $index) {
                  @if (i % 2 === 0) {
                    <text [attr.x]="pt.x" [attr.y]="cH - 3"
                          text-anchor="middle" font-size="8" fill="rgba(255,255,255,.22)"
                          font-family="monospace">{{ pt.label }}</text>
                  }
                }
              </svg>
            </div>
          </div>

          <!-- CV chart -->
          <div class="chart-card" style="margin-bottom:0;">
            <div class="chart-head">
              <div>
                <div style="font-size:13px;font-weight:700;color:var(--text-1);">Descargas CV</div>
                <div style="font-size:11px;color:var(--text-3);">Últimos 14 días</div>
              </div>
              <div style="font-size:1.4rem;font-weight:900;color:#67e8f9;">
                {{ stats?.totalCvDowns ?? 0 }}
                <span style="font-size:11px;font-weight:400;color:var(--text-3);">total</span>
              </div>
            </div>
            <div class="chart-scroll">
              <svg [attr.viewBox]="'0 0 ' + cW + ' ' + cHb" width="100%" [attr.height]="cHb"
                   style="display:block;">
                @for (b of cvBars(stats?.cvDownsByDay ?? []); track b.x; let i = $index) {
                  <rect [attr.x]="b.x - b.w/2" [attr.y]="b.y"
                        [attr.width]="b.w" [attr.height]="b.h"
                        rx="3" fill="#67e8f9" opacity=".6"/>
                  @if (i % 2 === 0) {
                    <text [attr.x]="b.x" [attr.y]="cHb - 3"
                          text-anchor="middle" font-size="8" fill="rgba(255,255,255,.22)"
                          font-family="monospace">{{ b.label }}</text>
                  }
                }
              </svg>
            </div>
          </div>
        }

        <!-- ═════ PROJECTS ═════ -->
        @if (view === 'projects') {
          <app-projects-admin />
        }

      }
    </div><!-- /content -->
  </main>
</div>

<!-- ══════════════ BOTTOM TABS (mobile) ══════════════ -->
<nav class="bottom-tabs">
  <button class="tab-btn" [class.on]="view==='dashboard'" (click)="view='dashboard'">
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24"
         stroke="currentColor" stroke-width="1.8">
      <rect x="3" y="3" width="7" height="7" rx="1"/>
      <rect x="14" y="3" width="7" height="7" rx="1"/>
      <rect x="3" y="14" width="7" height="7" rx="1"/>
      <rect x="14" y="14" width="7" height="7" rx="1"/>
    </svg>
    Dashboard
  </button>
  <button class="tab-btn" [class.on]="view==='analytics'" (click)="view='analytics'">
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24"
         stroke="currentColor" stroke-width="1.8">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
    </svg>
    Analíticas
  </button>
  <button class="tab-btn" [class.on]="view==='projects'" (click)="view='projects'">
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24"
         stroke="currentColor" stroke-width="1.8">
      <rect x="2" y="7" width="20" height="14" rx="2"/>
      <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/>
    </svg>
    Proyectos
  </button>
</nav>
  `,
})
export class AdminComponent implements OnInit {
  view: 'dashboard' | 'analytics' | 'projects' = 'dashboard';
  loading = true;
  stats: DashboardStats | null = null;

  /* Chart dimensions */
  readonly cW    = 500;
  readonly cH    = 140;
  readonly cHb   = 100;
  readonly cPad  = { l: 32, r: 12, t: 12, b: 22 };

  get today(): string {
    return new Date().toLocaleDateString('es-ES', {
      day: 'numeric', month: 'long', year: 'numeric',
    });
  }

  get viewTitle(): string {
    return ({ dashboard: 'Dashboard', analytics: 'Analíticas', projects: 'Proyectos' } as Record<string,string>)[this.view] ?? 'Admin';
  }

  get kpis() {
    const s = this.stats;
    return [
      {
        label: 'Visitas',
        value: s?.totalViews ?? 0,
        sub:   `${s?.viewsToday ?? 0} hoy`,
        color: '#f59e0b',
        icon:  'M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z',
      },
      {
        label: 'Esta semana',
        value: s?.viewsThisWeek ?? 0,
        sub:   'últimos 7 días',
        color: '#c084fc',
        icon:  'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
      },
      {
        label: 'Descargas CV',
        value: s?.totalCvDowns ?? 0,
        sub:   `${s?.cvDownsToday ?? 0} hoy`,
        color: '#67e8f9',
        icon:  'M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
      },
      {
        label: 'Proyectos',
        value: '↗',
        sub:   'gestionar',
        color: '#4ade80',
        icon:  'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z',
      },
    ];
  }

  constructor(private supa: SupabaseService, private router: Router) {}

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

  // ── Chart helpers ─────────────────────────────────────────────────────────

  private fill14(raw: { day: string; count: number }[]) {
    const map: Record<string, number> = {};
    raw.forEach(r => (map[r.day] = r.count));
    const out = [];
    for (let i = 13; i >= 0; i--) {
      const d = new Date(Date.now() - i * 86_400_000);
      const k = d.toISOString().split('T')[0];
      out.push({ day: k, count: map[k] ?? 0 });
    }
    return out;
  }

  private coords(data: DayStat[]) {
    const filled = this.fill14(data);
    const max    = Math.max(...filled.map(d => d.count), 1);
    const { l, r, t, b } = this.cPad;
    const iW = this.cW - l - r;
    const iH = this.cH - t - b;
    return filled.map((d, i) => ({
      x:     l + (i / (filled.length - 1)) * iW,
      y:     t + iH - (d.count / max) * iH,
      label: new Date(d.day + 'T00:00:00').toLocaleDateString('es-ES', {
        day: '2-digit', month: '2-digit',
      }),
    }));
  }

  chartPts(data: DayStat[]) { return this.coords(data); }

  linePath(data: DayStat[]): string {
    const pts = this.coords(data);
    return pts.reduce((acc, p, i) => {
      if (i === 0) return `M ${p.x} ${p.y}`;
      const prev = pts[i - 1];
      const mx   = (prev.x + p.x) / 2;
      return `${acc} C ${mx} ${prev.y}, ${mx} ${p.y}, ${p.x} ${p.y}`;
    }, '');
  }

  areaPath(data: DayStat[]): string {
    const line = this.linePath(data);
    const pts  = this.coords(data);
    if (!pts.length) return '';
    const bot  = this.cH - this.cPad.b;
    return `${line} L ${pts.at(-1)!.x} ${bot} L ${pts[0].x} ${bot} Z`;
  }

  gridLines(data: DayStat[]) {
    const max    = Math.max(...this.fill14(data).map(d => d.count), 1);
    const { t, b } = this.cPad;
    const iH     = this.cH - t - b;
    return [0, 1, 2, 3, 4].map(i => ({
      y:     t + iH - (i / 4) * iH,
      label: String(Math.round((i / 4) * max)),
    }));
  }

  cvBars(data: DayStat[]) {
    const filled = this.fill14(data);
    const max    = Math.max(...filled.map(d => d.count), 1);
    const { l, r, b, t } = this.cPad;
    const iW = this.cW - l - r;
    const iH = this.cHb - t - b;
    const bw = (iW / filled.length) * 0.5;
    return filled.map((d, i) => ({
      x:     l + (i / (filled.length - 1)) * iW,
      y:     t + iH - (d.count / max) * iH,
      h:     (d.count / max) * iH,
      w:     bw,
      label: new Date(d.day + 'T00:00:00').toLocaleDateString('es-ES', {
        day: '2-digit', month: '2-digit',
      }),
    }));
  }

  private emptyStats(): DashboardStats {
    return {
      totalViews: 0, viewsToday: 0, viewsThisWeek: 0,
      totalCvDowns: 0, cvDownsToday: 0,
      viewsByDay: [], cvDownsByDay: [],
    };
  }
}
