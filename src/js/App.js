class App {
    constructor() {
        this.components = {
            header: new Header(),
            about: new About(),
            experience: new Experience(),
            projects: new Projects(),
            skills: new Skills(),
            footer: new Footer()
        };
        
        this.starBackground = new StarBackground();
        this.navigation = null;
    }

    init() {
        this.render();
        this.starBackground.init();
        this.navigation = new Navigation();
    }

    render() {
        document.body.innerHTML = `
            <canvas id="stars-bg"></canvas>
            ${this.components.header.render()}
            ${this.components.about.render()}
            ${this.components.experience.render()}
            ${this.components.projects.render()}
            ${this.components.skills.render()}
            ${this.components.footer.render()}
        `;
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.init();
});
