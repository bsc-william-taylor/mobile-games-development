
import { ButtonSet } from '../../actors/buttons.js';
import { Bullet } from '../../actors/bullet.js';
import { Player } from '../../actors/player.js';
import { Level } from '../../actors/level.js';
import { Music } from '../../actors/music.js';

import { LevelLayout } from './levels.js';

export default app => {
    Level2.application = app;
    return {
      key: 'LV2',
      template: Level2
    }
}

export class Level2 {
  preload() {
    this.pointer = Level2.application.phaser.input.activePointer;
    this.pointer.y = 650;
    this.pointer.x = 0;

    this.game = Level2.application.phaser;

    this.levelLayout = new Level(this.game, LevelLayout.LV2, "data/lvl/level2.json");
    this.uiButtons = new ButtonSet(this.game);
    this.player = new Player(this.game);
  }

  create() {
    this.levelLayout.createWorld();
    this.player.setup();

    this.uiButtons.pushButton("MENU", 30, 30, 'button', this.handleBackButtonPress, this);
    this.uiButtons.pushButton("SWITCH", 1880 - 200, 30, 'button', this.handleToggleButtonPress, this, "0x00FF00");
    this.uiButtons.setButtonSetSize(200, 75);

    this.uiButtons.attachText("MENU", "Menu", "30px Comic Sans MS");
    this.uiButtons.attachText("SWITCH", "Change Bullet", "23px Comic Sans MS");
    this.uiButtons.onUp = buttons => {
      buttons[1].button.tint = this.player.getBulletColour();
    }

    Music.play(Level2.application.phaser, "level", true);
  }

  update() {
    this.levelLayout.update(this.player, this.blockGroup);
    this.player.update(Level2.application.phaser.input.activePointer, this.levelLayout, this.uiButtons.isOver);
  }

  render() {
    if (Level2.application.debug) {
      this.game.time.advancedTiming = true;
      this.game.debug.text(this.game.time.fps || '--', 2, 14, "#000000");
    }
  }

  handleToggleButtonPress() {
    this.player.switchProjectile();
  }

  handleBackButtonPress() {
    Music.play("menu", true);

    this.levelLayout.stopSpawningEnemies();
    this.game.state.start("Menu");
  }
}
