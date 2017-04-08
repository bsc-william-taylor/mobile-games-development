
import { Bullet, BulletType } from './bullet.js';

export var PLAYER_SCORE = function (start) {
  var score = start;
  return function (number) {
    score += number;
    return score;
  }
}(0);

export class Player {
  constructor(game) {
    this.projectile = new Bullet(game);
    this.game = game;
    this.timeout = true;
    this.duration = undefined;
    this.disableUpdate = false;
    this.deaths = 0;
  }

  setup() {
    this.projectile.setup();

    this.sprite = this.game.add.sprite(0, 650, 'character');
    this.sprite.animations.add('walk', [0, 1, 2, 3, 4, 5]);
    this.sprite.anchor.setTo(0.5, 1);

    this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);

    this.sprite.body.gravity.y = 400;
    this.sprite.body.collideWorldBounds = true;
  }

  exitScene() {
    this.sprite.body.collideWorldBounds = false;
    this.sprite.body.velocity.x = 100;
    this.disableUpdate = true;
  }

  setPosition(x, y) {
    this.sprite.x = x;
    this.sprite.y = y;
  }

  switchProjectile() {
    this.projectile.switchType();
  }

  update(pointer, level, overHud)  {
    if (!this.disableUpdate) {
      if (pointer.msSinceLastClick <= 250 && this.sprite.body.velocity.y == 0.0) {
        this.sprite.body.velocity.y = -500;
        pointer.msSinceLastClick = 500;
      } else {
        pointer.msSinceLastClick = 500;
      }

      if (pointer.isDown && !overHud) {
        this.duration = pointer.duration;
      }

      if (pointer.isUp) {
        if (this.duration != undefined && this.duration > 250 && this.sprite.visible) {
          this.projectile.fire(this.sprite.x,
            this.sprite.y, this.duration,
            this.sprite.scale.x,
            parseInt(pointer.worldX),
            parseInt(pointer.worldY)
          );
        } else if (this.duration < 250 && this.duration != undefined) {
          this.worldX = parseInt(pointer.worldX);
          this.worldY = parseInt(pointer.worldY);
        }

        this.duration = undefined;
      }


      if (this.worldX > parseInt(this.sprite.x + (this.sprite.width / 2))) {
        this.sprite.animations.play('walk', 10, true);
        this.sprite.body.velocity.x = 150;
        this.actionTaken = true;

        if (this.sprite.scale.x == -1) {
          this.sprite.scale.x = 1;
        }
      } else if (this.worldX < parseInt(this.sprite.x - (this.sprite.width / 2))) {
        this.sprite.animations.play('walk', 10, true);
        this.sprite.body.velocity.x = -150;

        if (this.sprite.scale.x == 1) {
          this.sprite.scale.x = -1;
        }
      } else {
        this.sprite.animations.stop('walk', 0);
        this.sprite.body.velocity.x = 0;
      }
    }

    this.projectile.update(this.sprite.x, this.sprite.y, this.sprite.visible);
  }

  getBulletColour() {
    switch (this.projectile.activeBullet) {
      case BulletType.Green: return "0x00FF00";
      case BulletType.Black: return "0x000000";
      case BulletType.Red: return "0xFF0000";

      default: break;
    }

    return "0xFFFFFF";
  }

  isAlive() {
    return this.sprite.visible;
  }

  getScore() {
    return PLAYER_SCORE(0);
  }

  getBulletSprite() {
    return this.projectile.getActiveSprite();
  }
}
