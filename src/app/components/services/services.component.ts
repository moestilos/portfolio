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
      title: 'Websites & Landing Pages',
      problem: 'Your site gets visits but no customers?',
      desc: 'I design and build modern, fast websites optimised for conversion — from a high-impact landing page to a full corporate site.',
      tags: ['Angular', 'Next.js', 'Tailwind CSS', 'Technical SEO'],
      highlight: true,
    },
    {
      title: 'Custom Web Applications',
      problem: 'Need an app that does not exist off the shelf?',
      desc: 'Full-stack web applications built around your actual business process: solid APIs, admin panels, dashboards and integrations.',
      tags: ['Angular', 'Next.js', 'Laravel', 'FastAPI', 'PostgreSQL'],
      highlight: true,
    },
    {
      title: 'AI Integrations & LLM Automation',
      problem: 'Manual work that an AI could handle in seconds?',
      desc: 'I integrate LLMs into real products: document and invoice extraction, classification, conversational bots with tool use, and OCR pipelines. Local models with Ollama when data privacy matters.',
      tags: ['Claude API', 'Gemini API', 'OpenAI API', 'Ollama', 'MCP', 'OCR'],
      highlight: true,
    },
    {
      title: 'Automation & CRM/ERP Migrations',
      problem: 'Losing hours on repetitive tasks or stuck with a CRM that does not fit?',
      desc: 'I automate processes with n8n and Python (scraping, data syncs, reporting) and migrate CRMs/ERPs between platforms such as HubSpot and Odoo, keeping the full history and the relationships between records.',
      tags: ['n8n', 'Make', 'Python', 'Odoo', 'HubSpot', 'Playwright'],
      highlight: true,
    },
    {
      title: 'Web Scraping & Data Pipelines',
      problem: 'Data locked inside a platform you cannot export from?',
      desc: 'Large-scale extraction and normalisation pipelines: async requests, rate limiting, retries and structured logging, delivered as clean Excel/CSV/DB ready to import. Proven on a 17,517-product catalogue with 99.98% coverage.',
      tags: ['Python', 'Playwright', 'httpx async', 'Pandas', 'ETL'],
    },
    {
      title: 'E-commerce & Online Stores',
      problem: 'Want to sell online without relying on generic templates?',
      desc: 'Custom online stores with cart, payment gateway, inventory management and admin panel. Built to sell, not just to look good.',
      tags: ['Laravel', 'PHP', 'Stripe', 'MySQL', 'Tailwind'],
    },
    {
      title: 'APIs & Integrations',
      problem: 'Your tools do not talk to each other?',
      desc: 'I design and implement scalable REST APIs and connect your systems to third-party services (CRMs, ERPs, payments, notifications).',
      tags: ['REST API', 'JWT', 'OAuth', 'Webhooks', 'Postman'],
    },
    {
      title: 'Performance & Optimisation',
      problem: 'Slow site losing visitors?',
      desc: 'Technical audit, Core Web Vitals improvements, image and code optimisation. Measurable Lighthouse results that feed straight into SEO and conversion.',
      tags: ['Core Web Vitals', 'Lighthouse', 'Technical SEO', 'Optimisation'],
    },
    {
      title: 'DevOps & Deployment',
      problem: 'Your project only exists on localhost?',
      desc: 'Docker environments, CI/CD pipelines and production deployments with sensible security and scalability practices.',
      tags: ['Docker', 'GitHub Actions', 'Linux', 'Vercel', 'Railway'],
    },
  ];
}
