class Pipe {
    constructor(game) {
        this.game = game;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/pipes.png");
        this.animator = [];

        this.scale = 2;

        this.animator[0] = new Animator(this.spritesheet, 0, 0, 28, 164, 1, 0.2, this.scale);
        this.animator[1] = new Animator(this.spritesheet, 28, 0, 28, 164, 1, 0.2, this.scale);

        this.x = 1330;
        this.bottomPipeY = 450;
        this.topPipeY = -50;
        this.speed = 150;
        this.point = 0;

        this.updateBB();
    }

    updateBB() {
        this.lastTopBB = this.topBB;
        this.lastBotBB = this.botBB;
        this.topBB = new BoundingBox(this.x, this.topPipeY, this.animator[0].width * this.scale, this.animator[0].height * this.scale);
        this.botBB = new BoundingBox(this.x, this.bottomPipeY, this.animator[1].width * this.scale, this.animator[1].height * this.scale);
    };

    update() {
        this.x -= this.speed * this.game.clockTick;

        if (this.x < 200) this.point++; // scoring broken
        if (this.x <= -50) this.x = 1330;

        this.updateBB();
    }

    draw(ctx) {
        this.animator[0].drawFrame(this.game.clockTick, ctx, this.x, this.topPipeY);
        this.animator[1].drawFrame(this.game.clockTick, ctx, this.x, this.bottomPipeY);

        if (params.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.topBB.x, this.topBB.y, this.topBB.width, this.topBB.height);

            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.botBB.x, this.botBB.y, this.botBB.width, this.botBB.height);
        }

        ctx.font = "30px Arial";
        ctx.fillStyle = "black";
        ctx.fillText("Score: " + this.point, 10, 50);
    }
}