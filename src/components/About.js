class About {
    render() {
        return `
        <section id="hero" class="section-pad">
            <div class="hero-glow"></div>

            <div class="hero-content container-xl">
                <!-- Text -->
                <div class="hero-text">
                    <div class="hero-badge reveal">
                        <span class="badge-dot"></span>
                        Disponible para proyectos Freelance
                    </div>

                    <h1 class="hero-name reveal reveal-delay-1">
                        Guillermo<br>
                        <span class="gradient-text">Mateos Santos</span>
                    </h1>

                    <div class="hero-role-wrapper reveal reveal-delay-2">
                        <span class="hero-role-prefix">Soy </span>
                        <span class="typewriter" id="typewriter-text"></span>
                        <span class="cursor-blink"></span>
                    </div>

                    <p class="hero-desc reveal reveal-delay-3">
                        Desarrollador Web Freelance con experiencia en la creación de aplicaciones modernas,
                        escalables y centradas en la experiencia de usuario.
                        Especializado en <strong style="color:var(--purple-light)">Frontend</strong> y <strong style="color:var(--purple-light)">Full Stack</strong>,
                        con pasión por el detalle y el diseño.
                    </p>

                    <div class="hero-stats reveal reveal-delay-4">
                        <div class="hero-stat">
                            <div class="hero-stat-num">2+</div>
                            <div class="hero-stat-label">Años de experiencia</div>
                        </div>
                        <div class="hero-stat">
                            <div class="hero-stat-num">10+</div>
                            <div class="hero-stat-label">Tecnologías</div>
                        </div>
                        <div class="hero-stat">
                            <div class="hero-stat-num">100%</div>
                            <div class="hero-stat-label">Dedicación</div>
                        </div>
                    </div>

                    <div class="hero-actions reveal reveal-delay-5">
                        <a href="#contact" class="btn-primary">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                            </svg>
                            Hablemos
                        </a>
                        <a href="#projects" class="btn-secondary">
                            Ver proyectos
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <polyline points="9 18 15 12 9 6"/>
                            </svg>
                        </a>
                        <a href="/Guillermo%20Mateos%20Santos%20CV.pdf" download class="btn-secondary">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><polyline points="9 15 12 18 15 15"/>
                            </svg>
                            CV
                        </a>
                    </div>

                    <div class="flex flex-wrap gap-3 mt-6 reveal reveal-delay-6" style="display:flex;flex-wrap:wrap;gap:0.75rem;margin-top:1.5rem;">
                        <span class="info-chip">📍 Sevilla, España</span>
                        <span class="info-chip">🚗 Carné B</span>
                        <span class="info-chip">💼 Freelance</span>
                        <span class="info-chip">🌍 Remoto</span>
                    </div>
                </div>

                <!-- Image -->
                <div class="hero-image-wrapper reveal-right">
                    <div class="hero-image-orbit"></div>
                    <div class="hero-image-orbit-2"></div>

                    <img src="public/images/perfilsin.png" alt="Guillermo Mateos Santos" class="hero-avatar" />

                    <!-- Floating tech badges -->
                    <div class="orbit-badge">
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" alt="React" />
                    </div>
                    <div class="orbit-badge">
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angularjs/angularjs-plain.svg" alt="Angular" />
                    </div>
                    <div class="orbit-badge">
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg" alt="Laravel" />
                    </div>
                    <div class="orbit-badge">
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" alt="TypeScript" />
                    </div>
                </div>
            </div>
        </section>`;
    }
}
