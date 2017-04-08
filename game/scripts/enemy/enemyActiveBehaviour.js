
export class EnemyActiveBehaviour {
  constructor() {
    this.onPlayerPlatform = false;
    this.setSpeed = false;
  }

  moveTowards(dest_x, sprite) {
    if (dest_x >= sprite.x) {
      sprite.body.velocity.x = 50;
    } else if (dest_x < sprite.x) {
      sprite.body.velocity.x = -50;
    }
  }

  update(sprite, player) {
    if (this.currentPlatform) {
      if (player.visible) {
        if (this.currentPlatform.y == player.y) {
          this.moveTowards(player.x, sprite);
        } else {
          if (!this.setSpeed) {
            this.setSpeed = true;
            this.moveTowards(player.x, sprite);
          }
        }
      } else {
        sprite.body.velocity.x = 50;
      }

      if (sprite.x <= 0) {
        sprite.body.velocity.x = 50;
      } else if (sprite.x + sprite.width >= 1280) {
        sprite.body.velocity.x = -50;
      }
    }
  }

  platformCollision(sprite, platform) {
    if (this.currentPlatform != platform) {
      this.currentPlatform = platform;
      this.setSpeed = false;
    }
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
