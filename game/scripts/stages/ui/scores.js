
import { ScoreBoard } from '../../actors/scores.js';
import { ButtonSet } from '../../actors/buttons.js';
import { endpoint } from '../../http/http.js';

export default app => {
  Highscores.application = app;
  return {
    key: 'Highscores',
    template: Highscores
  }
}

export class Highscores {
  constructor() {
    this.scoreBoardUrl = endpoint('/score/GetScores/');
    this.scoreBoard = null;
  }

  preload() {
    this.game = Highscores.application.phaser;
    this.scoreBoard = new ScoreBoard(this.game, this.scoreBoardUrl);
  }

  create() {
    this.background = this.game.add.sprite(0, 0, 'city_background');
    this.background.height = 1080;
    this.background.width = 1920;

    this.buttons = new ButtonSet(Highscores.application.phaser);
    this.buttons.pushButton("BACK", 30, 30, 'back', this.goback, this);

    this.title = this.game.add.text(0, 50, "Highscores",
    { font: "100px Comic Sans MS", fill: "#FDFDFD", align: "center" }
  );

  this.title.x = this.game.world.centerX - this.title.width / 2;
  this.scoreBoard.createNewsBoard("news");
  this.scoreBoard.populateNewsBoard(5);

  this.sprite_right = this.game.add.sprite(550, 160, 'character');
  this.sprite_right.animations.add('walk', [0, 1, 2, 3, 4, 5]);
  this.sprite_right.animations.play('walk', 10, true);

  this.sprite_left = this.game.add.sprite(1350, 160, 'character');
  this.sprite_left.animations.add('walk', [0, 1, 2, 3, 4, 5]);
  this.sprite_left.animations.play('walk', 10, true);
  this.sprite_left.scale.x = -1;
}

goback() {
  this.game.state.start('Menu');
}

render() {
  if (Highscores.application.debug) {
    this.game.time.advancedTiming = true;
    this.game.debug.text(this.game.time.fps || '--', 2, 14, "#000000");
  }
}
}
