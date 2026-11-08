import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { HeroComponent } from '../components/hero/hero.component';
import { ProjectsComponent } from '../components/projects/projects.component';
import { AboutComponent } from '../components/about/about.component';
import { SkillsComponent } from '../components/skills/skills.component';
import { ServicesComponent } from '../components/services/services.component';
import { ExperienceComponent } from '../components/experience/experience.component';
import { ContactComponent } from '../components/contact/contact.component';
import { FooterComponent } from '../components/footer/footer.component';
import { SupabaseService } from '../services/supabase.service';
import { RevealDirective } from '../shared/reveal.directive';

const BACK_TOP_FROM_PX = 600;

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [
    CommonModule,
    RevealDirective,
    NavbarComponent,
    HeroComponent,
    ProjectsComponent,
    AboutComponent,
    SkillsComponent,
    ServicesComponent,
    ExperienceComponent,
    ContactComponent,
    FooterComponent,
  ],
  template: `
    <app-navbar />
    <main>
      <app-hero />
      <app-projects />
      <app-about />
      <app-skills />
      <app-services />
      <app-experience />
      <app-contact />

      <section class="wrap" style="margin-top:96px" aria-labelledby="end-t">
        <div class="end" reveal>
          <div class="end-dots" aria-hidden="true">
            @for (d of endDots; track $index) {<i></i>}
          </div>
          <div>
            <h2 id="end-t">¿Tienes un proyecto o una oferta? Hablemos.</h2>
            <p>Te respondo en menos de 24 h. Sevilla, en remoto para toda España.</p>
          </div>
          <a class="btn btn-p" href="#contact" (click)="toContact($event)">Escribirme
            <svg class="go" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg></a>
        </div>
      </section>
    </main>
    <app-footer />

    <button class="top-btn" [class.off]="!showBackTop" type="button" (click)="scrollTop()" aria-label="Volver arriba" [attr.tabindex]="showBackTop ? null : -1">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 15l6-6 6 6"/></svg>
    </button>
  `,
})
export class PortfolioComponent implements OnInit {
  showBackTop = false;
  endDots = Array(24);

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

  toContact(e: Event): void {
    e.preventDefault();
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  }
}
