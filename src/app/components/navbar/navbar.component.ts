import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

interface NavLink {
  label: string;
  href: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  scrolled = false;
  mobileOpen = false;
  activeSection = 'hero';

  links: NavLink[] = [
    { label: 'Proyectos',   href: '#projects' },
    { label: 'Sobre mí',    href: '#about' },
    { label: 'Servicios',   href: '#services' },
    { label: 'Experiencia', href: '#experience' },
    { label: 'Contacto',    href: '#contact' },
  ];

  ngOnInit(): void {
    this.checkScroll();
    this.trackActiveSection();
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.checkScroll();
    this.trackActiveSection();
  }

  private checkScroll(): void {
    this.scrolled = window.scrollY > 50;
  }

  /** Highlights nav link based on current scroll position */
  private trackActiveSection(): void {
    const sections = ['hero', 'projects', 'skills', 'about', 'services', 'experience', 'contact'];
    let current = 'hero';
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el && window.scrollY >= el.offsetTop - 120) current = id;
    });
    this.activeSection = current;
  }

  navigate(e: Event, href: string): void {
    e.preventDefault();
    const id = href.replace('#', '');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    this.mobileOpen = false;
  }

  isActive(href: string): boolean {
    return this.activeSection === href.replace('#', '');
  }
}
