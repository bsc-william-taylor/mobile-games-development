

import { storeLevel, levelsStored } from './levels/levels.js';
import { HttpLocalRequest } from '../http/httpLocalRequest.js';
import { HttpPostRequest } from '../http/httpPostRequest.js';
import { endpoint } from '../http/http.js';
import { Music } from '../actors/music.js';

export default (app) => {
  Preload.application = app;
  return { key: "Preload", template: Preload };
}

export class Preload {
  constructor() {
    this.startingState = 'Menu';
  }

  create() {
    this.game.input.addPointer();
    this.game.input.addPointer();

    if (!this.skip || this.continue && Music.hasDecodedTracks()) {
      Music.play(this.game, "menu", true);

      this.game.state.start(this.startingState);
    }
  }

  preload() {
    this.game = Preload.application.phaser;
    this.game.input.MAX_POINTERS = 1;

    this.background = this.game.add.sprite(0, 0, "splash");
    this.preloadBar = this.game.add.sprite(998, 900, "loader");
    this.preloadBar.anchor.setTo(0.5);

    this.game.load.setPreloadSprite(this.preloadBar);
    this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
    this.game.scale.refresh();

    var assetFile = new HttpLocalRequest("data/load.json");
    var jsonText = assetFile.grab(true);
    var instance = this;

    this.continue = false;

    for (var i = 0; i < jsonText.assets.length; i++) {
      var type = jsonText.assets[i].type;

      switch (type) {
        case "spritesheet": this.game.load.spritesheet(jsonText.assets[i].ID, jsonText.assets[i].filename, 81, 110, 11); break;
        case "image": this.game.load.image(jsonText.assets[i].ID, jsonText.assets[i].filename); break;
        case "audio": this.game.load.audio(jsonText.assets[i].ID, jsonText.assets[i].filename); break;

        default: console.log("Unsupported file type"); break;
      }
    }

    var requests = new HttpPostRequest(endpoint("/level/getLevel"));
    var instance = this;

    requests.setCallback(function (data) {
      storeLevel(data);

      const count = levelsStored();

      if (count < 5) {
        requests.send({ "level": `level${count+1}.json` });
      } else {
        instance.continue = true;
      }
    });


    this.skip = requests.send({ "level": "level1.json" });
  }
}
