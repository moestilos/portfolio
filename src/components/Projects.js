class Projects {
    render() {
        const projects = [
            {
                name: 'FunkMoes',
                image: 'public/images/pro1.png',
                description: 'Tienda de camisetas desarrollada con Laravel y Tailwind CSS. Incluye funcionalidades de carrito de compra, autenticación de usuarios y panel de administración.',
                technologies: ['Laravel', 'Tailwind CSS', 'MySQL', 'PHP', 'PhpMyAdmin']
            },
            {
                name: 'Vuela21',
                image: 'public/images/vuela21o.png',
                description: 'Aplicación de paquetes de transporte. Experiencia de usuario moderna y responsive.',
                technologies: ['Angular', 'Tailwind CSS', 'TypeScript', 'Node.js', 'Symfony', 'Postman']
            }
        ];

        return `
        <section id="projects" class="max-w-6xl mx-auto px-4 py-20">
            <h3 class="text-3xl font-bold mb-12 text-center text-white animate-fadeInUp">Proyectos</h3>
            <div class="flex flex-col gap-12">
                ${projects.map((project, index) => this.renderProject(project, index)).join('')}
            </div>
        </section>`;
    }

    renderProject(project, index) {
        return `
        <div class="flex flex-col md:flex-row bg-gradient-to-br from-[#201a2b] via-[#241a2b] to-[#18141f] rounded-xl p-8 border border-[#2d223b] shadow-lg hover:shadow-purple-900/30 animate-fadeInUp animate-delay-${index + 1} group transform hover:scale-105 duration-300 transition-all">
            <div class="md:w-1/3 flex items-center justify-center mb-6 md:mb-0">
                <img src="${project.image}" alt="${project.name}"
                    class="w-full max-w-xs rounded-lg object-cover object-center bg-[#18141f] border border-[#2d223b]
                           transform -rotate-6 hover:rotate-0 transition-transform duration-500 hover:scale-110 shadow-xl"
                />
            </div>
            <div class="md:w-2/3 md:pl-10 flex flex-col justify-center">
                <h4 class="text-2xl font-bold text-purple-200 mb-3 group-hover:text-fuchsia-300 transition-colors duration-300">${project.name}</h4>
                <p class="text-gray-300 mb-4 text-lg group-hover:text-white transition-colors duration-300">
                    ${project.description}
                </p>
                <div class="flex flex-wrap gap-2 mt-4">
                    ${project.technologies.map(tech => `
                        <span class="bg-[#2d223b] text-gray-200 px-3 py-1 rounded-full text-sm font-medium hover:bg-purple-900/40 transition-colors">${tech}</span>
                    `).join('')}
                </div>
            </div>
        </div>`;
    }
}
