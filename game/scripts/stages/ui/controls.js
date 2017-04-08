
import { ButtonSet } from '../../actors/buttons.js';
import { Music } from '../../actors/music.js';

export default app => {
  Controls.application = app;
  return {
    key: "Controls",
    template: Controls
  };
}

export class Controls {
  preload() {
    this.game = Controls.application.phaser;
  }

  backPress() {
    this.game.state.start("Menu");
  }

  playPress() {
    Music.stop("menu");

    this.game.state.start("LV1");
  }

  create() {
    this.background = this.game.add.sprite(0, 0, 'city_background');
    this.background.height = 1080;
    this.background.width = 1920;

    this.title = this.game.add.text(0, 50, "Controls",
    { font: "150px Comic Sans MS", fill: "#FDFDFD", align: "center" }
  );

  this.title.x = this.game.world.centerX - this.title.width / 2;

  this.buttons = new ButtonSet(this.game);
  this.buttons.pushButton("START", this.game.world.centerX - 175, 800, 'button', this.playPress, this);
  this.buttons.setButtonSetSize(350, 130);

  this.buttons.attachText("START", "Start Game", "50px Comic Sans MS");

  this.tutorialImages = [];

  let x = 260;
  for (let i = 0; i < 3; i++) {
    this.tutorialImages[i] = this.game.add.sprite(x, 350, "controls"+ (1+i).toString());
    this.tutorialImages[i].width = 400;
    this.tutorialImages[i].height = 350;

    x += 500;
  }

  this.buttons.pushButton("BACK", 30, 30, 'back', this.backPress, this);
}

render() {
  if (Controls.application.debug) {
    this.game.time.advancedTiming = true;
    this.game.debug.text(this.game.time.fps || '--', 2, 14, "#000000");
  }
}
}
