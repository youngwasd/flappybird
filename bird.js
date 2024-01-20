class Bird {
    constructor(game, map) {
        this.game = game;
        this.map = map;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/bird.png");
        this.animations = [];

        this.animations[0] = new Animator(this.spritesheet, 0, 0, 24, 15, 1, 0.2, 2.5);
        this.animations[1] = new Animator(this.spritesheet, 24, 0, 29, 15, 1, 0.2, 2.5);
        this.animations[2] = new Animator(this.spritesheet, 56, 0, 24, 15, 1, 0.2, 2.5);

        this.x = 300;
        this.y = 350;
        this.speed = 200;

        this.i = 1;

        this.mapWidth = this.map.getWidth();
        this.mapHeight = this.map.getHeight();
    }

    update() {
        const elapsed = this.game.clockTick;
        let deltaY = 0;
    
        if (this.game.space && !this.spacePressed) {
            deltaY -= (this.speed + 100) * elapsed;
            this.spacePressed = true;
            this.ticksBeforeFalling = 0;
            this.i = 0;
        } else {
            this.ticksBeforeFalling = (this.ticksBeforeFalling || 0) + 1;
            
            if (this.ticksBeforeFalling > 60) {
                deltaY += this.speed * elapsed;
                this.i = 2;
            } else if (this.ticksBeforeFalling <= 60) {
                deltaY -= (this.speed + 100) * elapsed;
                this.i = 0;
            }

            this.spacePressed = this.game.space;
        }
        
        const length = Math.sqrt(deltaY * deltaY);
        if (length !== 0) {
            const normalizedDeltaY = (deltaY / length) * this.speed * elapsed;

            this.y += normalizedDeltaY;
        }

        this.y = Math.max(0, Math.min(this.y, this.mapHeight - this.animations[0].height));
    }

    draw(ctx) {
        this.animations[this.i].drawFrame(this.game.clockTick, ctx, this.x, this.y);
    }
}