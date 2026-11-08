import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevealDirective } from '../../shared/reveal.directive';

const STUDIO = 'https://aguilerastudio.dev';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  templateUrl: './services.component.html',
})
export class ServicesComponent {
  studio = STUDIO;
  promises = ['Precio cerrado, sin sorpresas', 'Respuesta en 24 h', 'Para pymes y autónomos'];
  services = [
    { title: 'Páginas web', desc: 'Rápidas, adaptadas al móvil y preparadas para que te encuentren en Google.', url: STUDIO },
    { title: 'Carta digital con QR', desc: 'La carta en el móvil del cliente, con fotos, alérgenos y varios idiomas.', url: STUDIO },
    { title: 'Apps móviles', desc: 'Para fidelizar clientes, gestionar citas o vender, en iOS y Android.', url: STUDIO },
    { title: 'Automatizaciones', desc: 'Facturas, avisos y clientes: que las tareas repetitivas se hagan solas.', url: STUDIO },
    { title: 'Auditoría web gratis', desc: 'Velocidad, SEO y seguridad de tu web, con lo que conviene mejorar.', url: STUDIO + '/auditoria-web-sevilla' },
  ];
}
