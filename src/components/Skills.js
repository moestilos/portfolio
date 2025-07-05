class Skills {
    render() {
        const skills = [
            { name: 'Laravel', icon: 'laravel/laravel-original.svg', hoverColor: 'purple-200' },
            { name: 'Angular', icon: 'angularjs/angularjs-plain.svg', hoverColor: 'red-200' },
            { name: 'HTML5', icon: 'html5/html5-original.svg', hoverColor: 'orange-400' },
            { name: 'CSS3', icon: 'css3/css3-original.svg', hoverColor: 'blue-400' },
            { name: 'Tailwind', icon: 'tailwindcss/tailwindcss-original.svg', hoverColor: 'cyan-200' },
            { name: 'React', icon: 'react/react-original.svg', hoverColor: 'blue-200' },
            { name: 'Symfony', icon: 'symfony/symfony-original.svg', hoverColor: 'gray-200' },
            { name: 'PostgreSQL', icon: 'postgresql/postgresql-plain.svg', hoverColor: 'blue-200' },
            { name: 'Docker', icon: 'docker/docker-plain.svg', hoverColor: 'cyan-200' },
            { name: 'JavaScript', icon: 'javascript/javascript-plain.svg', hoverColor: 'yellow-200' },
            { name: 'TypeScript', icon: 'typescript/typescript-original.svg', hoverColor: 'blue-200' },
            { name: 'Java', icon: 'java/java-original.svg', hoverColor: 'yellow-600' },
            { name: 'VS Code', icon: 'vscode/vscode-original.svg', hoverColor: 'blue-200' },
            { name: 'NestJS', icon: 'nestjs/nestjs-original.svg', hoverColor: 'red-200' },
            { name: 'GitHub', icon: null, hoverColor: 'purple-200', customSvg: true },
            { name: 'Git', icon: 'git/git-original.svg', hoverColor: 'orange-200' },
            { name: 'Linux', icon: 'linux/linux-original.svg', hoverColor: 'green-200' },
            { name: 'Postman', icon: 'postman/postman-plain.svg', hoverColor: 'orange-200' },
            { name: 'Illustrator', icon: 'illustrator/illustrator-line.svg', hoverColor: 'orange-300' },
            { name: 'Photoshop', icon: 'photoshop/photoshop-original.svg', hoverColor: 'blue-400' },
            { name: 'Figma', icon: 'figma/figma-original.svg', hoverColor: 'pink-400' },
            { name: 'Xd', icon: 'xd/xd-original.svg', hoverColor: 'pink-300' },
            { name: 'Eclipse', icon: 'eclipse/eclipse-original.svg', hoverColor: 'purple-400' },
            { name: 'PHP', icon: 'php/php-original.svg', hoverColor: 'purple-200' }
        ];

        return `
        <section id="skills" class="max-w-6xl mx-auto px-4 py-20">
            <h3 class="text-3xl font-bold mb-12 text-center text-white animate-fadeInUp">Frameworks</h3>
            <div class="bg-gradient-to-br from-[#201a2b] via-[#241a2b] to-[#18141f] rounded-xl p-6 md:p-8 border border-[#2d223b] shadow-lg hover:shadow-purple-900/30 transform hover:scale-[1.01] duration-300 transition-all">
                <p class="text-center text-gray-300 mb-8 animate-fadeInUp animate-delay-1 max-w-2xl mx-auto">
                    Herramientas y tecnologías que utilizo para crear soluciones modernas y escalables
                </p>
                
                <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 animate-fadeInUp animate-delay-2">
                    ${skills.map(skill => this.renderSkill(skill)).join('')}
                </div>
            </div>
        </div>
        </section>`;
    }

    renderSkill(skill) {
        const icon = skill.customSvg ? this.getGithubSvg() : 
            `<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${skill.icon}" 
                alt="${skill.name}" 
                class="w-10 h-10 mb-2 transform transition-all duration-300 group-hover:scale-110" />`;

        return `
        <div class="group flex flex-col items-center p-4 rounded-lg bg-[#18141f]/50 hover:bg-[#2d223b] border border-[#2d223b]/50 hover:border-purple-500/30 transition-all duration-300 transform hover:scale-[1.05]">
            ${icon}
            <span class="text-gray-300 text-sm group-hover:text-${skill.hoverColor} transition-colors">${skill.name}</span>
        </div>`;
    }

    getGithubSvg() {
        return `
        <svg class="w-10 h-10 mb-2 transform transition-all duration-300 group-hover:scale-110"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round">
            <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" />
        </svg>`;
    }
}
