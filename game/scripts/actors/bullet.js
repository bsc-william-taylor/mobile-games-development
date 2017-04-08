
import { Music } from './music.js';

export const BulletType = {
  Green: 0,
  Red: 1,
  Black: 2
}

export class Bullet {
  constructor(game) {
    this.activeBullet = BulletType.Green;
    this.game = game;
    this.sprites = [];
  }

  setup() {
    this.sprites = [
      this.game.add.sprite(-100, -100, "bullet"),
      this.game.add.sprite(-100, -100, "bullet1"),
      this.game.add.sprite(-100, -100, "bullet2")
    ]

    for (var i = 0; i < 3; i++) {
      this.game.physics.enable(this.sprites[i], Phaser.Physics.ARCADE);

      this.sprites[i].body.velocity.x = 0;
      this.sprites[i].body.velocity.y = 0;
      this.sprites[i].body.bounce.setTo(0.7, 0.7);
      this.sprites[i].height = 25;
      this.sprites[i].width = 25;
    }
  }

  handleEnemyCollision(obj1, obj2, type) {
    this.reset(this.activeBullet);
    return (this.activeBullet == type);
  }

  getActiveSprite() {
    return this.sprites[this.activeBullet];
  }

  reset(index) {
    this.sprites[index].body.collideWorldBounds = false;
    this.sprites[index].body.velocity.x = 0;
    this.sprites[index].body.velocity.y = 0;
    this.sprites[index].body.gravity.y = 0;
    this.sprites[index].x = -100;
    this.sprites[index].y = -100;
  }

  fire(x, y, duration, direction, pointer_x, pointer_y) {
    if (duration > 2000) duration = 2000;

    var mag = duration * (2.0 / 2000.0);

    var x_mag = (pointer_x - x) * mag;
    var y_mag = (pointer_y - y) * mag;

    this.sprites[this.activeBullet].body.velocity.y = 5 * y_mag;
    this.sprites[this.activeBullet].body.velocity.x = 5 * x_mag;
    this.sprites[this.activeBullet].body.collideWorldBounds = true;
    this.sprites[this.activeBullet].body.gravity.y = 300;
    this.sprites[this.activeBullet].x = x - 25 / 2;
    this.sprites[this.activeBullet].y = y - 50;

    Music.play(this.game, "fire");
  }

  update(player_x, player_y, blocks, playerAlive) {
    if (playerAlive == false) {
      this.reset(this.activeBullet);
    }
  }

  switchType() {
    this.reset(this.activeBullet);
    this.activeBullet++;

    if (this.activeBullet > 2) {
      this.activeBullet = 0;
    }
  }
}
