import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
  <footer class="ft">
    <div class="wrap ft-in">
      <a class="brand" href="#hero">
        <img src="images/guillermo-cara.webp" alt="" width="32" height="32" loading="lazy">
        Guillermo Mateos <span>· Sevilla, España</span>
      </a>
      <nav aria-label="Pie">
        <a href="#projects">Proyectos</a>
        <a href="#skills">Stack</a>
        <a href="#experience">Trayectoria</a>
        <a href="#contact">Contacto</a>
        <a href="https://github.com/moestilos" target="_blank" rel="noopener">GitHub</a>
      </nav>
      <span>© {{ year }} Guillermo Mateos</span>
    </div>
  </footer>
  `,
})
export class FooterComponent {
  year = new Date().getFullYear();
}
