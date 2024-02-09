class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.entities = [];
        this.game.camera = this;
        
        this.title = true;

        this.map(true);
    }

    map(title) {
        this.title = title;
        const background = new Map(this.game, 0, 0, 1280, 720);
        const bird = new Bird(this.game, background)

        this.game.addEntity(bird);
        this.game.addEntity(new Pipe(this.game, bird, background));
        this.game.addEntity(background);
    }

    update() {
        if (this.title && this.game.click) {
            if (this.game.click.x && this.game.click.y) {
                if (this.game.click.x >= this.ctx.canvas.width / 2 &&
                    this.game.click.x <= this.ctx.canvas.width / 2 + this.imageWidth &&
                    this.game.click.y >= this.ctx.canvas.height / 2 &&
                    this.game.click.y <= this.ctx.canvas.height / 2 + this.imageHeight) {
                    console.log("Clicked on the image!");
                    this.title = false;
                    this.map();
                }
            }
        }
    };

    draw(ctx) {
        this.ctx = ctx;
        if (this.title) {
            const image = ASSET_MANAGER.getAsset("./sprites/title.png");
            this.imageWidth = image.width;
            this.imageHeight = image.height;
            this.ctx.drawImage(image, this.ctx.canvas.width / 2, this.ctx.canvas.height / 2);

            // draw play button as well
        }
    };
}