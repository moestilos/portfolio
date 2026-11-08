import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  templateUrl: './about.component.html',
})
export class AboutComponent {
  go(e: Event): void {
    e.preventDefault();
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  }

  values = [
    { title: 'Orientado a resultados', desc: 'Me centro en resolver el problema real, no solo en escribir código.' },
    { title: 'Atención al detalle', desc: 'Desde una UI al píxel hasta la arquitectura del backend.' },
    { title: 'Comunicación clara', desc: 'Trabajo transparente — siempre sabes en qué punto está el proyecto.' },
    { title: 'Entrega a tiempo', desc: 'Me adapto a tus plazos sin sacrificar la calidad.' },
  ];

  facts = [
    { label: 'Ubicación',       value: 'Sevilla, España' },
    { label: 'Modalidad',       value: 'Remoto / Híbrido / Presencial' },
    { label: 'Enfoque',         value: 'Full Stack · Automatización · IA' },
    { label: 'Idiomas',         value: 'Español nativo · Inglés B2' },
    { label: 'Disponibilidad',  value: 'Inmediata' },
    { label: 'Carnet',          value: 'Tipo B' },
  ];

  stats = [
    { num: '2+',   label: 'Años exp.' },
    { num: '10+',  label: 'Proyectos' },
    { num: '100%', label: 'Compromiso' },
  ];
}
