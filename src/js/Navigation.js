class Navigation {
    constructor() {
        this.menuToggle = document.getElementById('menu-toggle');
        this.mainNav = document.getElementById('main-nav');
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.handleResize();
        this.menuToggle.setAttribute('aria-expanded', 'false');
        window.addEventListener('scroll', () => this.updateOnScroll());
        // Set initial indicator location
        setTimeout(() => this.updateOnScroll(), 500);
    }

    setupEventListeners() {
        this.menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleMenu();
        });

        document.addEventListener('click', (e) => {
            this.handleDocumentClick(e);
        });

        this.mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                this.handleNavLinkClick();
            });
            // Scroll and move indicator on hover
            link.addEventListener('mouseenter', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                if (targetId && targetId.startsWith('#')) {
                    const section = document.querySelector(targetId);
                    if (section) section.scrollIntoView({ behavior: 'smooth' });
                }
                this.moveIndicator(link);
            });
        });

        window.addEventListener('resize', () => {
            this.handleResize();
        });
    }

    toggleMenu() {
        this.mainNav.classList.toggle('hidden');
        this.menuToggle.setAttribute('aria-expanded', 
            this.mainNav.classList.contains('hidden') ? 'false' : 'true');
    }

    handleDocumentClick(e) {
        if (
            !this.mainNav.contains(e.target) &&
            !this.menuToggle.contains(e.target) &&
            window.innerWidth < 768 &&
            !this.mainNav.classList.contains('hidden')
        ) {
            this.mainNav.classList.add('hidden');
            this.menuToggle.setAttribute('aria-expanded', 'false');
        }
    }

    handleNavLinkClick() {
        if (window.innerWidth < 768) {
            this.mainNav.classList.add('hidden');
            this.menuToggle.setAttribute('aria-expanded', 'false');
        }
    }

    handleResize() {
        if (window.innerWidth >= 768) {
            this.mainNav.classList.remove('hidden');
            this.menuToggle.setAttribute('aria-expanded', 'true');
        } else {
            this.mainNav.classList.add('hidden');
            this.menuToggle.setAttribute('aria-expanded', 'false');
        }
    }

    moveIndicator(link) {
        const indicator = document.getElementById('nav-indicator');
        const rect = link.getBoundingClientRect();
        const navRect = this.mainNav.getBoundingClientRect();
        const leftPos = rect.left - navRect.left;
        indicator.style.left = `${leftPos}px`;
        indicator.style.width = `${rect.width}px`;
    }
    // Move indicator on page scroll based on visible section
    updateOnScroll() {
        const sections = [
            { id: 'about', selector: '#main-nav a[href="#about"]' },
            { id: 'experience', selector: '#main-nav a[href="#experience"]' },
            { id: 'projects', selector: '#main-nav a[href="#projects"]' },
            { id: 'skills', selector: '#main-nav a[href="#skills"]' }
        ];
        const scrollPos = window.scrollY + window.innerHeight / 3;
        for (let sec of sections) {
            const el = document.getElementById(sec.id);
            if (el.offsetTop <= scrollPos && el.offsetTop + el.offsetHeight > scrollPos) {
                const link = document.querySelector(sec.selector);
                this.moveIndicator(link);
                break;
            }
        }
    }
}
