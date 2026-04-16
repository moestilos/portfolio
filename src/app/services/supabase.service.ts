import { Injectable } from '@angular/core';
import { createClient, SupabaseClient, User, Session } from '@supabase/supabase-js';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

// ─── Tipos para el dashboard ─────────────────────────────────────────────────
export interface DayStat { day: string; count: number; }
export interface DashboardStats {
  totalViews:     number;
  viewsToday:     number;
  viewsThisWeek:  number;
  totalCvDowns:   number;
  cvDownsToday:   number;
  viewsByDay:     DayStat[];   // últimos 14 días
  cvDownsByDay:   DayStat[];   // últimos 14 días
}

@Injectable({ providedIn: 'root' })
export class SupabaseService {
  private supabase: SupabaseClient;

  // Stream del usuario actual — null = no autenticado
  user$ = new BehaviorSubject<User | null>(null);
  session$ = new BehaviorSubject<Session | null>(null);

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey,
      {
        auth: {
          autoRefreshToken: true,
          persistSession: true,
          detectSessionInUrl: true,
        }
      }
    );

    // Escuchar cambios de sesión
    this.supabase.auth.onAuthStateChange((_event, session) => {
      this.session$.next(session);
      this.user$.next(session?.user ?? null);
    });

    // Cargar sesión inicial
    this.supabase.auth.getSession().then(({ data }) => {
      this.session$.next(data.session);
      this.user$.next(data.session?.user ?? null);
    });
  }

  // ─── AUTH ──────────────────────────────────────────────────────────────────

  signInWithGoogle(): Promise<void> {
    return this.supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/admin`,
        queryParams: { hd: 'gmail.com', login_hint: environment.adminEmail },
      },
    }).then(() => undefined);
  }

  signOut(): Promise<void> {
    return this.supabase.auth.signOut().then(() => undefined);
  }

  getUser(): User | null {
    return this.user$.value;
  }

  isAdmin(): boolean {
    const email = this.user$.value?.email ?? '';
    return email === environment.adminEmail;
  }

  // ─── TRACKING (anónimo) ────────────────────────────────────────────────────

  /** Registra una visita; usa sessionStorage para contar solo 1 vez por sesión */
  async trackPageView(): Promise<void> {
    if (typeof window === 'undefined') return;
    const key = 'moe_pv';
    if (sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, '1');

    await this.supabase.from('page_views').insert({
      referrer: document.referrer || null,
      path: window.location.pathname,
    });
  }

  /** Registra descarga de CV */
  async trackCvDownload(): Promise<void> {
    await this.supabase.from('cv_downloads').insert({});
  }

  // ─── DASHBOARD DATA ────────────────────────────────────────────────────────

  async getDashboardStats(): Promise<DashboardStats> {
    const today = new Date().toISOString().split('T')[0];
    const weekAgo = new Date(Date.now() - 7 * 86400000).toISOString();

    const [totalViews, viewsToday, viewsThisWeek, totalCvDowns, cvDownsToday, viewsByDay, cvDownsByDay] =
      await Promise.all([
        // total visitas
        this.supabase.from('page_views').select('*', { count: 'exact', head: true }),
        // visitas hoy
        this.supabase.from('page_views').select('*', { count: 'exact', head: true })
          .gte('created_at', today),
        // visitas esta semana
        this.supabase.from('page_views').select('*', { count: 'exact', head: true })
          .gte('created_at', weekAgo),
        // total descargas CV
        this.supabase.from('cv_downloads').select('*', { count: 'exact', head: true }),
        // descargas CV hoy
        this.supabase.from('cv_downloads').select('*', { count: 'exact', head: true })
          .gte('created_at', today),
        // visitas por día (últimos 14)
        this.supabase.rpc('views_by_day', { days_back: 14 }),
        // cv por día (últimos 14)
        this.supabase.rpc('cv_by_day', { days_back: 14 }),
      ]);

    return {
      totalViews:    totalViews.count ?? 0,
      viewsToday:    viewsToday.count ?? 0,
      viewsThisWeek: viewsThisWeek.count ?? 0,
      totalCvDowns:  totalCvDowns.count ?? 0,
      cvDownsToday:  cvDownsToday.count ?? 0,
      viewsByDay:    viewsByDay.data ?? [],
      cvDownsByDay:  cvDownsByDay.data ?? [],
    };
  }
}
