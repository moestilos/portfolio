import { ApplicationConfig } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';

// withHashLocation() no es necesario si netlify.toml tiene los redirects correctos
const routes: Routes = [
  { path: '',            component: PortfolioComponent },
  { path: 'admin/login', component: LoginComponent },
  { path: 'admin',       component: AdminComponent, canActivate: [authGuard] },
  { path: '**',          redirectTo: '' },
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideRouter(routes),
  ],
};
