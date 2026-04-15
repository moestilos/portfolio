class Experience {
    render() {
        return `
        <section id="experience" class="section-pad">
            <div class="container-xl">
                <div class="reveal" style="text-align:center;margin-bottom:1rem;">
                    <span class="section-label">Trayectoria</span>
                </div>
                <h2 class="section-title reveal reveal-delay-1">Experiencia & Formación</h2>
                <p class="section-subtitle reveal reveal-delay-2">
                    Mi camino en el desarrollo web, desde la formación hasta los proyectos reales.
                </p>

                <div class="timeline-container">
                    <!-- Tabs -->
                    <div class="timeline-tabs reveal reveal-delay-3">
                        <button class="timeline-tab active" data-tab="all" onclick="switchTab(this,'all')">Todo</button>
                        <button class="timeline-tab" data-tab="work" onclick="switchTab(this,'work')">Experiencia</button>
                        <button class="timeline-tab" data-tab="edu" onclick="switchTab(this,'edu')">Educación</button>
                    </div>

                    <!-- Timeline -->
                    <div class="timeline reveal reveal-delay-4">

                        <!-- Freelance -->
                        <div class="timeline-item" data-type="work">
                            <div class="timeline-dot"></div>
                            <span class="timeline-badge badge-freelance">⚡ Freelance</span>
                            <div class="timeline-date">2025 — Presente</div>
                            <div class="timeline-title">Desarrollador Web Freelance</div>
                            <div class="timeline-company">Proyectos independientes · Remoto</div>
                            <p class="timeline-desc">
                                Desarrollo de proyectos web a medida para clientes de distintos sectores.
                                Diseño de interfaces, implementación de backends y despliegue en producción.
                                Atención personalizada y entregas en tiempo y forma.
                            </p>
                        </div>

                        <!-- CodeArts -->
                        <div class="timeline-item" data-type="work">
                            <div class="timeline-dot"></div>
                            <span class="timeline-badge badge-work">💼 Prácticas</span>
                            <div class="timeline-date">2025</div>
                            <div class="timeline-title">Desarrollador Full Stack — Prácticas</div>
                            <div class="timeline-company">CodeArts Solutions · Sevilla</div>
                            <p class="timeline-desc">
                                Desarrollo con Angular, Symfony, Tailwind CSS, Docker y PostgreSQL en proyectos reales para clientes.
                                Trabajo en equipo con metodologías ágiles y entornos de producción.
                            </p>
                        </div>

                        <!-- DAW -->
                        <div class="timeline-item" data-type="edu">
                            <div class="timeline-dot"></div>
                            <span class="timeline-badge badge-edu">🎓 Formación</span>
                            <div class="timeline-date">2023 — 2025</div>
                            <div class="timeline-title">Grado Superior DAW</div>
                            <div class="timeline-company">Cesur Sevilla · Desarrollo de Aplicaciones Web</div>
                            <p class="timeline-desc">
                                Formación integral en desarrollo web con Java, PHP, JavaScript, Spring Boot, Laravel y más.
                                Proyectos finales con arquitecturas modernas y buenas prácticas de desarrollo.
                            </p>
                        </div>

                        <!-- Guadaltech -->
                        <div class="timeline-item" data-type="work">
                            <div class="timeline-dot"></div>
                            <span class="timeline-badge badge-work">💼 Prácticas</span>
                            <div class="timeline-date">2022 — 2023</div>
                            <div class="timeline-title">Desarrollador Web — Prácticas</div>
                            <div class="timeline-company">Guadaltech Professional Cloud · Sevilla</div>
                            <p class="timeline-desc">
                                400h de formación práctica en desarrollo web y sistemas. Trabajo con WordPress, Odoo y Adobe Creative Cloud
                                en proyectos reales para la empresa y sus clientes.
                            </p>
                        </div>

                        <!-- SMR -->
                        <div class="timeline-item" data-type="edu">
                            <div class="timeline-dot"></div>
                            <span class="timeline-badge badge-edu">🎓 Formación</span>
                            <div class="timeline-date">2020 — 2022</div>
                            <div class="timeline-title">Grado Medio SMR</div>
                            <div class="timeline-company">Obicex Implika · Sistemas Microinformáticos y Redes</div>
                            <p class="timeline-desc">
                                Fundamentos de sistemas, redes y programación. Primeros pasos en WordPress y Odoo
                                durante las prácticas en empresa.
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </section>
        <div class="section-divider"></div>`;
    }
}

function switchTab(btn, type) {
    // Update active tab
    document.querySelectorAll('.timeline-tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');

    // Filter items
    document.querySelectorAll('.timeline-item').forEach(item => {
        if (type === 'all' || item.dataset.type === type) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
}
