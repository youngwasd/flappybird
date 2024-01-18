class Bird {
    constructor(game) {
        this.game = game;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/bird.png");
        this.animations = [];

        this.animations[0] = new Animator(this.spritesheet, 0, 0, 24, 15, 1, 0.2);
        this.animations[1] = new Animator(this.spritesheet, 24, 0, 29, 15, 1, 0.2);
        this.animations[2] = new Animator(this.spritesheet, 53, 0, 24, 15, 1, 0.2);

        this.x = 0;
        this.y = 0;
    }

    update() {

    }

    draw(ctx) {

    }
}