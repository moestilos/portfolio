import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-screen flex items-center justify-center"
         style="background:var(--bg); font-family:var(--font);">

      <div class="flex flex-col items-center gap-6 p-10 rounded-2xl w-full"
           style="max-width:400px; background:var(--surface); border:1px solid var(--border);">

        <!-- Logo -->
        <div class="flex flex-col items-center gap-2">
          <div class="w-12 h-12 rounded-xl flex items-center justify-center text-black font-black text-xl"
               style="background:var(--accent);">m</div>
          <span class="text-lg font-bold" style="color:var(--text-1);">
            moestilos<span style="color:var(--accent)">.</span>
          </span>
          <span class="text-xs" style="color:var(--text-3);">Panel de administración</span>
        </div>

        <div class="w-full h-px" style="background:var(--border);"></div>

        <!-- Error -->
        @if (error) {
          <div class="w-full px-4 py-3 rounded-lg text-xs text-center"
               style="background:rgba(239,68,68,0.08); border:1px solid rgba(239,68,68,0.2); color:#f87171;">
            {{ error }}
          </div>
        }

        <!-- Login inputs -->
        <div class="w-full flex flex-col gap-3">
          <input
            type="text"
            [(ngModel)]="username"
            placeholder="Usuario"
            (keyup.enter)="login()"
            class="w-full px-4 py-3 rounded-xl text-sm outline-none"
            style="background:var(--surface-2); border:1px solid var(--border); color:var(--text-1);"
          />
          <input
            type="password"
            [(ngModel)]="password"
            placeholder="Contraseña"
            (keyup.enter)="login()"
            class="w-full px-4 py-3 rounded-xl text-sm outline-none"
            style="background:var(--surface-2); border:1px solid var(--border); color:var(--text-1);"
          />

          <button
            (click)="login()"
            [disabled]="loading"
            class="w-full py-3 px-5 rounded-xl font-semibold text-sm transition-all duration-200"
            style="background:var(--accent); color:#000; cursor:pointer; border:none;">
            {{ loading ? 'Entrando...' : 'Entrar' }}
          </button>
        </div>

        <p class="text-xs text-center" style="color:var(--text-3);">
          Acceso restringido · Solo el propietario
        </p>
      </div>
    </div>
  `,
})
export class LoginComponent {
  username = '';
  password = '';
  loading  = false;
  error    = '';

  constructor(private router: Router) {}

  login(): void {
    this.error = '';
    if (!this.username || !this.password) { this.error = 'Rellena usuario y contraseña'; return; }
    this.loading = true;

    if (this.username === environment.adminUser && this.password === environment.adminPassword) {
      sessionStorage.setItem('moe_admin', 'true');
      this.router.navigate(['/admin']);
    } else {
      this.error   = 'Usuario o contraseña incorrectos';
      this.loading = false;
    }
  }
}
