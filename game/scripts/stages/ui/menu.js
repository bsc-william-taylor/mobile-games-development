
import { ButtonSet } from '../../actors/buttons.js';
import { NewsBoard } from '../../actors/news.js';
import { Music } from '../../actors/music.js';

import { endpoint } from '../../http/http.js';

export default (app) => {
  MainMenu.application = app;
  return {
    key: 'Menu',
    template: MainMenu
  }
}

export class MainMenu {
  preload() {
    this.game = MainMenu.application.phaser;

    if (!this.newsBoard) {
      this.newsBoard = new NewsBoard(endpoint("/news/GetNews/"), this.game);
    }
  }

  handlePlayPress(s, s1, s2) {
    setTimeout(() => this.game.state.start("Controls"), 500);
  }

  handleHighscorePress(s, s1, s2) {
    setTimeout(() => this.game.state.start("Highscores"), 500);
  }

  handleCreditsPress(s, s1, s2) {
    setTimeout(() => this.game.state.start("Credits"), 500);
  }

  create() {
    var game = MainMenu.application.phaser;
    var background = game.add.sprite(0, 0, 'city_background');
    var title = game.add.text(0, 50, "An Edge of 5 Kingdoms",
    { font: "100px Comic Sans MS", fill: "#FDFDFD", align: "center" }
  );

  title.x = game.world.centerX - title.width / 2;

  background.height = 1080;
  background.width = 1920;

  this.buttons = new ButtonSet(this.game);
  this.buttons.pushButton("PLAY", 200, 300, 'button', this.handlePlayPress, this);
  this.buttons.pushButton("SCORES", 200, 500, 'button', this.handleHighscorePress, this);
  this.buttons.pushButton("CREDITS", 200, 700, 'button', this.handleCreditsPress, this);
  this.buttons.setButtonSetSize(350, 130);

  this.buttons.attachText("PLAY", "Play", "60px Comic Sans MS");
  this.buttons.attachText("SCORES", "Scores", "60px Comic Sans MS");
  this.buttons.attachText("CREDITS", "Credits", "60px Comic Sans MS");

  this.newsBoard.createNewsBoard("news");
  this.newsBoard.populateNewsBoard(8);

  this.optionButtons = new ButtonSet(this.game);
  this.optionButtons.pushButton("FULLSCREEN", 1920 - 120, 950, 'fullscreen', this.fullscreen, this);
  this.optionButtons.pushButton("AUDIO", 1920 - 120, 825, 'audio', this.mute, this);
  this.optionButtons.setButtonSetSize(100, 100);

  Music.stop("level");
}

fullscreen() {
  this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
  this.game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
  this.game.scale.refresh();

  if (this.game.scale.isFullScreen) {
    this.game.scale.stopFullScreen();
  } else {
    this.game.scale.startFullScreen();
  }
}

mute() {
  Music.mute();
}

render() {
  if (MainMenu.application.debug) {
    this.game.time.advancedTiming = true;
    this.game.debug.text(this.game.time.fps || '--', 2, 14, "#000000");
  }
}
}
