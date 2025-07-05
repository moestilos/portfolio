class Header {
    render() {
        return `
        <header class="bg-[#18141f]/90 backdrop-blur fixed top-0 left-0 w-full z-[100] border-b border-[#2d223b]/60 shadow-lg transition-all duration-300">
            <div class="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
                <a href="#" class="flex items-center gap-2 group relative">
                    <span class="text-2xl font-bold text-white tracking-tight group-hover:text-purple-300 transition-all duration-300 
                        relative before:absolute before:inset-0  before:scale-x-0 before:origin-right before:transition-transform before:duration-300
                        group-hover:before:scale-x-100 group-hover:before:origin-left">
                        moestilos
                    </span>
                    <span class="w-3 h-3 bg-purple-400 rounded-full animate-pulse group-hover:bg-purple-300 transition-all duration-300
                        group-hover:scale-125 group-hover:animate-pulse-slow"></span>
                    <div class="absolute -bottom-1 left-0 w-full h-0.5 bg-purple-400 transform scale-x-0 group-hover:scale-x-100 
                        transition-transform duration-300 origin-left"></div>
                </a>
                
                <button id="menu-toggle" class="md:hidden flex items-center px-3 py-2 rounded text-gray-200 hover:text-white 
                    focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300 
                    hover:bg-purple-500/10" aria-label="Abrir menú">
                    <svg class="h-7 w-7 transform transition-transform duration-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path class="transition-all duration-300" stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
                    </svg>
                </button>

                <nav id="main-nav" class="flex-col md:flex-row flex md:flex items-center gap-2 md:gap-6
                    absolute md:static left-0 w-full md:w-auto
                    bg-[#18141f]/95 md:bg-transparent border-t md:border-none border-[#2d223b]/60 md:shadow-none shadow-lg
                    md:rounded-none rounded-b-xl
                    transition-all duration-300 ease-in-out
                    hidden md:flex
                    top-full mt-2 md:mt-0
                    z-50 backdrop-blur-sm">
                    ${['Sobre mí', 'Experiencia', 'Proyectos', 'Frameworks'].map(item => `
                        <a href="#${item.toLowerCase().replace(' ', '-')}" class="px-3 py-1 rounded-md text-gray-200 hover:text-white relative overflow-hidden group
                            transition-all duration-300 hover:bg-purple-900/30">
                            <span class="relative z-10">${item}</span>
                            <div class="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-transparent 
                                transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                        </a>
                    `).join('')}
                </nav>
            </div>
        </header>`;
    }
}
