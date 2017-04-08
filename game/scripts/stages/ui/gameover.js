

var MobileGame = MobileGame || {};

MobileGame.GameOver = function () { }

MobileGame.GameOver.prototype = {
  init: function (params) {
    this.playersScore = params;
    PLAYER_SCORE(-this.playersScore);
  },

  preload: function () {
    this.game = Application.phaser;
    this.game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
  },

  create: function () {
    if (!this.playersScore) this.playersScore = 100;
    this.background = this.game.add.sprite(0, 0, 'city_background');

    this.title = this.game.add.text(0, 50, "Game Over",
    { font: "120px Comic Sans MS", fill: "#FDFDFD", align: "center" }
  );

  this.title.x = this.game.world.centerX - this.title.width / 2;

  this.back = this.game.add.button(30, 30, 'back', this.backPress, this);
  this.back.onInputDown.add(this.backPress, this);
  this.back.height /= 1.5;
  this.back.width /= 1.5;

  this.score = this.game.add.text(0, 250, "Your Score was " + this.playersScore.toString(),
  { font: "60px Comic Sans MS", fill: "#FDFDFD", align: "center" }
);

this.score.x = this.game.world.centerX - this.score.width / 2;

this.buttons = new ButtonSet(this.game);
this.buttons.pushButton("SCORES", this.game.world.centerX - 110, 550, 'button', this.highScore, this);
this.buttons.setButtonSetSize(220, 80);

this.buttons.attachText("SCORES", "View Highscores", "22px Comic Sans MS");

var score = this.playersScore.toString();

this.timerID = setTimeout(function () {
  var name = (prompt("Enter your name"));

  if (name) {
    var postRequest = new HTTP_PostRequest("http://52.30.3.233:3002/score/postScore/");
    var body = {
      "name": name.toString(),
      "highscore": score,
      "service": "VERSION1"
    }

    postRequest.send(body);
  }
}, 1000);

Music.stop("level");
Music.play("gameover");
},

highScore: function () {
  clearTimeout(this.timerID);

  Music.stop("gameover");
  Music.play("menu", true);

  this.game.state.start("Highscores");
},

backPress: function () {
  clearTimeout(this.timerID);

  Music.stop("gameover");
  Music.play("menu", true);

  this.game.state.start("Menu");
},

render: function () {
  if (Application.debug) {
    this.game.time.advancedTiming = true;
    this.game.debug.text(this.game.time.fps || '--', 2, 14, "#000000");
  }
}
}
