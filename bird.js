class Bird {
    constructor(game, map) {
        this.game = game;
        this.map = map;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/bird.png");
        //this.animations = [];

        this.scale = 2.5;
        this.dead = false;

        // this.animations[0] = new Animator(this.spritesheet, 2, 0, 18, 15, 1, 0.3, this.scale); // old animations
        // this.animations[1] = new Animator(this.spritesheet, 30, 0, 18, 15, 1, 0.3, this.scale);
        // this.animations[2] = new Animator(this.spritesheet, 58, 0, 18, 15, 1, 0.3, this.scale);

        this.animator = new Animator(this.spritesheet, 2, 0, 28, 15, 3, 0.1, this.scale); // new one

        this.x = this.map.getWidth() / 8;
        this.y = this.map.getHeight() / 2;
        this.speed = 200;

        //this.i = 1; // old counter for animations

        //this.birdWidth = this.animations[this.i].width;
        //this.birdHeight = this.animations[this.i].height; // old 
        this.birdWidth = this.animator.width - 9; // new
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
        const elapsed = this.game.clockTick;
        let deltaY = 0;
    
        if ((this.game.space && !this.spacePressed) || this.game.click) {
            deltaY -= this.speed * elapsed;
            this.spacePressed = true;
            this.ticksBeforeFalling = 0;
            //this.i = 0;
        } else {
            this.ticksBeforeFalling = (this.ticksBeforeFalling || 0) + 1;
            
            if (this.ticksBeforeFalling > 60) {
                deltaY += this.speed * elapsed;
                //this.i = 2;
            } else if (this.ticksBeforeFalling <= 60) {
                deltaY -= this.speed * elapsed;
                //this.i = 0;
            }

            this.spacePressed = this.game.space;
        }
        
        const length = Math.sqrt(deltaY * deltaY);
        if (length !== 0) {
            const normalizedDeltaY = (deltaY / length) * this.speed * elapsed;

            this.y += normalizedDeltaY;
        }

        if (this.y > this.mapHeight) {
            this.dead = true;
        } else if (this.y < 0) {
            this.dead = true;
        }
        
        //this.birdWidth = this.animations[this.i].width;
        //this.birdHeight = this.animations[this.i].height; // old
        this.birdWidth = this.animator.width - 9; // new
        this.birdHeight = this.animator.height;

        this.updateBB();
    }

    draw(ctx) {
        //this.animations[this.i].drawFrame(this.game.clockTick, ctx, this.x, this.y); // old

        this.animator.drawFrame(this.game.clockTick, ctx, this.x, this.y); // new
        
        if (params.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
        }
    }
}