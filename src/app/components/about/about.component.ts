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
    { title: 'Results-driven', desc: 'I focus on solving the real problem, not just writing code.' },
    { title: 'Attention to detail', desc: 'From pixel-perfect UI to backend architecture.' },
    { title: 'Clear communication', desc: 'Transparent work — you always know where the project stands.' },
    { title: 'On-time delivery', desc: 'I adapt to your deadlines without sacrificing quality.' },
  ];

  facts = [
    { label: 'Location',     value: 'Seville, Spain' },
    { label: 'Relocation',   value: 'Gdańsk, PL · Oct 2026' },
    { label: 'Work mode',    value: 'On-site / Hybrid / Remote' },
    { label: 'Focus',        value: 'Full Stack · Automation · AI' },
    { label: 'Languages',    value: 'Spanish native · English B2' },
    { label: 'Availability', value: 'Immediate' },
    { label: 'Driving licence', value: 'Category B' },
  ];

  stats = [
    { num: '2+',   label: 'Years exp.' },
    { num: '10+',  label: 'Projects' },
    { num: '100%', label: 'Commitment' },
  ];
}
