
class Boot {
  preload() {
    const game = Boot.application.phaser;
    game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
    game.stage.backgroundColor = '#FFFFFF';
    game.load.image("loader", "data/img/loader.png");
    game.load.image("splash", "data/img/splash.jpg");
  }

  create() {
    Boot.application.phaser.state.start("Preload");
  }
}

export default (app) => {
  Boot.application = app;
  return {
    key: "Boot",
    template: Boot
  };
}
