

import BootstrapLevels from './stages/levels/levels.js';
import Controls from './stages/ui/controls.js';
import Credits from './stages/ui/credits.js'
import Scores from './stages/ui/scores.js';
import Menu from './stages/ui/menu.js';

import Preload from './stages/preload.js';
import Boot from './stages/boot.js';

const Application = {
  canvasParentElement: "",
  canvasSize: [1920, 1080],
  canvasType: Phaser.AUTO,
  debug: true,
  phaser: null,

  start: function(array) {
    this.phaser = new Phaser.Game(
      this.canvasSize[0],
      this.canvasSize[1],
      this.canvasType,
      this.canvasParentElement,
      this.canvasCallbacks
    );

    for (var i = 0; i < array.length; ++i) {
      this.phaser.state.add(array[i].key, array[i].template);
    }

    this.phaser.state.start(array[0].key);
  },

  main: function() {
    window.addEventListener("DOMContentLoaded", () => {
      Application.start([
        Boot(Application),
        Preload(Application),
        Menu(Application),
        Credits(Application),
        Scores(Application),
        Controls(Application),
        ...BootstrapLevels(Application)
      ]);
    }
  );
}()
}
