import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { HeroComponent } from '../components/hero/hero.component';
import { ProjectsComponent } from '../components/projects/projects.component';
import { ServicesComponent } from '../components/services/services.component';
import { AboutComponent } from '../components/about/about.component';
import { ExperienceComponent } from '../components/experience/experience.component';
import { ContactComponent } from '../components/contact/contact.component';
import { FooterComponent } from '../components/footer/footer.component';
import { SupabaseService } from '../services/supabase.service';

const BACK_TOP_FROM_PX = 600;

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    HeroComponent,
    ProjectsComponent,
    ServicesComponent,
    AboutComponent,
    ExperienceComponent,
    ContactComponent,
    FooterComponent,
  ],
  template: `
    <app-navbar />
    <main>
      <app-hero />
      <app-projects />
      <app-services />
      <app-about />
      <app-experience />
      <app-contact />
    </main>
    <app-footer />

    <button class="top-btn" [class.off]="!showBackTop" type="button" (click)="scrollTop()" aria-label="Volver arriba" [attr.tabindex]="showBackTop ? null : -1">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 15l6-6 6 6"/></svg>
    </button>
  `,
})
export class PortfolioComponent implements OnInit {
  showBackTop = false;

  constructor(private supa: SupabaseService) {}

  ngOnInit(): void {
    // Cuenta la visita (una vez por sesión del navegador)
    this.supa.trackPageView();
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.showBackTop = window.scrollY > BACK_TOP_FROM_PX;
  }

  scrollTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
