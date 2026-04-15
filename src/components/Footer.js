class Footer {
    render() {
        const year = new Date().getFullYear();
        return `
        <footer>
            <div class="footer-inner">
                <div class="footer-logo">
                    moestilos
                    <span style="color:var(--purple-main)">.</span>
                </div>

                <div class="footer-social">
                    <!-- LinkedIn -->
                    <a href="https://www.linkedin.com/in/guillermo-mateos-de-los-santos-aguilera-02427b260/"
                       target="_blank" rel="noopener" class="footer-social-link" aria-label="LinkedIn">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"/>
                            <path d="M8 11l0 5"/><path d="M8 8l0 .01"/>
                            <path d="M12 16l0 -5"/><path d="M16 16v-3a2 2 0 0 0 -4 0"/>
                        </svg>
                    </a>
                    <!-- GitHub -->
                    <a href="https://github.com/moestilos" target="_blank" rel="noopener" class="footer-social-link" aria-label="GitHub">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5"/>
                        </svg>
                    </a>
                    <!-- Email -->
                    <a href="mailto:guillermo.moestilos@gmail.com" class="footer-social-link" aria-label="Email">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                            <polyline points="22,6 12,13 2,6"/>
                        </svg>
                    </a>
                </div>

                <p class="footer-copy">
                    © ${year} Guillermo Mateos Santos Aguilera · Diseñado y desarrollado con 💜
                </p>
            </div>
        </footer>`;
    }
}
