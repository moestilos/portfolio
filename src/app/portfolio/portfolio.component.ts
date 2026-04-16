import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { HeroComponent } from '../components/hero/hero.component';
import { ProjectsComponent } from '../components/projects/projects.component';
import { AboutComponent } from '../components/about/about.component';
import { ServicesComponent } from '../components/services/services.component';
import { ExperienceComponent } from '../components/experience/experience.component';
import { ContactComponent } from '../components/contact/contact.component';
import { FooterComponent } from '../components/footer/footer.component';
import { SupabaseService } from '../services/supabase.service';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    HeroComponent,
    ProjectsComponent,
    AboutComponent,
    ServicesComponent,
    ExperienceComponent,
    ContactComponent,
    FooterComponent,
  ],
  template: `
    <!-- Animated background blobs -->
    <div class="bg-blob bg-blob-1" aria-hidden="true"></div>
    <div class="bg-blob bg-blob-2" aria-hidden="true"></div>
    <div class="bg-blob bg-blob-3" aria-hidden="true"></div>
    <div class="bg-blob bg-blob-4" aria-hidden="true"></div>

    <app-navbar />
    <main>
      <app-hero />
      <app-projects />
      <app-about />
      <app-services />
      <app-experience />
      <app-contact />
    </main>
    <app-footer />

    <!-- Back to top -->
    <button
      class="fixed bottom-8 right-8 z-50 w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300"
      [style.opacity]="showBackTop ? '1' : '0'"
      [style.pointerEvents]="showBackTop ? 'auto' : 'none'"
      style="background:var(--accent); color:#000;"
      (click)="scrollTop()"
      aria-label="Volver arriba">
      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
        <polyline points="18 15 12 9 6 15"/>
      </svg>
    </button>
  `,
})
export class PortfolioComponent implements OnInit {
  showBackTop = false;

  constructor(private supa: SupabaseService) {}

  ngOnInit(): void {
    // Registrar visita (una vez por sesión de navegador)
    this.supa.trackPageView();
    // Scroll reveal
    setTimeout(() => this.initScrollReveal(), 50);
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.showBackTop = window.scrollY > 400;
  }

  scrollTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  private initScrollReveal(): void {
    const els = Array.from(
      document.querySelectorAll<HTMLElement>('.reveal, .reveal-left, .reveal-right')
    );
    els.forEach(el => {
      if (el.getBoundingClientRect().top < window.innerHeight) {
        el.classList.add('visible');
      }
    });
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const el    = entry.target as HTMLElement;
            const delay = Number(el.dataset['delay'] ?? 0);
            setTimeout(() => el.classList.add('visible'), delay);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.04, rootMargin: '0px' }
    );
    els.forEach(el => {
      if (!el.classList.contains('visible')) observer.observe(el);
    });
  }
}
