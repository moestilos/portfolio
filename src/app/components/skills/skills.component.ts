import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  templateUrl: './skills.component.html',
})
export class SkillsComponent {
  filters = [
    { key: 'frontend', label: 'Frontend' },
    { key: 'backend',  label: 'Backend' },
    { key: 'ai',       label: 'IA & LLMs' },
    { key: 'auto',     label: 'Automatización y Datos' },
    { key: 'devops',   label: 'BBDD & DevOps' },
    { key: 'tools',    label: 'Herramientas' },
  ];

  skills = [
    // Frontend
    { name: 'Angular',     icon: 'devicon-angular-plain colored',        category: 'frontend', level: 90 },
    { name: 'React',       icon: 'devicon-react-original colored',       category: 'frontend', level: 75 },
    { name: 'TypeScript',  icon: 'devicon-typescript-plain colored',     category: 'frontend', level: 88 },
    { name: 'JavaScript',  icon: 'devicon-javascript-plain colored',     category: 'frontend', level: 90 },
    { name: 'HTML5',       icon: 'devicon-html5-plain colored',          category: 'frontend', level: 95 },
    { name: 'CSS3',        icon: 'devicon-css3-plain colored',           category: 'frontend', level: 90 },
    { name: 'Tailwind',    icon: 'devicon-tailwindcss-plain colored',    category: 'frontend', level: 92 },
    { name: 'Next.js',     icon: 'devicon-nextjs-plain',                 category: 'frontend', level: 85 },
    // Backend
    { name: 'Python',      icon: 'devicon-python-plain colored',         category: 'backend',  level: 85 },
    { name: 'FastAPI',     icon: 'devicon-fastapi-plain colored',        category: 'backend',  level: 78 },
    { name: 'Node.js',     icon: 'devicon-nodejs-plain colored',         category: 'backend',  level: 80 },
    { name: 'Laravel',     icon: 'devicon-laravel-plain colored',        category: 'backend',  level: 85 },
    { name: 'PHP',         icon: 'devicon-php-plain colored',            category: 'backend',  level: 82 },
    { name: 'Symfony',     icon: 'devicon-symfony-original colored',     category: 'backend',  level: 75 },
    { name: 'NestJS',      icon: 'devicon-nestjs-plain colored',         category: 'backend',  level: 65 },
    { name: 'Java · Spring', icon: 'devicon-spring-plain colored',       category: 'backend',  level: 60 },
    // AI & LLMs
    { name: 'Claude API',       icon: '',                                category: 'ai', level: 85 },
    { name: 'Claude Code',      icon: '',                                category: 'ai', level: 90 },
    { name: 'Gemini API',       icon: '',                                category: 'ai', level: 80 },
    { name: 'OpenAI API',       icon: '',                                category: 'ai', level: 72 },
    { name: 'Ollama (local)',   icon: '',                                category: 'ai', level: 70 },
    { name: 'MCP servers',      icon: '',                                category: 'ai', level: 72 },
    { name: 'Prompt Engineering',icon: '',                               category: 'ai', level: 85 },
    { name: 'OCR · PaddleOCR',  icon: '',                                category: 'ai', level: 68 },
    // Automation & Data
    { name: 'n8n',            icon: '',                                        category: 'auto', level: 82 },
    { name: 'Make',           icon: '',                                        category: 'auto', level: 72 },
    { name: 'Playwright',     icon: 'devicon-playwright-plain colored',        category: 'auto', level: 78 },
    { name: 'Web Scraping',   icon: '',                                        category: 'auto', level: 85 },
    { name: 'Pandas',         icon: 'devicon-pandas-original',                 category: 'auto', level: 78 },
    { name: 'HubSpot API',    icon: '',                                        category: 'auto', level: 72 },
    { name: 'Odoo (XML-RPC)', icon: '',                                        category: 'auto', level: 65 },
    { name: 'REST APIs',      icon: '',                                        category: 'auto', level: 85 },
    // DB & DevOps
    { name: 'PostgreSQL',  icon: 'devicon-postgresql-plain colored',     category: 'devops',   level: 82 },
    { name: 'MySQL',       icon: 'devicon-mysql-plain colored',          category: 'devops',   level: 82 },
    { name: 'Supabase',    icon: 'devicon-supabase-plain colored',       category: 'devops',   level: 75 },
    { name: 'Docker',      icon: 'devicon-docker-plain colored',         category: 'devops',   level: 75 },
    { name: 'GitHub Actions', icon: 'devicon-githubactions-plain colored', category: 'devops', level: 70 },
    { name: 'Vercel',      icon: 'devicon-vercel-original',              category: 'devops',   level: 85 },
    { name: 'Git',         icon: 'devicon-git-plain colored',            category: 'devops',   level: 90 },
    { name: 'Linux',       icon: 'devicon-linux-plain',                  category: 'devops',   level: 72 },
    // Tools
    { name: 'Figma',       icon: 'devicon-figma-plain colored',          category: 'tools',    level: 78 },
    { name: 'Postman',     icon: 'devicon-postman-plain colored',        category: 'tools',    level: 85 },
    { name: 'VS Code',     icon: 'devicon-vscode-plain colored',         category: 'tools',    level: 95 },
    { name: 'Photoshop',   icon: 'devicon-photoshop-plain colored',      category: 'tools',    level: 65 },
    { name: 'Illustrator', icon: 'devicon-illustrator-plain colored',    category: 'tools',    level: 60 },
  ];

  active = this.filters[0].key;

  get activeIndex(): number { return this.filters.findIndex(f => f.key === this.active); }

  get current() { return this.skills.filter(s => s.category === this.active); }

  /** 1-5 barras según el nivel */
  dots(level: number): number {
    if (level >= 90) return 5;
    if (level >= 80) return 4;
    if (level >= 70) return 3;
    if (level >= 60) return 2;
    return 1;
  }
}
