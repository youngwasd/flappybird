class Bird {
    constructor(game, map) {
        this.game = game;
        this.map = map;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/bird.png");
        this.animations = [];

        this.scale = 2.5;
        this.dead = false;

        this.animations[0] = new Animator(this.spritesheet, 0, 0, 24, 15, 1, 0.2, this.scale);
        this.animations[1] = new Animator(this.spritesheet, 24, 0, 29, 15, 1, 0.2, this.scale);
        this.animations[2] = new Animator(this.spritesheet, 56, 0, 24, 15, 1, 0.2, this.scale);

        this.x = 300;
        this.y = 350;
        this.speed = 200;

        this.i = 1;

        this.birdWidth = this.animations[this.i].width;
        this.birdHeight = this.animations[this.i].height;

        this.mapWidth = this.map.getWidth();
        this.mapHeight = this.map.getHeight();

        this.updateBB();
    }

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x, this.y, this.birdWidth * this.scale, this.birdHeight * this.scale);
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

        this.birdWidth = this.animations[this.i].width;
        this.birdHeight = this.animations[this.i].height;

        // collision
        this.updateBB();
    }

    draw(ctx) {
        this.animations[this.i].drawFrame(this.game.clockTick, ctx, this.x, this.y);

        if (params.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
        }
    }
}