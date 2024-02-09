const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./sprites/bird.png");
ASSET_MANAGER.queueDownload("./sprites/map.png");
ASSET_MANAGER.queueDownload("./sprites/pipes.png");
ASSET_MANAGER.queueDownload("./sprites/playButton.png");
ASSET_MANAGER.queueDownload("./sprites/title.png");

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");

	gameEngine.init(ctx);

	new SceneManager(gameEngine);

	gameEngine.start();
});
