class Pipe {
    constructor(game, bird, map) {
        Object.assign(this, {game, bird, map});

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/pipes.png");
        this.animator = [];

        this.scale = 2;

        this.animator[0] = new Animator(this.spritesheet, 0, 0, 27, 330, 1, 0.2, this.scale);
        this.animator[1] = new Animator(this.spritesheet, 27, 0, 27, 330, 1, 0.2, this.scale);

        this.speed = 150;
        this.point = 0;

        this.pipeHeight = this.animator[0].height * this.scale;
        this.pipeWidth = this.animator[0].width * this.scale;
        this.pipeX = this.map.getWidth();
        this.pipeY = 0;

        this.topPipeArray = [];
        this.botPipeArray = [];

        this.interval = setInterval(() => {
            this.pipes();
        }, 1500);

        this.updateBB();
    }

    updateBB() {
        this.topPipeArray.forEach(function(pipe) {
            pipe.topBB = new BoundingBox(pipe.x, pipe.y, pipe.width, pipe.height);
        });
    
        this.botPipeArray.forEach(function(pipe) {
            pipe.botBB = new BoundingBox(pipe.x, pipe.y, pipe.width, pipe.height);
        });
    };

    pipes() {
        if (this.game.camera.gameOver) return;

        // increase the interval of which pipes spawn after getting 30 points
        if (this.point === 30) {
            clearInterval(this.interval);
            this.interval = setInterval(() => {
                this.pipes();
            }, 1300);
        }

        // increase the speed of the pipes after 50 points
        if (this.point === 50) {
            this.speed += 25;
        }

        /**
         * get original y value subtract 1/4 of the pipeheight and multiply that by 1 or 3
         * to get a random value to shift the pipe up or down that is between 1/4 and 3/4 of the height
         * math.random = 0 -> pipeY - pipeheight / 4 * (1 + 0 * 2) = 0 - 165 * 1 = -165
         * math.random = 1 -> pipeY - pipeheight / 4 * (1 + 1 * 2) = 0 - 165 * 3 = -495
         */

        const rand = this.pipeY - (this.pipeHeight / 4) * (1 + Math.random() * 2);

        const opening = this.map.getWidth() / 8;

        const topPipe = {
            x: this.pipeX,
            y: rand,
            width: this.pipeWidth,
            height: this.pipeHeight,
            passed: false
        }
    
        this.topPipeArray.push(topPipe);
    
        const botPipe = {
            x: this.pipeX,
            y: rand + this.pipeHeight + opening,
            width: this.pipeWidth,
            height: this.pipeHeight,
            passed: false
        }
    
        this.botPipeArray.push(botPipe);
    }
    
    update() {
        if (this.game.camera.gameOver) {
            this.topPipeArray = [];
            this.botPipeArray = [];
        }

        const that = this;
        this.topPipeArray.forEach(function (pipe) {
            that.game.entities.forEach(function (entity) {
                if (entity.BB && pipe.topBB && pipe.topBB.collide(entity.BB)) {
                    if (entity instanceof Bird) {
                        that.game.camera.gameOver = true;
                        ASSET_MANAGER.playAsset("./sounds/hit.wav");
                    }
                }
            });
        });

        this.botPipeArray.forEach(function (pipe) {
            that.game.entities.forEach(function (entity) {
                if (entity.BB && pipe.botBB && pipe.botBB.collide(entity.BB)) {
                    if (entity instanceof Bird) {
                        that.game.camera.gameOver = true;
                        ASSET_MANAGER.playAsset("./sounds/hit.wav");
                    }
                }
            });
        });

        this.updateBB(); 
    }

    draw(ctx) {
        this.topPipeArray.forEach(function (pipe) {
            pipe.x -= this.speed * this.game.clockTick;
            this.animator[0].drawFrame(this.game.clockTick, ctx, pipe.x, pipe.y);

            if (!pipe.passed && (pipe.x + pipe.width) < this.bird.x && !this.game.camera.gameOver) {
                this.point++;
                pipe.passed = true;
                ASSET_MANAGER.playAsset("./sounds/point.wav");
            }
    
            if (params.DEBUG) {
                ctx.strokeStyle = 'Red';
                ctx.strokeRect(pipe.topBB.x, pipe.topBB.y, pipe.topBB.width, pipe.topBB.height);
            }
        }, this);
    
        this.botPipeArray.forEach(function (pipe) {
            pipe.x -= this.speed * this.game.clockTick;
            this.animator[1].drawFrame(this.game.clockTick, ctx, pipe.x, pipe.y);

            if (!pipe.passed && (pipe.x + pipe.width) < this.bird.x && !this.game.camera.gameOver) {
                pipe.passed = true; // point already incremented from top pipe just setting this pipe to be passed
            }
    
            if (params.DEBUG) {
                ctx.strokeStyle = 'Red';
                ctx.strokeRect(pipe.botBB.x, pipe.botBB.y, pipe.botBB.width, pipe.botBB.height);
            }
        }, this);
        
        this.updateBB();

        if (!this.game.camera.gameOver) {
            ctx.font = "40px Impact";
            ctx.fillStyle = "white";
            ctx.strokeStyle = "black";
            ctx.lineWidth = 2;
            ctx.strokeText(this.point, ctx.canvas.width / 2, 40);
            ctx.fillText(this.point, ctx.canvas.width / 2, 40);
        }
    }
}
