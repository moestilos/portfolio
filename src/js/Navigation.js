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
}
