class Pipe {
    constructor(game, bird, x, tY, bY) {
        Object.assign(this, {game, bird, x, tY, bY});

    
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/pipes.png");
        this.animator = [];

        this.scale = 2;

        this.animator[0] = new Animator(this.spritesheet, 0, 0, 28, 164, 1, 0.2, this.scale);
        this.animator[1] = new Animator(this.spritesheet, 28, 0, 28, 164, 1, 0.2, this.scale);

        this.bottomPipeY = 450;
        this.topPipeY = -50;

        this.speed = 150;
        this.point = 0;
        this.scored = false;

        this.updateBB();
    }

    updateBB() {
        this.lastTopBB = this.topBB;
        this.lastBotBB = this.botBB;
        this.topBB = new BoundingBox(this.x, this.topPipeY, this.animator[0].width * this.scale, this.animator[0].height * this.scale);
        this.botBB = new BoundingBox(this.x, this.bottomPipeY, this.animator[1].width * this.scale, this.animator[1].height * this.scale);
    };

    update() {
        this.x -= this.speed * this.game.clockTick;

        if (this.x < 250 && !this.bird.dead && !this.scored) {
            this.point++;
            this.scored = true;
        }

        if (this.x <= -50) {
            this.x = 1330;
            this.scored = false;
        }

        const that = this;
        this.game.entities.forEach(function (entity) {
            if (entity.BB && that.topBB.collide(entity.BB)) {
                if (entity instanceof Bird) {
                    that.bird.dead = true;
                }
            } else if (entity.BB && that.botBB.collide(entity.BB)) {
                if (entity instanceof Bird) {
                    that.bird.dead = true;
                }
            }
        });

        this.updateBB();
    }

    draw(ctx) {
        this.animator[0].drawFrame(this.game.clockTick, ctx, this.x, this.topPipeY);
        this.animator[1].drawFrame(this.game.clockTick, ctx, this.x, this.bottomPipeY);

        if (params.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.topBB.x, this.topBB.y, this.topBB.width, this.topBB.height);

            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.botBB.x, this.botBB.y, this.botBB.width, this.botBB.height);
        }

        ctx.font = "30px Arial";
        ctx.fillStyle = "black";
        ctx.fillText("Score: " + this.point, 10, 50);
    }
}