import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

const CIRC = 2 * Math.PI * 72; // r = 72

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
})
export class SkillsComponent {
  hoveredLabel: string | null = null;

  filters = [
    { key: 'frontend', label: 'Frontend' },
    { key: 'backend',  label: 'Backend' },
    { key: 'devops',   label: 'DB & DevOps' },
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
    // Backend
    { name: 'Laravel',     icon: 'devicon-laravel-plain colored',        category: 'backend',  level: 85 },
    { name: 'PHP',         icon: 'devicon-php-plain colored',            category: 'backend',  level: 82 },
    { name: 'Symfony',     icon: 'devicon-symfony-original colored',     category: 'backend',  level: 75 },
    { name: 'NestJS',      icon: 'devicon-nestjs-plain colored',         category: 'backend',  level: 65 },
    { name: 'Java',        icon: 'devicon-java-plain colored',           category: 'backend',  level: 60 },
    // DB & DevOps
    { name: 'PostgreSQL',  icon: 'devicon-postgresql-plain colored',     category: 'devops',   level: 80 },
    { name: 'MySQL',       icon: 'devicon-mysql-plain colored',          category: 'devops',   level: 82 },
    { name: 'Docker',      icon: 'devicon-docker-plain colored',         category: 'devops',   level: 70 },
    { name: 'Git',         icon: 'devicon-git-plain colored',            category: 'devops',   level: 90 },
    { name: 'Linux',       icon: 'devicon-linux-plain',                  category: 'devops',   level: 72 },
    // Tools
    { name: 'Figma',       icon: 'devicon-figma-plain colored',          category: 'tools',    level: 78 },
    { name: 'Postman',     icon: 'devicon-postman-plain colored',        category: 'tools',    level: 85 },
    { name: 'VS Code',     icon: 'devicon-vscode-plain colored',         category: 'tools',    level: 95 },
    { name: 'Photoshop',   icon: 'devicon-photoshop-plain colored',      category: 'tools',    level: 65 },
    { name: 'Illustrator', icon: 'devicon-illustrator-plain colored',    category: 'tools',    level: 60 },
  ];

  chartData = [
    { label: 'Frontend',    value: 35, color: '#f59e0b' },
    { label: 'Backend',     value: 30, color: '#c084fc' },
    { label: 'DB & DevOps', value: 22, color: '#38bdf8' },
    { label: 'Herramientas',value: 13, color: '#4ade80' },
  ];

  get circumference(): number { return CIRC; }

  get chartSegments() {
    let offset = 0;
    const total = this.chartData.reduce((s, d) => s + d.value, 0);
    return this.chartData.map(d => {
      const dash = (d.value / total) * CIRC;
      const seg  = { label: d.label, value: d.value, color: d.color, dash, offset };
      offset += dash;
      return seg;
    });
  }

  getChartValue(label: string): number {
    return this.chartData.find(d => d.label === label)?.value ?? 0;
  }

  getSkillsByCategory(cat: string) {
    return this.skills.filter(s => s.category === cat);
  }

  /** 1-5 dots based on level */
  getLevelDots(level: number): number {
    if (level >= 90) return 5;
    if (level >= 80) return 4;
    if (level >= 70) return 3;
    if (level >= 60) return 2;
    return 1;
  }
}
