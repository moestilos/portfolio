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
  dark = document.documentElement.dataset['theme'] === 'dark';

  // El tema inicial lo pone el script de index.html (preferencia guardada o la del sistema).
  toggleTheme(): void {
    this.dark = !this.dark;
    const theme = this.dark ? 'dark' : 'light';
    document.documentElement.dataset['theme'] = theme;
    try { localStorage.setItem('theme', theme); } catch { /* sin almacenamiento: solo dura esta visita */ }
  }

  links: NavLink[] = [
    { label: 'Proyectos',   href: '#projects' },
    { label: 'Trayectoria', href: '#experience' },
    { label: 'Stack',       href: '#skills' },
    { label: 'Servicios',   href: '#services' },
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
    const sections = ['hero', 'projects', 'experience', 'skills', 'services', 'contact'];
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
