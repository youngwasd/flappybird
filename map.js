class Map {
    constructor(game, x, y, width, height) {
        Object.assign(this, {game, x, y, width, height});
        this.background = ASSET_MANAGER.getAsset("./sprites/map.png");
    }

    update() {

    }

    draw(ctx) {
        ctx.drawImage(this.background, this.x, this.y, this.width, this.height);
    }
}