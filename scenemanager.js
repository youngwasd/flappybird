class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.entities = [];
        this.map();
    }

    map() {
        const background = new Map(this.game, 0, 0, 1280, 720);

        this.game.addEntity(new Tongue(this.game));
        this.game.addEntity(new Bird(this.game, background));
        this.game.addEntity(new Pipe(this.game));
        this.game.addEntity(background);
    }
}