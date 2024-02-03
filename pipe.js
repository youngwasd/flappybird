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

        setInterval(() => {
            this.pipes();
        }, 2000);

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
        if (this.bird.dead) return; // stop making pipes

        const rand = this.pipeHeight / 4 - Math.random() * (this.pipeHeight / 2);

        let topPipe = {
            x: this.pipeX,
            y: rand - (this.pipeHeight / 2),
            width: this.pipeWidth,
            height: this.pipeHeight,
            passed: false
        }
    
        this.topPipeArray.push(topPipe);
    
        let botPipe = {
            x: this.pipeX,
            y: rand + (this.pipeHeight / 2) + this.map.getWidth() / 8,
            width: this.pipeWidth,
            height: this.pipeHeight,
            passed: false
        }
    
        this.botPipeArray.push(botPipe);
    }
    
    update() {
        const that = this;
        this.topPipeArray.forEach(function (pipe) {
            that.game.entities.forEach(function (entity) {
                if (entity.BB && pipe.topBB && pipe.topBB.collide(entity.BB)) {
                    if (entity instanceof Bird) {
                        that.bird.dead = true;
                    }
                }
            });
        });

        this.botPipeArray.forEach(function (pipe) {
            that.game.entities.forEach(function (entity) {
                if (entity.BB && pipe.botBB && pipe.botBB.collide(entity.BB)) {
                    if (entity instanceof Bird) {
                        that.bird.dead = true;
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

            if (!pipe.passed && (pipe.x + pipe.width) < this.bird.x && !this.bird.dead) {
                this.point++;
                pipe.passed = true;
            }
    
            if (params.DEBUG) {
                ctx.strokeStyle = 'Red';
                ctx.strokeRect(pipe.topBB.x, pipe.topBB.y, pipe.topBB.width, pipe.topBB.height);
            }
        }, this);
    
        this.botPipeArray.forEach(function (pipe) {
            pipe.x -= this.speed * this.game.clockTick;
            this.animator[1].drawFrame(this.game.clockTick, ctx, pipe.x, pipe.y);

            if (!pipe.passed && (pipe.x + pipe.width) < this.bird.x && !this.bird.dead) {
                pipe.passed = true; // point already incremented from top pipe just setting this pipe to be passed
            }
    
            if (params.DEBUG) {
                ctx.strokeStyle = 'Red';
                ctx.strokeRect(pipe.botBB.x, pipe.botBB.y, pipe.botBB.width, pipe.botBB.height);
            }
        }, this);
        
        this.updateBB();

        ctx.font = "30px Arial";
        ctx.fillStyle = "black";
        ctx.fillText("Score: " + this.point, 10, 50);
    }
}
