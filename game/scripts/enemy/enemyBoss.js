
export class EnemyBoss {
  constructor(game, healthPoints) {
    this.hitsToKill = healthPoints;
    this.type = ENEMY_TYPES.RED;
    this.alive = true;
    this.game = game;
    this.hits = 0;
  }

  setup(x, y, ID) {
    this.sprite = this.game.add.sprite(x, y, ID);
    
    this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    this.behaviour = new EnemyIdleBehaviour();
    this.alive = true;

    this.sprite.body.collideWorldBounds = true;
    this.sprite.body.gravity.y = 400;
    this.sprite.body.maxVelocity.x = 50;
  }

  isDead() {
    return !this.alive;
  }

  kill() {
    this.hits++;

    if (this.hits >= this.hitsToKill) {
      this.sprite.visible = false;
      this.alive = false;
    } else {
      this.alive = true;
    }
  }

  update(player, walls, bullet) {
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
          PLAYER_SCORE(100);
          instance.kill();
        } else {
          PLAYER_SCORE(-1);
        }
      }

      this.game.physics.arcade.collide(this.sprite, bullet.getActiveSprite(), bulletHandle);
      this.game.physics.arcade.collide(this.sprite, player, playerHandler);
      this.game.physics.arcade.collide(this.sprite, walls, blockHandler);

      instance.behaviour.update(instance.sprite, player);
    }
  }
}
