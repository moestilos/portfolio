class Navigation {
    constructor() {
        this.header = document.getElementById('main-header');
        this.hamburger = document.getElementById('hamburger');
        this.navLinks = document.getElementById('nav-links');
        this.navLinkItems = this.navLinks.querySelectorAll('.nav-link');
        this.sections = [];
        this.isOpen = false;

        this.init();
    }

    init() {
        // Collect sections
        this.sections = Array.from(document.querySelectorAll('section[id]')).map(el => ({
            id: el.id,
            el,
            top: 0
        }));

        this.setupHamburger();
        this.setupNavLinks();
        this.setupScrollBehavior();
        this.onScroll();

        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && this.isOpen) this.closeMenu();
        });
    }

    setupHamburger() {
        this.hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleMenu();
        });

        document.addEventListener('click', (e) => {
            if (this.isOpen && !this.navLinks.contains(e.target) && !this.hamburger.contains(e.target)) {
                this.closeMenu();
            }
        });
    }

    setupNavLinks() {
        this.navLinkItems.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) this.closeMenu();
            });
        });
    }

    setupScrollBehavior() {
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.onScroll();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    onScroll() {
        const scrollY = window.scrollY;

        // Header style on scroll
        if (scrollY > 20) {
            this.header.classList.add('scrolled');
        } else {
            this.header.classList.remove('scrolled');
        }

        // Scroll progress bar
        const progress = document.getElementById('scroll-progress');
        if (progress) {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            progress.style.width = totalHeight > 0 ? `${(scrollY / totalHeight) * 100}%` : '0%';
        }

        // Back to top
        const btt = document.getElementById('back-to-top');
        if (btt) {
            if (scrollY > 400) btt.classList.add('visible');
            else btt.classList.remove('visible');
        }

        // Active nav link
        this.updateActiveLink(scrollY);
    }

    updateActiveLink(scrollY) {
        let currentSection = '';
        const offset = 120;

        document.querySelectorAll('section[id]').forEach(section => {
            if (scrollY + offset >= section.offsetTop) {
                currentSection = section.id;
            }
        });

        this.navLinkItems.forEach(link => {
            const section = link.dataset.section;
            if (section === currentSection) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    toggleMenu() {
        this.isOpen ? this.closeMenu() : this.openMenu();
    }

    openMenu() {
        this.isOpen = true;
        this.navLinks.classList.add('open');
        this.hamburger.classList.add('open');
        this.hamburger.setAttribute('aria-expanded', 'true');
    }

    closeMenu() {
        this.isOpen = false;
        this.navLinks.classList.remove('open');
        this.hamburger.classList.remove('open');
        this.hamburger.setAttribute('aria-expanded', 'false');
    }
}
