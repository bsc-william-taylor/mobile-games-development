
/**
 * This is the constructor to create the enemies behaviour
 * 
 * @constructor
 * @author William Taylor & Jonathan Livingstone 
 * @version 1.0.0
 * @license Apache-2.0
 * @example 
 * // Create the enemies behaviour
 * this.enemyBehaviour = new EnemyActiveBehhaviour();
 */
function EnemyActiveBehaviour() {
    /**
     * A boolean which tells the enemy if their on the same platform as the player
     * 
     * @author William Taylor & Jonathan Livingstone 
     * @version 1.0.0
     * @public 
     */
    this.onPlayerPlatform = false;

    /**
     * Whether the enemy currently has their speed set or not
     * 
     * @author William Taylor & Jonathan Livingstone 
     * @version 1.0.0
     * @public 
     */
    this.setSpeed = false;
}

/**
 * This function will make the enemy move towards a certain x-coord
 * 
 * @author William Taylor & Jonathan Livingstone 
 * @version 1.0.0
 * @license Apache-2.0
 * @params { int } dest_x - The x destination value
 * @params { Phaser.Sprite } sprite - The sprite we will be moving
 * @example 
 * // Make the enemy move towards the x-point 400
 * instance.behavious.moveTowards(400, sprite);
 */
EnemyActiveBehaviour.prototype.moveTowards = function (dest_x, sprite) {
    if (dest_x >= sprite.x) {
        sprite.body.velocity.x = 50;
    } else if (dest_x < sprite.x) {
        sprite.body.velocity.x = -50;
    }
}

/**
 * This is the main update code for the behaviour
 * 
 * @author William Taylor & Jonathan Livingstone 
 * @version 1.0.0
 * @license Apache-2.0
 * @params { Phaser.Sprite } sprite - The sprite we will be moving
 * @params { Player } player - The player the enemy will want to kill
 * @example 
 * // Update the enemy's behavior
 * instance.behavior.update(sprite, this.player);
 */
EnemyActiveBehaviour.prototype.update = function (sprite, player) {
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

/**
 * Description
 * 
 * @author William Taylor & Jonathan Livingstone 
 * @version 1.0.0
 * @license Apache-2.0
 * @params { Phaser.Sprite } sprite - The sprite we will be moving.
 * @params { Phaser.Sprite } platform - The platform the enemy is on.
 * @example 
 * // some comment
 * some code
 */
EnemyActiveBehaviour.prototype.platformCollision = function (sprite, platform) {
    if (this.currentPlatform != platform) {
        this.currentPlatform = platform;
        this.setSpeed = false;
    }
}

/**
 * Test whether the enemy collided with the player or not
 * 
 * @author William Taylor & Jonathan Livingstone 
 * @version 1.0.0
 * @license Apache-2.0
 * @example 
 * // some comment
 * some code
 */
EnemyActiveBehaviour.prototype.playerCollision = function (sprite, player) {
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