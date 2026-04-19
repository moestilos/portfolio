import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
})
export class AboutComponent {
  values = [
    { title: 'Orientado a resultados', desc: 'Me enfoco en resolver el problema real, no solo escribir código.' },
    { title: 'Atención al detalle', desc: 'Desde pixel-perfect hasta arquitectura de backend.' },
    { title: 'Comunicación clara', desc: 'Trabajo transparente — siempre sabrás el estado del proyecto.' },
    { title: 'Entrega en plazo', desc: 'Me adapto a tus tiempos sin sacrificar calidad.' },
  ];

  facts = [
    { label: 'Ubicación',    value: 'Sevilla, España' },
    { label: 'Modalidad',    value: 'Remoto / Presencial' },
    { label: 'Especialidad', value: 'Full Stack' },
    { label: 'Disponibilidad', value: 'Inmediata' },
    { label: 'Carné',        value: 'Tipo B' },
  ];

  stats = [
    { num: '1+',   label: 'Años exp.' },
    { num: '4',    label: 'Proyectos' },
    { num: '100%', label: 'Compromiso' },
  ];
}
