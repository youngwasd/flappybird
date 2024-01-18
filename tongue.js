class Tongue {
    constructor(game) {
        this.game = game;
        this.animator = new Animator(ASSET_MANAGER.getAsset("./tongue.png"), 1.5, 0, 56.3, 55, 7, 0.2);

        this.x = 1280;
        this.y = 300;
        this.speed = 300;
    };

    update() {
        this.x -= this.speed * this.game.clockTick;

        if (this.x <= -100) this.x = 1280;

        this.game.clockTick < 0.005 ? this.speed = 5 : this.speed = 100;
    };

    draw(ctx) {
        this.animator.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    };
}
