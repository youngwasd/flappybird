const gameEngine = new GameEngine();
const ASSET_MANAGER = new AssetManager();

// sprites
ASSET_MANAGER.queueDownload("./sprites/bird.png");
ASSET_MANAGER.queueDownload("./sprites/map.png");
ASSET_MANAGER.queueDownload("./sprites/pipes.png");
ASSET_MANAGER.queueDownload("./sprites/playButton.png");
ASSET_MANAGER.queueDownload("./sprites/title.png");
ASSET_MANAGER.queueDownload("./sprites/getReady.png");
ASSET_MANAGER.queueDownload("./sprites/scoreCard.png");
ASSET_MANAGER.queueDownload("./sprites/silver.png");
ASSET_MANAGER.queueDownload("./sprites/gold.png");
ASSET_MANAGER.queueDownload("./sprites/game_over.png");

// music
ASSET_MANAGER.queueDownload("./sounds/die.wav");
ASSET_MANAGER.queueDownload("./sounds/hit.wav");
ASSET_MANAGER.queueDownload("./sounds/point.wav");
ASSET_MANAGER.queueDownload("./sounds/jump.wav");

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");

	gameEngine.init(ctx);
	new SceneManager(gameEngine);
	gameEngine.start();
});
