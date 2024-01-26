class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.entities = [];

        this.map();
    }

    map() {
        const background = new Map(this.game, 0, 0, 1280, 720);
        const bird = new Bird(this.game, background)

        this.game.addEntity(bird);
        this.game.addEntity(new Pipe(this.game, bird, background));
        this.game.addEntity(background);
    }
}