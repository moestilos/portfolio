class Projects {
    render() {
        const projects = [
            {
                name: 'FunkMoes',
                num: '01',
                image: 'public/images/pro1.png',
                description: 'Tienda online de camisetas con carrito de compras, autenticación de usuarios, pasarela de pagos y panel de administración completo. Diseño moderno y experiencia de usuario cuidada al detalle.',
                technologies: ['Laravel', 'PHP', 'Tailwind CSS', 'MySQL', 'PhpMyAdmin'],
                type: 'E-commerce · Full Stack',
                color: '#a855f7'
            },
            {
                name: 'Vuela21',
                num: '02',
                image: 'public/images/vuela21o.png',
                description: 'Aplicación de gestión de paquetes de transporte, desarrollada durante las prácticas en CodeArts SL para un cliente real. Arquitectura robusta con API REST, interfaz responsive y experiencia de usuario moderna.',
                technologies: ['Angular', 'TypeScript', 'Tailwind CSS', 'Symfony', 'Node.js', 'Postman'],
                type: 'Gestión · Full Stack',
                color: '#818cf8'
            }
        ];

        return `
        <section id="projects" class="section-pad">
            <div class="container-xl">
                <div class="reveal" style="text-align:center;margin-bottom:1rem;">
                    <span class="section-label">Proyectos</span>
                </div>
                <h2 class="section-title reveal reveal-delay-1">Mi trabajo reciente</h2>
                <p class="section-subtitle reveal reveal-delay-2">
                    Proyectos reales construidos con tecnologías modernas, enfocados en la calidad, la performance y la experiencia de usuario.
                </p>

                <div class="projects-grid">
                    ${projects.map((p, i) => this.renderProject(p, i)).join('')}
                </div>
            </div>
        </section>
        <div class="section-divider"></div>`;
    }

    renderProject(project, index) {
        return `
        <div class="project-card glass-card ${index % 2 !== 0 ? 'reverse' : ''} reveal">
            <div class="project-image-wrap">
                <img src="${project.image}" alt="${project.name}" loading="lazy" />
                <div class="project-image-overlay">
                    <span style="color:white;font-weight:700;font-size:1rem;text-shadow:0 2px 10px rgba(0,0,0,0.5)">
                        Ver proyecto
                    </span>
                </div>
            </div>

            <div class="project-info">
                <div class="project-num">${project.num} — ${project.type}</div>
                <h3 class="project-title">${project.name}</h3>
                <p class="project-desc">${project.description}</p>
                <div class="project-tech-list">
                    ${project.technologies.map(t => `<span class="tech-tag">${t}</span>`).join('')}
                </div>
                <div style="display:flex;gap:1rem;flex-wrap:wrap;align-items:center;">
                    <a href="#contact" class="project-link">
                        Solicitar proyecto similar
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="9 18 15 12 9 6"/>
                        </svg>
                    </a>
                </div>
            </div>
        </div>`;
    }
}
