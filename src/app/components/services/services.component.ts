import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Service {
  title: string;
  problem: string;
  desc: string;
  tags: string[];
  highlight?: boolean;
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services.component.html',
})
export class ServicesComponent {
  services: Service[] = [
    {
      title: 'Webs y Landing Pages',
      problem: '¿Tu web no convierte visitas en clientes?',
      desc: 'Diseño y desarrollo páginas web modernas, rápidas y optimizadas para conversión. Desde una landing page de alto impacto hasta un site corporativo completo.',
      tags: ['Angular', 'React', 'Tailwind CSS', 'SEO técnico'],
      highlight: true,
    },
    {
      title: 'Aplicaciones Web a Medida',
      problem: '¿Necesitas una app que no existe en el mercado?',
      desc: 'Desarrollo aplicaciones web full stack adaptadas exactamente a tu proceso de negocio. APIs robustas, paneles de administración, dashboards e integraciones.',
      tags: ['Angular', 'Laravel', 'Symfony', 'NestJS', 'PostgreSQL'],
      highlight: true,
    },
    {
      title: 'E-commerce & Tiendas Online',
      problem: '¿Quieres vender online sin depender de plantillas genéricas?',
      desc: 'Tiendas online a medida con carrito, pasarela de pagos, gestión de inventario y panel de admin. Diseñadas para vender, no solo para verse bien.',
      tags: ['Laravel', 'PHP', 'Stripe', 'MySQL', 'Tailwind'],
    },
    {
      title: 'APIs & Integraciones',
      problem: '¿Tus herramientas no se hablan entre sí?',
      desc: 'Diseño e implemento APIs REST escalables y conecto tus sistemas con servicios de terceros (CRMs, ERPs, pagos, notificaciones, etc.).',
      tags: ['REST API', 'JWT', 'OAuth', 'Webhooks', 'Postman'],
    },
    {
      title: 'Optimización & Performance',
      problem: '¿Tu web carga lenta y pierde visitantes?',
      desc: 'Auditoría técnica, mejora de Core Web Vitals, optimización de imágenes y código. Resultados medibles en Lighthouse que impactan directamente en SEO y conversión.',
      tags: ['Core Web Vitals', 'Lighthouse', 'SEO técnico', 'Optimización'],
    },
    {
      title: 'DevOps & Despliegue',
      problem: '¿Tu proyecto existe solo en local?',
      desc: 'Configuro entornos Docker, CI/CD pipelines y despliego tu aplicación en producción con buenas prácticas de seguridad y escalabilidad.',
      tags: ['Docker', 'Linux', 'Git', 'Deploy', 'VPS'],
    },
  ];
}
