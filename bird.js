class Bird {
    constructor(game, map) {
        this.game = game;
        this.map = map;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/bird.png");

        this.scale = 2.5;
        this.dead = false;

        this.animator = new Animator(this.spritesheet, 2, 0, 28, 15, 3, 0.1, this.scale);

        this.x = this.map.getWidth() / 8;
        this.y = this.map.getHeight() / 2;

        this.spacePressed = false;

        this.gravity = 1000;
        this.velocity = 0;

        this.birdWidth = this.animator.width - 14;
        this.birdHeight = this.animator.height - 5;

        this.mapWidth = this.map.getWidth();
        this.mapHeight = this.map.getHeight();

        this.updateBB();
    };

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x + 6, this.y + 7, this.birdWidth * this.scale, this.birdHeight * this.scale);
    };

    update() {
        const elapsed = this.game.clockTick;

        this.velocity += this.gravity * elapsed;

        if ((this.game.space && !this.spacePressed) || this.game.click) {
            this.velocity = -435;
            ASSET_MANAGER.playAsset("./sounds/jump.wav");
            this.spacePressed = true;
        } else {
            this.spacePressed = this.game.space;
        }

        this.velocity += this.gravity * elapsed;
        this.y += this.velocity * elapsed;

        if (this.y > this.mapHeight) {
            this.game.camera.gameOver = true;
        } else if (this.y < 0) {
            this.game.camera.gameOver = true;
        }

        this.updateBB();
    };

    draw(ctx) {
        this.animator.drawFrame(this.game.clockTick, ctx, this.x, this.y);
        
        if (params.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
        }
    };
};