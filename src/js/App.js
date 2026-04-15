class App {
    constructor() {
        this.components = {
            header:     new Header(),
            about:      new About(),
            services:   new Services(),
            experience: new Experience(),
            projects:   new Projects(),
            skills:     new Skills(),
            contact:    new Contact(),
            footer:     new Footer()
        };

        this.starBackground = new StarBackground();
        this.navigation = null;
    }

    init() {
        this.render();
        this.starBackground.init();
        this.navigation = new Navigation();
        this.initScrollReveal();
        this.initCustomCursor();
        this.initTypewriter();
        this.initBackToTop();
    }

    render() {
        document.body.innerHTML = `
            <!-- Cursor -->
            <div id="cursor-dot"></div>
            <div id="cursor-ring"></div>

            <!-- Scroll progress -->
            <div id="scroll-progress"></div>

            <!-- Back to top -->
            <button id="back-to-top" aria-label="Volver arriba" onclick="window.scrollTo({top:0,behavior:'smooth'})">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="18 15 12 9 6 15"></polyline>
                </svg>
            </button>

            <!-- Stars canvas -->
            <canvas id="stars-bg"></canvas>

            <!-- Components -->
            ${this.components.header.render()}
            <main style="padding-top:70px;">
                ${this.components.about.render()}
                <div class="section-divider"></div>
                ${this.components.services.render()}
                ${this.components.experience.render()}
                ${this.components.projects.render()}
                ${this.components.skills.render()}
                ${this.components.contact.render()}
            </main>
            ${this.components.footer.render()}
        `;
    }

    // ─── Scroll Reveal ────────────────────────────────────────────────────────
    initScrollReveal() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

        document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
            observer.observe(el);
        });
    }

    // ─── Custom Cursor ────────────────────────────────────────────────────────
    initCustomCursor() {
        const dot  = document.getElementById('cursor-dot');
        const ring = document.getElementById('cursor-ring');

        let dotX = 0, dotY = 0;
        let ringX = 0, ringY = 0;

        document.addEventListener('mousemove', (e) => {
            dotX = e.clientX;
            dotY = e.clientY;
        });

        // Smooth ring follow
        const followRing = () => {
            ringX += (dotX - ringX) * 0.12;
            ringY += (dotY - ringY) * 0.12;
            if (dot) { dot.style.left = dotX + 'px'; dot.style.top = dotY + 'px'; }
            if (ring) { ring.style.left = ringX + 'px'; ring.style.top = ringY + 'px'; }
            requestAnimationFrame(followRing);
        };
        followRing();

        // Hover on interactive elements
        const interactives = document.querySelectorAll('a, button, .skill-card, .service-card, .project-card');
        interactives.forEach(el => {
            el.addEventListener('mouseenter', () => ring && ring.classList.add('cursor-hover'));
            el.addEventListener('mouseleave', () => ring && ring.classList.remove('cursor-hover'));
        });
    }

    // ─── Typewriter ───────────────────────────────────────────────────────────
    initTypewriter() {
        const el = document.getElementById('typewriter-text');
        if (!el) return;

        const roles = [
            'Desarrollador Web Freelance',
            'Frontend Developer',
            'Full Stack Developer',
            'UI/UX Enthusiast',
        ];

        let roleIndex = 0;
        let charIndex = 0;
        let deleting = false;
        const TYPING_SPEED   = 70;
        const DELETING_SPEED = 35;
        const PAUSE          = 2000;

        const type = () => {
            const current = roles[roleIndex];

            if (!deleting) {
                el.textContent = current.slice(0, charIndex + 1);
                charIndex++;

                if (charIndex === current.length) {
                    deleting = true;
                    setTimeout(type, PAUSE);
                    return;
                }
            } else {
                el.textContent = current.slice(0, charIndex - 1);
                charIndex--;

                if (charIndex === 0) {
                    deleting = false;
                    roleIndex = (roleIndex + 1) % roles.length;
                }
            }

            setTimeout(type, deleting ? DELETING_SPEED : TYPING_SPEED);
        };

        type();
    }

    // ─── Back to Top ──────────────────────────────────────────────────────────
    initBackToTop() {
        // Already wired via onclick in HTML
    }
}

// ─── Bootstrap ────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.init();
});
