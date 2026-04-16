import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen flex items-center justify-center"
         style="background:var(--bg); font-family:var(--font);">

      <!-- Card -->
      <div class="flex flex-col items-center gap-8 p-10 rounded-2xl w-full"
           style="max-width:400px; background:var(--surface); border:1px solid var(--border);">

        <!-- Logo -->
        <div class="flex flex-col items-center gap-2">
          <div class="w-12 h-12 rounded-xl flex items-center justify-center text-black font-black text-xl"
               style="background:var(--accent);">m</div>
          <span class="text-lg font-bold" style="color:var(--text-1);">
            moestilos<span style="color:var(--accent)">.</span>
          </span>
          <span class="text-xs text-center" style="color:var(--text-3);">
            Panel de administración
          </span>
        </div>

        <!-- Separator -->
        <div class="w-full h-px" style="background:var(--border);"></div>

        <!-- Error message -->
        @if (error) {
          <div class="w-full px-4 py-3 rounded-lg text-xs text-center"
               style="background:rgba(239,68,68,0.08); border:1px solid rgba(239,68,68,0.2); color:#f87171;">
            {{ error }}
          </div>
        }

        <!-- Google login -->
        <button
          class="w-full flex items-center justify-center gap-3 py-3 px-5 rounded-xl font-semibold text-sm transition-all duration-200"
          style="background:var(--surface-2); border:1px solid var(--border); color:var(--text-1); cursor:pointer; outline:none;"
          [disabled]="loading"
          (click)="loginWithGoogle()"
          onmouseover="this.style.borderColor='rgba(245,158,11,0.4)'; this.style.background='rgba(245,158,11,0.04)'"
          onmouseout="this.style.borderColor='var(--border)'; this.style.background='var(--surface-2)'">

          @if (loading) {
            <!-- Spinner -->
            <svg class="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="2" style="color:var(--accent);">
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
            </svg>
            <span>Conectando...</span>
          } @else {
            <!-- Google icon -->
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span>Continuar con Google</span>
          }
        </button>

        <p class="text-xs text-center" style="color:var(--text-3);">
          Acceso restringido · Solo el propietario
        </p>
      </div>
    </div>
  `,
})
export class LoginComponent implements OnInit {
  loading = false;
  error   = '';

  constructor(
    private supa: SupabaseService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    // Si ya está autenticado, redirigir al admin
    this.supa.user$.subscribe(user => {
      if (user && this.supa.isAdmin()) {
        this.router.navigate(['/admin']);
      }
    });
  }

  async loginWithGoogle(): Promise<void> {
    this.loading = true;
    this.error   = '';
    try {
      await this.supa.signInWithGoogle();
    } catch (e: any) {
      this.error   = e?.message ?? 'Error al iniciar sesión';
      this.loading = false;
    }
  }
}
