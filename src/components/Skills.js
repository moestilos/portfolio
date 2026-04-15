class Skills {
    constructor() {
        this.allSkills = [
            // Frontend
            { name: 'HTML5',      icon: 'html5/html5-original.svg',            cat: 'frontend' },
            { name: 'CSS3',       icon: 'css3/css3-original.svg',              cat: 'frontend' },
            { name: 'JavaScript', icon: 'javascript/javascript-plain.svg',     cat: 'frontend' },
            { name: 'TypeScript', icon: 'typescript/typescript-original.svg',  cat: 'frontend' },
            { name: 'React',      icon: 'react/react-original.svg',            cat: 'frontend' },
            { name: 'Angular',    icon: 'angularjs/angularjs-plain.svg',       cat: 'frontend' },
            { name: 'Tailwind',   icon: 'tailwindcss/tailwindcss-original.svg',cat: 'frontend' },
            // Backend
            { name: 'PHP',        icon: 'php/php-original.svg',               cat: 'backend' },
            { name: 'Laravel',    icon: 'laravel/laravel-original.svg',        cat: 'backend' },
            { name: 'Symfony',    icon: 'symfony/symfony-original.svg',        cat: 'backend' },
            { name: 'NestJS',     icon: 'nestjs/nestjs-original.svg',          cat: 'backend' },
            { name: 'Java',       icon: 'java/java-original.svg',              cat: 'backend' },
            // DB & DevOps
            { name: 'PostgreSQL', icon: 'postgresql/postgresql-plain.svg',     cat: 'devops' },
            { name: 'MySQL',      icon: 'mysql/mysql-original.svg',            cat: 'devops' },
            { name: 'Docker',     icon: 'docker/docker-plain.svg',             cat: 'devops' },
            { name: 'Git',        icon: 'git/git-original.svg',                cat: 'devops' },
            { name: 'Linux',      icon: 'linux/linux-original.svg',            cat: 'devops' },
            // Tools
            { name: 'VS Code',    icon: 'vscode/vscode-original.svg',          cat: 'tools' },
            { name: 'Postman',    icon: 'postman/postman-plain.svg',            cat: 'tools' },
            { name: 'Figma',      icon: 'figma/figma-original.svg',            cat: 'tools' },
            { name: 'Photoshop',  icon: 'photoshop/photoshop-original.svg',    cat: 'tools' },
            { name: 'Illustrator',icon: 'illustrator/illustrator-line.svg',    cat: 'tools' },
            { name: 'Xd',         icon: 'xd/xd-original.svg',                 cat: 'tools' },
            { name: 'Eclipse',    icon: 'eclipse/eclipse-original.svg',        cat: 'tools' },
            { name: 'GitHub',     icon: null,                                  cat: 'tools', customSvg: true },
        ];
    }

    render() {
        const categories = [
            { key: 'all',      label: 'Todos' },
            { key: 'frontend', label: 'Frontend' },
            { key: 'backend',  label: 'Backend' },
            { key: 'devops',   label: 'DB & DevOps' },
            { key: 'tools',    label: 'Herramientas' },
        ];

        return `
        <section id="skills" class="section-pad">
            <div class="container-xl">
                <div class="reveal" style="text-align:center;margin-bottom:1rem;">
                    <span class="section-label">Stack Tecnológico</span>
                </div>
                <h2 class="section-title reveal reveal-delay-1">Mis Tecnologías</h2>
                <p class="section-subtitle reveal reveal-delay-2">
                    Herramientas y frameworks que domino para construir soluciones robustas, escalables y con gran UX.
                </p>

                <div class="skills-wrapper">
                    <!-- Category filter -->
                    <div class="skills-categories reveal reveal-delay-3">
                        ${categories.map(c => `
                            <button class="skills-cat-btn ${c.key === 'all' ? 'active' : ''}"
                                data-cat="${c.key}"
                                onclick="filterSkills(this, '${c.key}')">
                                ${c.label}
                            </button>
                        `).join('')}
                    </div>

                    <!-- Skills grid -->
                    <div class="skills-grid reveal reveal-delay-4" id="skills-grid">
                        ${this.allSkills.map(s => this.renderSkill(s)).join('')}
                    </div>
                </div>
            </div>
        </section>
        <div class="section-divider"></div>`;
    }

    renderSkill(skill) {
        const urls = {
            'Laravel': 'https://laravel.com', 'Angular': 'https://angular.io',
            'HTML5': 'https://developer.mozilla.org/docs/Web/HTML',
            'CSS3': 'https://developer.mozilla.org/docs/Web/CSS',
            'Tailwind': 'https://tailwindcss.com', 'React': 'https://reactjs.org',
            'Symfony': 'https://symfony.com', 'PostgreSQL': 'https://www.postgresql.org',
            'MySQL': 'https://www.mysql.com', 'Docker': 'https://www.docker.com',
            'JavaScript': 'https://developer.mozilla.org/docs/Web/JavaScript',
            'TypeScript': 'https://www.typescriptlang.org', 'Java': 'https://www.oracle.com/java',
            'VS Code': 'https://code.visualstudio.com', 'NestJS': 'https://nestjs.com',
            'GitHub': 'https://github.com/moestilos', 'Git': 'https://git-scm.com',
            'Linux': 'https://www.linux.org', 'Postman': 'https://www.postman.com',
            'Illustrator': 'https://www.adobe.com/products/illustrator.html',
            'Photoshop': 'https://www.adobe.com/products/photoshop.html',
            'Figma': 'https://www.figma.com', 'Xd': 'https://www.adobe.com/products/xd.html',
            'Eclipse': 'https://www.eclipse.org', 'PHP': 'https://www.php.net'
        };

        const iconHtml = skill.customSvg
            ? `<svg class="w-9 h-9" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:36px;height:36px;color:#c4b5fd">
                <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5"/>
               </svg>`
            : `<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${skill.icon}" alt="${skill.name}" style="width:36px;height:36px;object-fit:contain;" loading="lazy" onerror="this.style.display='none'" />`;

        return `
        <a href="${urls[skill.name] || '#'}" target="_blank" rel="noopener noreferrer"
            class="skill-card"
            data-cat="${skill.cat}">
            ${iconHtml}
            <span>${skill.name}</span>
        </a>`;
    }
}

function filterSkills(btn, cat) {
    // Active button
    document.querySelectorAll('.skills-cat-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // Filter cards
    document.querySelectorAll('.skill-card').forEach(card => {
        if (cat === 'all' || card.dataset.cat === cat) {
            card.style.opacity = '1';
            card.style.transform = '';
            card.style.pointerEvents = '';
        } else {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.85)';
            card.style.pointerEvents = 'none';
        }
    });
}
