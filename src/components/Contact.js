class Contact {
    render() {
        return `
        <section id="contact" class="section-pad">
            <div class="container-xl">
                <div class="reveal" style="text-align:center;margin-bottom:1rem;">
                    <span class="section-label">Contacto</span>
                </div>
                <h2 class="section-title reveal reveal-delay-1">¿Tienes un proyecto?</h2>

                <div class="contact-card glass-card reveal reveal-delay-2">
                    <h3 class="contact-title">
                        Trabajemos juntos 🚀
                        <br>
                        <span class="gradient-text">Convirtamos tu idea en realidad</span>
                    </h3>
                    <p class="contact-desc">
                        Estoy disponible para proyectos freelance, colaboraciones y oportunidades laborales.
                        Ya sea una web desde cero, una mejora de tu proyecto actual o consultoría técnica, ¡hablemos!
                    </p>

                    <div class="contact-links">
                        <a href="mailto:guillermo.moestilos@gmail.com" class="contact-link-item">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                                <polyline points="22,6 12,13 2,6"/>
                            </svg>
                            guillermo.moestilos@gmail.com
                        </a>
                        <a href="https://www.linkedin.com/in/guillermo-mateos-de-los-santos-aguilera-02427b260/" target="_blank" rel="noopener" class="contact-link-item">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"/>
                                <path d="M8 11l0 5"/><path d="M8 8l0 .01"/>
                                <path d="M12 16l0 -5"/><path d="M16 16v-3a2 2 0 0 0 -4 0"/>
                            </svg>
                            LinkedIn
                        </a>
                        <a href="https://github.com/moestilos" target="_blank" rel="noopener" class="contact-link-item">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5"/>
                            </svg>
                            github.com/moestilos
                        </a>
                    </div>

                    <div style="display:flex;justify-content:center;gap:1rem;flex-wrap:wrap;">
                        <a href="mailto:guillermo.moestilos@gmail.com" class="btn-primary">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                                <polyline points="22,6 12,13 2,6"/>
                            </svg>
                            Enviar email
                        </a>
                        <a href="/Guillermo%20Mateos%20Santos%20CV.pdf" download class="btn-secondary">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                                <polyline points="14 2 14 8 20 8"/>
                                <line x1="12" y1="18" x2="12" y2="12"/>
                                <polyline points="9 15 12 18 15 15"/>
                            </svg>
                            Descargar CV
                        </a>
                    </div>

                    <div style="margin-top:2rem;">
                        <div class="contact-availability">
                            <span class="avail-dot"></span>
                            Disponible ahora mismo para nuevos proyectos
                        </div>
                    </div>
                </div>
            </div>
        </section>`;
    }
}
