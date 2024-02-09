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
        //this.speed = 200;

        this.gravity = 0.4;
        this.velocity = 0;

        this.birdWidth = this.animator.width - 9;
        this.birdHeight = this.animator.height;

        this.mapWidth = this.map.getWidth();
        this.mapHeight = this.map.getHeight();

        this.updateBB();
    }

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x, this.y, this.birdWidth * this.scale, this.birdHeight * this.scale);
    }

    update() {
        /**
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
         */
        this.spacePressed = false;

        if ((this.game.space && !this.spacePressed) || this.game.click) {
           // this.velocity = -6;
            this.spacePressed = true;
        } else {
            this.spacePressed = this.game.space;
        }

        //this.velocity += this.gravity;
        this.y += this.velocity;

        if (this.y > this.mapHeight) {
            this.game.camera.gameOver = true;
        } else if (this.y < 0) {
            this.game.camera.gameOver = true;
        }

        this.birdWidth = this.animator.width - 9;
        this.birdHeight = this.animator.height;

        this.updateBB();
    }

    draw(ctx) {
        this.animator.drawFrame(this.game.clockTick, ctx, this.x, this.y);
        
        if (params.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
        }
    }
}