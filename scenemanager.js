class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.entities = [];
        this.game.camera = this;
        
        this.title = true;
        this.gameOver = false;

        this.best = 0;

        this.loadLevel(false, true);
    }

    clearEntities() {
        this.game.entities.forEach(function (entity) {
            entity.dead = true;
        });
    };

    loadLevel(transition, title) {
        this.title = title;
        this.clearEntities();

        if (!title) {
            if (transition) {
                this.game.addEntity(new TransitionScreen(this.game, title));
            } else {
                this.background = new Map(this.game, 0, 0, 1280, 720);
                this.bird = new Bird(this.game, this.background);
                this.pipe = new Pipe(this.game, this.bird, this.background);
                this.game.addEntity(this.bird);
                this.game.addEntity(this.pipe);
                this.game.addEntity(this.background);
            }
        }
    }

    update() {
        if (this.title && this.game.click) {
            if (this.game.click.x && this.game.click.y) {
                if ((this.game.click.x >= 13 && this.game.click.x <= 17)
                    && (this.game.click.y >= 9 && this.game.click.y <= 11)) {
                    this.title = false;
                    this.loadLevel(true);
                }
            }
        }

        if (this.gameOver) {
            this.gameOver = false;
            this.clearEntities();

            this.game.addEntity(new TransitionScreen(this.game, true));
        }
    };

    draw(ctx) {
        ctx.font = "20px Arial";
        ctx.fillStyle = "black"
        ctx.fillText(`FPS: ${this.game.timer.ticks.length}`, 1190, 20);

        if (this.title) {
            ctx.drawImage(ASSET_MANAGER.getAsset("./sprites/map.png"), 0, 0, 1280, 720);
            ctx.drawImage(ASSET_MANAGER.getAsset("./sprites/title.png"), ctx.canvas.width / 2 - 140, ctx.canvas.height / 2 - 200, 276, 78);
            ctx.drawImage(ASSET_MANAGER.getAsset("./sprites/playButton.png"), ctx.canvas.width / 2 - 90, ctx.canvas.height / 2 + 30, 168, 99);
        }
    };
};

class TransitionScreen {
    constructor(game, gameOver) {
        Object.assign(this, {game, gameOver});
        this.countDown = 4;
    };

    update() {
        this.countDown -= this.game.clockTick;

        if (this.countDown < 0) this.game.camera.loadLevel(false, this.gameOver);
    };

    draw(ctx) {
        ctx.drawImage(ASSET_MANAGER.getAsset("./sprites/map.png"), 0, 0, 1280, 720);
        if (this.gameOver) {
            if (this.game.camera.pipe.point > this.game.camera.best) this.game.camera.best = this.game.camera.pipe.point;

            ctx.drawImage(ASSET_MANAGER.getAsset("./sprites/game_over.png"), ctx.canvas.width / 2 - 155, ctx.canvas.height / 2 - 200, 297, 69);
            ctx.drawImage(ASSET_MANAGER.getAsset("./sprites/scoreCard.png"), ctx.canvas.width / 2 - 130, ctx.canvas.height / 2 - 50, 238, 122);
            if (this.game.camera.pipe.point > 30) { // gold medal
                ctx.drawImage(ASSET_MANAGER.getAsset("./sprites/gold.png"), ctx.canvas.width / 2 - 103, ctx.canvas.height / 2 - 5, 52, 48);
            } else { // silver medal
                ctx.drawImage(ASSET_MANAGER.getAsset("./sprites/silver.png"), ctx.canvas.width / 2 - 100, ctx.canvas.height / 2 - 5, 48, 48);
            }
            ctx.font = "20px Impact";
            ctx.fillStyle = "white";
            ctx.strokeStyle = "black";
            ctx.lineWidth = 2;
            ctx.strokeText(this.game.camera.pipe.point, ctx.canvas.width / 2 + 55, ctx.canvas.height / 2 + 5);
            ctx.fillText(this.game.camera.pipe.point, ctx.canvas.width / 2 + 55, ctx.canvas.height / 2 + 5);
            ctx.strokeText(this.game.camera.best, ctx.canvas.width / 2 + 55, ctx.canvas.height / 2 + 47);
            ctx.fillText(this.game.camera.best, ctx.canvas.width / 2 + 55, ctx.canvas.height / 2 + 47)
        } else {
            ctx.drawImage(ASSET_MANAGER.getAsset("./sprites/getReady.png"), ctx.canvas.width / 2 - 140, ctx.canvas.height / 2 - 200, 282, 81);
            ctx.font = "30px Impact";
            ctx.fillStyle = "white";
            ctx.strokeStyle = "black";
            ctx.lineWidth = 2;
            ctx.strokeText("Press Space or Tap the Screen to Jump!", ctx.canvas.width / 2 - 225, ctx.canvas.height / 2 - 50);
            ctx.fillText("Press Space or Tap the Screen to Jump!", ctx.canvas.width / 2 - 225, ctx.canvas.height / 2 - 50);

            ctx.font = "50px Impact";
            ctx.strokeText(Math.floor(this.countDown), ctx.canvas.width / 2 - 15, ctx.canvas.height / 2 + 50);
            ctx.fillText(Math.floor(this.countDown), ctx.canvas.width / 2 - 15, ctx.canvas.height / 2 + 50);
        }
    };
}