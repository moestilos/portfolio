class StarBackground {
    constructor() {
        this.stars = [];
        this.STAR_NUM = 160;
        this.mouse = { x: -9999, y: -9999 };
        this.REPEL_RADIUS = 100;
        this.REPEL_STRENGTH = 0.04;
    }

    init() {
        const canvas = document.getElementById('stars-bg');
        if (!canvas) return;
        this.ctx = canvas.getContext('2d');
        this.resize();
        this.createStars();
        this.animate();

        window.addEventListener('resize', () => {
            this.resize();
            this.createStars();
        });

        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });

        window.addEventListener('mouseleave', () => {
            this.mouse.x = -9999;
            this.mouse.y = -9999;
        });
    }

    resize() {
        const canvas = this.ctx.canvas;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    randomStar() {
        const size = Math.random();
        return {
            x: Math.random() * this.ctx.canvas.width,
            y: Math.random() * this.ctx.canvas.height,
            r: size < 0.6 ? 0.4 + Math.random() * 0.6
               : size < 0.9 ? 0.8 + Math.random() * 0.8
               : 1.2 + Math.random() * 0.8,
            speed: 0.04 + Math.random() * 0.12,
            alpha: 0.3 + Math.random() * 0.7,
            alphaSpeed: 0.004 + Math.random() * 0.008,
            alphaDir: Math.random() > 0.5 ? 1 : -1,
            hue: Math.random() > 0.85 ? 270 + Math.random() * 40 : 0, // purple stars
            ox: 0, oy: 0  // offset from repel
        };
    }

    createStars() {
        this.stars = [];
        for (let i = 0; i < this.STAR_NUM; i++) {
            this.stars.push(this.randomStar());
        }
    }

    animate() {
        const canvas = this.ctx.canvas;
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let s of this.stars) {
            // Twinkle
            s.alpha += s.alphaSpeed * s.alphaDir;
            if (s.alpha > 1) { s.alpha = 1; s.alphaDir = -1; }
            if (s.alpha < 0.1) { s.alpha = 0.1; s.alphaDir = 1; }

            // Mouse repel
            const dx = s.x - this.mouse.x;
            const dy = s.y - this.mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < this.REPEL_RADIUS) {
                const force = (1 - dist / this.REPEL_RADIUS) * this.REPEL_STRENGTH;
                s.ox += dx * force;
                s.oy += dy * force;
            }
            s.ox *= 0.92;
            s.oy *= 0.92;

            const drawX = s.x + s.ox;
            const drawY = s.y + s.oy;

            this.ctx.save();
            this.ctx.globalAlpha = s.alpha;
            this.ctx.beginPath();
            this.ctx.arc(drawX, drawY, s.r, 0, Math.PI * 2);

            if (s.hue > 0) {
                // Purple-tinted star
                this.ctx.fillStyle = `hsl(${s.hue}, 60%, 75%)`;
                this.ctx.shadowColor = `hsl(${s.hue}, 80%, 70%)`;
                this.ctx.shadowBlur = 10;
            } else {
                this.ctx.fillStyle = '#fff';
                this.ctx.shadowColor = '#fff';
                this.ctx.shadowBlur = s.r > 1 ? 6 : 3;
            }

            this.ctx.fill();
            this.ctx.restore();

            // Move downward
            s.y += s.speed;
            if (s.y > canvas.height + 2) {
                s.x = Math.random() * canvas.width;
                s.y = -2;
                s.ox = 0;
                s.oy = 0;
            }
        }

        requestAnimationFrame(() => this.animate());
    }
}
