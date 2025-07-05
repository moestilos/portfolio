class About {
    render() {
        return `
        <section id="about" class="relative min-h-screen flex items-center justify-center pt-24 px-4 bg-transparent z-10 w-full">
            <div class="absolute inset-0 pointer-events-none z-0"></div>
            <div class="relative flex flex-col md:flex-row items-center justify-center w-full max-w-6xl z-10 bg-[#201a2b]/90 rounded-xl shadow-lg border border-[#2d223b] backdrop-blur-md p-6 md:p-12 hover:shadow-purple-900/30 transform hover:scale-[1.01] duration-300 transition-all">
                <div class="flex-shrink-0 flex items-center justify-center w-full md:w-auto mb-8 md:mb-0 md:mr-12">
                    <img src="public/images/perfilsin.png" alt="Foto de perfil"
                        class="w-40 h-40 md:w-52 md:h-52 rounded-full ring-2 ring-purple-700 p-1 shadow-lg bg-[#18141f] object-cover" />
                </div>
                <div class="flex-1 text-center md:text-left">
                    <h2 class="text-3xl md:text-4xl font-bold text-white mb-2 animate-fadeInUp animate-delay-1">
                        Guillermo Mateos Santos Aguilera
                    </h2>
                    <div class="text-purple-300 text-lg font-medium mb-1 animate-fadeInUp animate-delay-2">
                        Desarrollador Web
                    </div>
                    <div class="text-gray-300 text-base mb-4 animate-fadeInUp animate-delay-3">
                        Sevilla, España &middot; Disponible para trabajar
                    </div>
                    <p class="text-gray-300 max-w-2xl mx-auto md:mx-0 leading-relaxed text-base mb-6 animate-fadeInUp animate-delay-4">
                        Graduado en Desarrollo de Aplicaciones Web. Me especializo en el desarrollo de aplicaciones web modernas, robustas y escalables, con especial atención al detalle y la experiencia de usuario. 
                        <br><br>
                        Me considero una persona responsable, resolutiva y con gran capacidad de adaptación. Disfruto aprendiendo nuevas tecnologías y trabajando en equipo para aportar soluciones eficientes y creativas.
                    </p>
                    <div class="flex flex-wrap justify-center md:justify-start gap-4 animate-fadeInUp animate-delay-5 mt-6">
                        ${this.renderSocialLinks()}
                        <a href="/Guillermo%20Mateos%20Santos%20CV.pdf" 
                           target="_blank" rel="noopener" download aria-label="Ver o descargar CV"
                           class="flex items-center gap-2 bg-[#232136] hover:bg-[#2d223b] text-gray-200 px-4 py-2 rounded-full font-medium shadow transition">
                            <!-- Ícono de CV actualizado -->
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                              <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                              <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
                              <path d="M11 12.5a1.5 1.5 0 0 0 -3 0v3a1.5 1.5 0 0 0 3 0" />
                              <path d="M13 11l1.5 6l1.5 -6" />
                            </svg>
                            <span>Descargar CV</span>
                        </a>
                    </div>
                </div>
            </div>
        </section>`;
    }

    renderSocialLinks() {
        const socialLinks = [
            {
                url: 'https://www.linkedin.com/in/guillermo-mateos-de-los-santos-aguilera-02427b260/',
                text: 'LinkedIn',
                icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" /><path d="M8 11l0 5" /><path d="M8 8l0 .01" /><path d="M12 16l0 -5" /><path d="M16 16v-3a2 2 0 0 0 -4 0" /></svg>'
            },
            {
                url: 'https://github.com/moestilos',
                text: 'moestilos',
                icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" /></svg>'
            },
            {
                url: 'mailto:guillermo.moestilos@gmail.com',
                text: 'guillermo.moestilos@gmail.com',
                icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M16 20h3a1 1 0 0 0 1 -1v-14a1 1 0 0 0 -1 -1h-3v16z" /><path d="M5 20h3v-16h-3a1 1 0 0 0 -1 1v14a1 1 0 0 0 1 1z" /><path d="M16 4l-4 4l-4 -4" /><path d="M4 6.5l8 7.5l8 -7.5" /></svg>'
            }
        ];

        return socialLinks.map(link => `
            <a href="${link.url}" target="_blank" rel="noopener"
                class="flex items-center gap-2 bg-[#232136] hover:bg-[#2d223b] text-gray-200 px-4 py-2 rounded-full font-medium shadow transition">
                ${link.icon}
                ${link.text}
            </a>
        `).join('');
    }
}

