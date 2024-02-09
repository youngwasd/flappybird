// This game shell was happily modified from Googler Seth Ladd's "Bad Aliens" game and his Google IO talk in 2011

class GameEngine {
    constructor(options) {
        // What you will use to draw
        // Documentation: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
        this.ctx = null;

        // Everything that will be updated and drawn each frame
        this.entities = [];

        // Information on the input
        this.space = false;
        this.click = false;

        this.gamepad = null;

        // Options and the Details
        this.options = options || {
            debugging: false,
        };
    };

    init(ctx) {
        this.ctx = ctx;
        this.startInput();
        this.timer = new Timer();
    };

    start() {
        this.running = true;
        const gameLoop = () => {
            this.loop();
            requestAnimFrame(gameLoop, this.ctx.canvas);
        };
        gameLoop();
    };

    startInput() {
        this.keyboardActive = false;
        this.mouseActive = false;
    
        const that = this;
        var getXandY = function (e) {
            var x = e.clientX - that.ctx.canvas.getBoundingClientRect().left - 23.5;
            var y = e.clientY - that.ctx.canvas.getBoundingClientRect().top - 23.5;
    
            x = Math.floor(x / 39.55);
            y = Math.floor(y / 39.55);

            if (x < 0 || x > 18 || y < 0 || y > 18) return null;
    
            return { x: x, y: y };
        }

        const keydownListener = (e) => {
            this.keyboardActive = true;
            switch (e.code) {
                case "Space":
                    this.space = true;
                    break;
            }
        };

        const keyupListener = (e) => {
            this.keyboardActive = false;
            switch (e.code) {
                case "Space":
                    this.space = false;
                    break;
            }
        };

        const mouseclickListener = (e) => {
            this.mouseActive = true;
            this.click = getXandY(e);
        };

        this.mouseclick = mouseclickListener;
        this.keydown = keydownListener;
        this.keyup = keyupListener;
    
        this.ctx.canvas.addEventListener("keydown", this.keydown, false);
        this.ctx.canvas.addEventListener("keyup", this.keyup, false);
        this.ctx.canvas.addEventListener("click", this.mouseclick, false);
    };
    

    addEntity(entity) {
        this.entities.push(entity);
    };

    draw() {
        // Clear the whole canvas with transparent color (rgba(0, 0, 0, 0))
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        // Draw latest things first
        for (let i = this.entities.length - 1; i >= 0; i--) {
            this.entities[i].draw(this.ctx, this);
        }

        this.camera.draw(this.ctx);
    };

    gamepadUpdate() {
        this.gamepad = navigator.getGamepads()[0];
        let gamepad = this.gamepad;

        if (gamepad != null && !this.keyboardActive) {
            this.space = gamepad.buttons[0].pressed || (this.gamepad.axes[1] < -0.5);
        }
    }

    update() {
        params.DEBUG = document.getElementById("debug").checked;

        let entitiesCount = this.entities.length;

        this.gamepadUpdate();

        for (let i = 0; i < entitiesCount; i++) {
            let entity = this.entities[i];

            if (!entity.dead) {
                entity.update();
            }
        }

        this.camera.update();

        for (let i = this.entities.length - 1; i >= 0; --i) {
            if (this.entities[i].dead) {
                this.entities.splice(i, 1);
            }
        }
    };

    loop() {
        this.clockTick = this.timer.tick();
        this.update();
        this.draw();
        this.click = null;
    };
};
