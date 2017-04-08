
import { EnemyEmptyBehaviour } from './enemyEmptyBehaviour.js';
import { PLAYER_SCORE } from '../actors/player.js';
import { Music } from '../actors/music.js';

export const ENEMY_TYPES = {
  GREEN: 0,
  RED: 1,
  BLACK: 2
};

export class Enemy {
  constructor(game, texture, type) {
    this.behaviour = new EnemyEmptyBehaviour();
    this.game = game;
    this.type = type;
    this.sprite = (this.game.add.sprite(0, 0, texture));
    this.sprite.visible = false;
    this.alive = true;
  }

  update(player, walls, bullet, alive) {
    var instance = this;

    if (this.sprite.visible) {
      var playerHandler = function (ob1, ob2) {
        instance.behaviour.playerCollision(ob1, ob2);
        PLAYER_SCORE(-10);
      };

      var blockHandler = function (ob1, ob2) {
        instance.behaviour.platformCollision(ob1, ob2);
      };

      var bulletHandle = function (ob1, ob2) {
        if (bullet.handleEnemyCollision(ob1, ob2, instance.type)) {
          PLAYER_SCORE(2);
          instance.kill();
        } else {
          Music.play("fail", false);
          PLAYER_SCORE(-1);
        }
      }

      if (alive) {
        this.game.physics.arcade.collide(this.sprite, bullet.getActiveSprite(), bulletHandle);
        this.game.physics.arcade.collide(this.sprite, player, playerHandler);
      }

      this.game.physics.arcade.collide(this.sprite, walls, blockHandler);

      instance.behaviour.update(instance.sprite, player);
    }
  }

  isDead() {
    return(!this.alive);
  }

  kill() {
    this.sprite.visible = false;
    this.alive = false;

    Music.play("taptap", false);
  }

  spawn(x, y) {
    this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    this.alive = true;

    this.sprite.body.collideWorldBounds = true;
    this.sprite.body.gravity.y = 400;
    this.sprite.visible = true;
    this.sprite.x = x;
    this.sprite.y = y;
  }
}
