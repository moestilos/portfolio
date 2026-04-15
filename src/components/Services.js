class Services {
    render() {
        const services = [
            {
                icon: '🎨',
                title: 'Desarrollo Frontend',
                desc: 'Interfaces modernas, rápidas y accesibles. Diseño pixel-perfect adaptado a cualquier dispositivo con las últimas tecnologías.',
                tags: ['React', 'Angular', 'Tailwind CSS', 'TypeScript']
            },
            {
                icon: '⚙️',
                title: 'Desarrollo Full Stack',
                desc: 'Aplicaciones web completas desde el frontend hasta la base de datos, con APIs robustas y arquitecturas escalables.',
                tags: ['Laravel', 'Symfony', 'NestJS', 'PostgreSQL']
            },
            {
                icon: '🛒',
                title: 'E-commerce & Tiendas Online',
                desc: 'Desarrollo de tiendas online con carrito de compras, gestión de productos, pagos y panel de administración a medida.',
                tags: ['Laravel', 'MySQL', 'Tailwind', 'PHP']
            },
            {
                icon: '📱',
                title: 'Diseño Responsive & UI/UX',
                desc: 'Maquetación responsive y diseño de interfaces con Figma y Adobe XD, garantizando la mejor experiencia en cualquier pantalla.',
                tags: ['Figma', 'Adobe XD', 'CSS3', 'Responsive']
            },
            {
                icon: '🚀',
                title: 'Optimización & Performance',
                desc: 'Auditoría, optimización de rendimiento y mejoras de velocidad de carga. Core Web Vitals y SEO técnico.',
                tags: ['Performance', 'SEO', 'Lighthouse', 'Optimización']
            },
            {
                icon: '🐳',
                title: 'DevOps & Despliegue',
                desc: 'Configuración de entornos con Docker, despliegue en servidores y gestión de infraestructura para proyectos en producción.',
                tags: ['Docker', 'Linux', 'Git', 'Deploy']
            }
        ];

        return `
        <section id="services" class="section-pad">
            <div class="container-xl">
                <div class="reveal" style="text-align:center;margin-bottom:1rem;">
                    <span class="section-label">Servicios Freelance</span>
                </div>
                <h2 class="section-title reveal reveal-delay-1">¿En qué puedo ayudarte?</h2>
                <p class="section-subtitle reveal reveal-delay-2">
                    Ofrezco soluciones web completas y a medida para que tu negocio destaque en internet.
                    Trabajo de forma remota y me adapto a tus necesidades y plazos.
                </p>

                <div class="services-grid">
                    ${services.map((s, i) => `
                    <div class="service-card glass-card reveal reveal-delay-${(i % 3) + 1}">
                        <div class="service-icon">${s.icon}</div>
                        <h3 class="service-title">${s.title}</h3>
                        <p class="service-desc">${s.desc}</p>
                        <div class="service-tags">
                            ${s.tags.map(t => `<span class="service-tag">${t}</span>`).join('')}
                        </div>
                    </div>
                    `).join('')}
                </div>
            </div>
        </section>
        <div class="section-divider"></div>`;
    }
}
