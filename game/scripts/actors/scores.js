
import { HttpGetRequest } from '../http/httpGetRequest.js';

export class ScoreBoard {
  constructor(phaser, httpLink) {
    this.newsRequest = new HttpGetRequest(httpLink);
    this.newsStories = [];
    this.newsLabels = [];
    this.phaser = phaser;
  }

  createNewsBoard(backPlateID) {
    this.newsBackPlate = this.phaser.add.sprite(900, 200, backPlateID);
    this.newsBackPlate.height = 850;
    this.newsBackPlate.width = 800;
    this.newsBackPlate.x = this.phaser.world.centerX - 800 / 2;

    this.newsHeader = this.phaser.add.text(1050, 220, "Top 10 Highscores",
    { font: "60px Comic Sans MS", fill: "#FFFFFF", align: "center" }
  );

  this.newsHeader.height = 100;
  this.newsHeader.width = 500;
  this.newsHeader.x = this.phaser.world.centerX - 500 / 2;

  var _this = this;

  this.newsRequest.onReceived(function (d) {
    if (_this.newsStories.length == 0) {
      _this.newsStories = d;
      _this.populateNewsBoard(10);
    }
  });

  this.newsRequest.send();
}

populateNewsBoard(maxStories) {
  for (let i = 0; i < this.newsStories.length && i < maxStories; i++) {
    this.newsLabels[(i * 2)] = this.phaser.add.text(700, 350 + (i * 60), this.newsStories[i].Name.S,
    { font: "50px Comic Sans MS", fill: "#FDFDFD", align: "left" }
  );

  this.newsLabels[(i * 2) + 1] = this.phaser.add.text(1100, 350 + (i * 60), this.newsStories[i].Highscore.N,
  { font: "50px Comic Sans MS", fill: "#FDFDFD", align: "left" }
);
}
}
}
