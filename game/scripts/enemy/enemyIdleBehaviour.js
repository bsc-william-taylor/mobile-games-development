
export class EnemyIdleBehaviour {
  constructor() {
    this.forward = false;
  }

  update(sprite, player) {
    if (this.platform) {
      if (player.visible) {
        var vel = sprite.body.velocity.x;
        if (this.forward && vel == -50 || vel == 0) {
          sprite.body.velocity.x = 50;
        }

        if (!this.forward && vel == 50 || vel == 0) {
          sprite.body.velocity.x = -50;
        }

        if (sprite.x <= this.platform.x) {
          this.forward = true;
        }

        if (sprite.x + sprite.width >= this.platform.x + this.platform.width) {
          this.forward = false;
        }

        if (sprite.x <= 0) {
          sprite.body.velocity.x = 50;
          this.forward = true;
        } else if (sprite.x + sprite.width >= 1280) {
          sprite.body.velocity.x = -50;
          this.forward = false;
        }
      } else {
        sprite.body.velocity.x = 50;
      }
    }
  }

  platformCollision(sprite, platform) {
    this.platform = platform;
  }

  playerCollision(sprite, player) {
    player.body.velocity.x = 0;
    player.body.gravity.y = 0;
    player.visible = false;
    player.y = -50;
    player.x = -50;

    setTimeout(function () {
      player.body.gravity.y = 400;
      player.visible = true;
      player.y = 650;
      player.x = 0;
    }, 3000);
  }

}
