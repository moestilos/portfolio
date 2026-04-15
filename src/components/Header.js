class Header {
    render() {
        const navItems = [
            { label: 'Sobre mí',    href: '#about' },
            { label: 'Servicios',   href: '#services' },
            { label: 'Experiencia', href: '#experience' },
            { label: 'Proyectos',   href: '#projects' },
            { label: 'Skills',      href: '#skills' },
        ];

        return `
        <header id="main-header">
            <div class="header-inner">
                <a href="#" class="logo">
                    moestilos
                    <span class="logo-dot"></span>
                </a>

                <button class="hamburger" id="hamburger" aria-label="Menú" aria-expanded="false">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                <ul class="nav-links" id="nav-links">
                    ${navItems.map(item => `
                        <li>
                            <a href="${item.href}" class="nav-link" data-section="${item.href.replace('#','')}">
                                ${item.label}
                            </a>
                        </li>
                    `).join('')}
                    <li>
                        <a href="#contact" class="nav-cta">Contrátame</a>
                    </li>
                </ul>
            </div>
        </header>`;
    }
}
