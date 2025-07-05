class StarBackground {
    constructor() {
        this.stars = [];
        this.STAR_NUM = 120;
    }

    init() {
        const canvas = document.getElementById('stars-bg');
        this.ctx = canvas.getContext('2d');
        this.resize();
        this.createStars();
        this.animate();

        window.addEventListener('resize', () => {
            this.resize();
            this.createStars();
        });
    }

    resize() {
        const canvas = this.ctx.canvas;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    randomStar() {
        return {
            x: Math.random() * this.ctx.canvas.width,
            y: Math.random() * this.ctx.canvas.height,
            r: Math.random() * 1.1 + 0.3,
            speed: Math.random() * 0.15 + 0.05,
            alpha: Math.random() * 0.5 + 0.5
        };
    }

    createStars() {
        this.stars = [];
        for (let i = 0; i < this.STAR_NUM; i++) {
            this.stars.push(this.randomStar());
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        
        for (let s of this.stars) {
            this.ctx.save();
            this.ctx.globalAlpha = s.alpha;
            this.ctx.beginPath();
            this.ctx.arc(s.x, s.y, s.r, 0, 2 * Math.PI);
            this.ctx.fillStyle = "#fff";
            this.ctx.shadowColor = "#fff";
            this.ctx.shadowBlur = 8;
            this.ctx.fill();
            this.ctx.restore();
            
            s.y += s.speed;
            if (s.y > this.ctx.canvas.height) {
                s.x = Math.random() * this.ctx.canvas.width;
                s.y = 0;
            }
        }
        
        requestAnimationFrame(() => this.animate());
    }
}
