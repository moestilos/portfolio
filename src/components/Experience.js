class Experience {
    render() {
        return `
        <section id="experience" class="max-w-6xl mx-auto px-4 py-20">
            <h3 class="text-3xl font-bold mb-12 text-center text-white animate-fadeInUp">Experiencia y Formación</h3>
            <div class="grid md:grid-cols-3 gap-10">
                ${this.renderAboutMe()}
                ${this.renderExperience()}
                ${this.renderEducation()}
            </div>
        </section>`;
    }

    renderAboutMe() {
        return `
        <div class="bg-gradient-to-br from-[#201a2b] via-[#241a2b] to-[#18141f] rounded-xl p-6 border border-[#2d223b] shadow-lg hover:shadow-purple-900/30 flex flex-col gap-4 animate-fadeInUp animate-delay-1 group transform hover:scale-[1.01] duration-300 transition-all">
            <h4 class="text-xl font-semibold text-purple-200 mb-2 flex items-center gap-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
                Sobre mí
            </h4>
            <p class="text-gray-300 text-sm leading-relaxed">
                Soy una persona comprometida, trabajadora y tranquila, apasionada por el desarrollo web, especialmente en Frontend. Me motiva afrontar nuevos desafíos y mejorar constantemente mis habilidades.
            </p>
            <div class="flex flex-wrap gap-2 mt-auto pt-4">
                <span class="bg-purple-900/30 text-purple-200 rounded-full px-3 py-1 text-xs font-medium">Edad: 21</span>
                <span class="bg-purple-900/30 text-purple-200 rounded-full px-3 py-1 text-xs font-medium">Carné B</span>
                <span class="bg-purple-900/30 text-purple-200 rounded-full px-3 py-1 text-xs font-medium">Disponible</span>
            </div>
        </div>`;
    }

    renderExperience() {
        return `
        <div class="bg-gradient-to-br from-[#201a2b] via-[#241a2b] to-[#18141f] rounded-xl p-6 border border-[#2d223b] shadow-lg hover:shadow-purple-900/30 flex flex-col gap-4 animate-fadeInUp animate-delay-2 group transform hover:scale-[1.01] duration-300 transition-all">
            <h4 class="text-xl font-semibold text-purple-200 mb-2 flex items-center gap-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                Experiencia
            </h4>
            <div class="space-y-4">
                <div class="relative pl-6 border-l-2 border-purple-500/30">
                    <h5 class="font-semibold text-gray-200">Guadaltech Professional Cloud</h5>
                    <span class="block text-xs text-purple-300 mb-1">Prácticas Grado Medio · 2022-2023</span>
                    <p class="text-gray-300 text-sm">
                        400h de formación en desarrollo web y sistemas, usando WordPress, Odoo y Adobe Creative Cloud.
                    </p>
                </div>
                <div class="relative pl-6 border-l-2 border-purple-500/30">
                    <h5 class="font-semibold text-gray-200">CodeArts Solutions</h5>
                    <span class="block text-xs text-purple-300 mb-1">Prácticas Grado Superior · 2025</span>
                    <p class="text-gray-300 text-sm">
                        Desarrollo con Angular, Symfony, Tailwind CSS, Docker y PostgreSQL.
                    </p>
                </div>
            </div>
        </div>`;
    }

    renderEducation() {
        return `
        <div class="bg-gradient-to-br from-[#201a2b] via-[#241a2b] to-[#18141f] rounded-xl p-6 border border-[#2d223b] shadow-lg hover:shadow-purple-900/30 flex flex-col gap-4 animate-fadeInUp animate-delay-3 group transform hover:scale-[1.01] duration-300 transition-all">
            <h4 class="text-xl font-semibold text-purple-200 mb-2 flex items-center gap-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
                </svg>
                Educación
            </h4>
            <div class="space-y-4">
                <div class="relative pl-6 border-l-2 border-purple-500/30">
                    <h5 class="font-semibold text-gray-200">Grado Superior DAW</h5>
                    <span class="block text-xs text-purple-300 mb-1">Cesur Sevilla · 2023-2025</span>
                    <p class="text-gray-300 text-sm">
                        Desarrollo de aplicaciones web con Java, PHP, JavaScript, Spring Boot, Laravel y más.
                    </p>
                </div>
                <div class="relative pl-6 border-l-2 border-purple-500/30">
                    <h5 class="font-semibold text-gray-200">Grado Medio SMR</h5>
                    <span class="block text-xs text-purple-300 mb-1">Obicex Implika · 2020-2022</span>
                    <p class="text-gray-300 text-sm">
                        Sistemas Microinformáticos y Redes, prácticas con WordPress y Odoo.
                    </p>
                </div>
            </div>
        </div>`;
    }
}
