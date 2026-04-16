import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
  <footer style="border-top:1px solid var(--border);">
    <div class="container-main py-8 flex flex-col sm:flex-row items-center justify-between gap-4">

      <div class="flex items-center gap-2 text-sm font-bold" style="color:var(--text-1);">
        Guillermo<span style="color:var(--accent)">.</span>
        <span class="text-xs font-normal ml-1" style="color:var(--text-3);">
          moestilos · Sevilla, España
        </span>
      </div>

      <div class="flex gap-5 text-xs" style="color:var(--text-3); font-family:var(--mono);">
        <a href="#projects" class="hover:text-white transition-colors" style="color:var(--text-3)">Proyectos</a>
        <a href="#skills"   class="hover:text-white transition-colors" style="color:var(--text-3)">Skills</a>
        <a href="#contact"  class="hover:text-white transition-colors" style="color:var(--text-3)">Contacto</a>
      </div>

      <p class="text-xs" style="color:var(--text-3); font-family:var(--mono);">
        © {{ year }} Guillermo Mateos
      </p>
    </div>
  </footer>
  `,
})
export class FooterComponent {
  year = new Date().getFullYear();
}
