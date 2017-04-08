
import { ButtonSet } from '../../actors/buttons.js';

export default (app) => {
  Credits.application = app;
  return {
    key: 'Credits',
    template: Credits
  }
}

export class Credits {
  preload() {
    this.game = Credits.application.phaser;
  }

  create() {
    this.background = this.game.add.sprite(0, 0, 'city_background');
    this.background.height = 1080;
    this.background.width = 1920;

    this.buttons = new ButtonSet(this.game);
    this.buttons.pushButton("BACK", 30, 30, 'back', this.goback, this);

    this.title = this.game.add.text(0, 50, "Credits",
    { font: "150px Comic Sans MS", fill: "#FDFDFD", align: "center" }
  );

  this.title.x = this.game.world.centerX - this.title.width / 2;

  this.footer = this.game.add.text(0, 900, '\"Made with JavaScript and Phaser 2.4.7 only\"',
  { font: "40px Comic Sans MS", fill: "#FDFDFD", align: "center" }
);

this.footer.x = this.game.world.centerX - this.footer.width / 2;

this.jonathon = this.game.add.button(500, 350, 'jonathan', this.jonathonPress, this);
this.jonathon.height = 300;
this.jonathon.width = 300;

this.jonathonText = this.game.add.text(450, 700, "B00236297\n  Did the physics, levels design, and input",
{ font: "20px Comic Sans MS", fill: "#FDFDFD", align: "center" }
);

this.william = this.game.add.button(1120, 350, 'william', this.williamPress, this);
this.william.height = 300;
this.william.width = 300;

this.williamText = this.game.add.text(1080, 700, "B00235610\n  Did the server, http code, and loading",
{ font: "20px Comic Sans MS", fill: "#FDFDFD", align: "center" }
);
}

williamPress() {
  window.open("https://uk.linkedin.com/pub/william-taylor/66/179/32b");
}

jonathonPress() {
  window.open("https://uk.linkedin.com/in/jlivingstone94");
}

goback() {
  this.game.state.start('Menu');
}

render() {
  if (Credits.application.debug) {
    this.game.time.advancedTiming = true;
    this.game.debug.text(this.game.time.fps || '--', 2, 14, "#33cc33");
  }
}
}
