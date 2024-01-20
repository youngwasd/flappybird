class Pipe {
    constructor(game) {
        this.game = game;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/pipes.png");
        this.animator = [];

        this.animator[0] = new Animator(this.spritesheet, 0, 0, 28, 164, 1, 0.2, 2);
        this.animator[1] = new Animator(this.spritesheet, 28, 0, 28, 164, 1, 0.2, 2);

        this.x = 1330;
        this.bottomPipeY = 450;
        this.topPipeY = -50;
        this.speed = 150;
        this.point = 0;
    }

    update() {
        this.x -= this.speed * this.game.clockTick;

        //if (this.x <= 300) this.point++;
        if (this.x <= -50) this.x = 1330;
    }

    draw(ctx) {
        this.animator[0].drawFrame(this.game.clockTick, ctx, this.x, this.topPipeY);
        this.animator[1].drawFrame(this.game.clockTick, ctx, this.x, this.bottomPipeY);
    }
}