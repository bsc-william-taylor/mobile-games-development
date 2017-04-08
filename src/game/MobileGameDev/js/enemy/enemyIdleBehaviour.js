
/**
 * The constructor which creates the EnemyIdleBehaviour class
 * 
 * @constructor
 * @author William Taylor & Jonathan Livingstone 
 * @version 1.0.0
 * @license Apache-2.0
 * @example 
 * // Creare a new Idle Behaviour for the enemy
 * this.enemyBehaviour = new EnemyIdleBehaviour();
 */
function EnemyIdleBehaviour() {
    this.forward = false;
}

/**
 * The update function for the Idle Enemy Behaviour
 * 
 * @author William Taylor & Jonathan Livingstone 
 * @version 1.0.0
 * @license Apache-2.0
 * @example 
 * // Update the enemy behaviour
 * this.enemyBehaviour.update("enemy1", this.player);
 */
EnemyIdleBehaviour.prototype.update = function (sprite, player) {
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

/**
 * Tests whether an enemy has collided with a platform
 * 
 * @author William Taylor & Jonathan Livingstone 
 * @version 1.0.0
 * @license Apache-2.0
 * @example 
 * // some comment
 * if (this.enemyBehaviour.platformCollision("enemy1", this.platform)) {
 *      // Do stuff
 * }
 */
EnemyIdleBehaviour.prototype.platformCollision = function (sprite, platform) {
    this.platform = platform;
}

/**
 * Tests whether an enemy has collided with the Player
 * 
 * @author William Taylor & Jonathan Livingstone 
 * @version 1.0.0
 * @license Apache-2.0
 * @example 
 * if (this.enemyBehaviour.playerCollision("enemy1", this.platform)) {
 *      // Do stuff
 * }
 */
EnemyIdleBehaviour.prototype.playerCollision = function (sprite, player) {
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