import { HttpGetRequest } from '../http/httpGetRequest.js';

export class NewsBoard {
  constructor(httpLink, phaser) {
    this.newsRequest = new HttpGetRequest(httpLink);
    this.newsStories = [];
    this.newsLabels = [];
    this.phaser = phaser;
  }

  createNewsBoard(backPlateID) {
    this.newsBackPlate = this.phaser.add.sprite(650, 300, backPlateID);
    this.newsBackPlate.height = 550;
    this.newsBackPlate.width = 1050;

    this.newsHeader = this.phaser.add.text(750, 350, "News Board",
    { font: "80px Comic Sans MS", fill: "#FFFFFF", align: "center" }
  );

  this.newsHeader.height = 50;
  this.newsHeader.width = 200;
  this.newsRequest.onReceived(stories => {
    if (this.newsStories.length == 0) {
      this.newsStories = stories;
      this.populateNewsBoard(8);
    }
  });

  this.newsRequest.send();
}

populateNewsBoard(maxStories) {
  for (let i = 0; i < this.newsStories.length && i < maxStories; i++) {
    const header = "New Version";
    const text = "herewearetestingthelimitofthenewsfeedas";

    this.newsLabels[(i * 2)] = this.phaser.add.text(750, 425 + (i * 35), this.newsStories[i].Heading.S,
    { font: "30px Comic Sans MS", fill: "#FDFDFD", align: "left" }
  );

  this.newsLabels[(i * 2) + 1] = this.phaser.add.text(930, 425 + (i * 35), this.newsStories[i].Text.S,
  { font: "30px Comic Sans MS", fill: "#FDFDFD", align: "left" }
);
}
}
}
