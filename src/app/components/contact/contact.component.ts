import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevealDirective } from '../../shared/reveal.directive';

const EMAIL = 'guillermo.moestilos@gmail.com';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  templateUrl: './contact.component.html',
})
export class ContactComponent {
  email = EMAIL;
  channels = [
    { icon: 'mail', label: 'Email', value: EMAIL, href: 'mailto:' + EMAIL, external: false },
    { icon: 'linkedin', label: 'LinkedIn', value: 'Perfil profesional', href: 'https://www.linkedin.com/in/guillermo-mateos-de-los-santos-aguilera-02427b260/', external: true },
    { icon: 'github', label: 'GitHub', value: 'github.com/moestilos', href: 'https://github.com/moestilos', external: true },
    { icon: 'web', label: 'Estudio', value: 'aguilerastudio.dev', href: 'https://aguilerastudio.dev', external: true },
  ];
}
