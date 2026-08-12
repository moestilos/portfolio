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
      problem: '¿Tu web recibe visitas pero no clientes?',
      desc: 'Diseño y desarrollo webs modernas y rápidas optimizadas para convertir — desde una landing de alto impacto hasta una web corporativa completa.',
      tags: ['Angular', 'Next.js', 'Tailwind CSS', 'SEO técnico'],
      highlight: true,
    },
    {
      title: 'Aplicaciones web a medida',
      problem: '¿Necesitas una app que no existe en el mercado?',
      desc: 'Aplicaciones web full-stack construidas alrededor de tu proceso de negocio real: APIs sólidas, paneles de administración, dashboards e integraciones.',
      tags: ['Angular', 'Next.js', 'Laravel', 'FastAPI', 'PostgreSQL'],
      highlight: true,
    },
    {
      title: 'Integraciones con IA y automatización con LLMs',
      problem: '¿Trabajo manual que una IA podría hacer en segundos?',
      desc: 'Integro LLMs en productos reales: extracción de documentos y facturas, clasificación, bots conversacionales con uso de herramientas y pipelines de OCR. Modelos locales con Ollama cuando la privacidad de los datos importa.',
      tags: ['Claude API', 'Gemini API', 'OpenAI API', 'Ollama', 'MCP', 'OCR'],
      highlight: true,
    },
    {
      title: 'Automatización y migraciones CRM/ERP',
      problem: '¿Horas perdidas en tareas repetitivas o atrapado en un CRM que no encaja?',
      desc: 'Automatizo procesos con n8n y Python (scraping, sincronización de datos, informes) y migro CRMs/ERPs entre plataformas como HubSpot y Odoo, conservando todo el histórico y las relaciones entre registros.',
      tags: ['n8n', 'Make', 'Python', 'Odoo', 'HubSpot', 'Playwright'],
      highlight: true,
    },
    {
      title: 'Web Scraping y pipelines de datos',
      problem: '¿Datos encerrados en una plataforma de la que no puedes exportar?',
      desc: 'Pipelines de extracción y normalización a gran escala: peticiones asíncronas, rate limiting, reintentos y logging estructurado, entregados como Excel/CSV/BBDD limpios y listos para importar. Probado en un catálogo de 17.517 productos con un 99,98% de cobertura.',
      tags: ['Python', 'Playwright', 'httpx async', 'Pandas', 'ETL'],
    },
    {
      title: 'E-commerce y tiendas online',
      problem: '¿Quieres vender online sin depender de plantillas genéricas?',
      desc: 'Tiendas online a medida con carrito, pasarela de pago, gestión de inventario y panel de administración. Hechas para vender, no solo para verse bien.',
      tags: ['Laravel', 'PHP', 'Stripe', 'MySQL', 'Tailwind'],
    },
    {
      title: 'APIs e integraciones',
      problem: '¿Tus herramientas no se hablan entre ellas?',
      desc: 'Diseño e implemento APIs REST escalables y conecto tus sistemas con servicios de terceros (CRMs, ERPs, pagos, notificaciones).',
      tags: ['REST API', 'JWT', 'OAuth', 'Webhooks', 'Postman'],
    },
    {
      title: 'Rendimiento y optimización',
      problem: '¿Web lenta que pierde visitantes?',
      desc: 'Auditoría técnica, mejora de Core Web Vitals, optimización de imágenes y código. Resultados medibles en Lighthouse que repercuten directamente en SEO y conversión.',
      tags: ['Core Web Vitals', 'Lighthouse', 'SEO técnico', 'Optimización'],
    },
    {
      title: 'DevOps y despliegue',
      problem: '¿Tu proyecto solo existe en localhost?',
      desc: 'Entornos con Docker, pipelines CI/CD y despliegues en producción con buenas prácticas de seguridad y escalabilidad.',
      tags: ['Docker', 'GitHub Actions', 'Linux', 'Vercel', 'Railway'],
    },
  ];
}
