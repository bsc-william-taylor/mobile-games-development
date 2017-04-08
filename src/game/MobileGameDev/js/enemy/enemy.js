
/**
 * Enum for the type of enemy. This will change the bullet that
 * can kill the enemy and how the enemy looks.
 * @readonly
 * @enum { int }
 * @author William Taylor & Jonathan Livingstone 
 * @version 1.0.0
 * @license Apache-2.0
 */
var ENEMY_TYPES = {
    GREEN: 0,
    RED: 1,
    BLACK: 2
};

/**
 * This is the constructor to create an enemy
 * 
 * @constructor
 * @author William Taylor & Jonathan Livingstone 
 * @version 1.0.0
 * @license Apache-2.0
 * @param { Phaser.game } game - The instance of the phaser framework
 * @param { string } texture - The ID for the texture in the phaser framework
 * @param { ENEMY_TYPES } type - The type of enemy to spawn.
 * @example 
 * // Create an enemy
 * this.enemy = new Enemy();
 */
function Enemy(game, texture, type) {
    /**
     * Assign some enemy behavious to an enemy
     * 
     * @author William Taylor & Jonathan Livingstone 
     * @version 1.0.0
     * @public 
     */
    this.behaviour = new EnemyEmptyBehaviour();

    /**
     * Assign the Phaser Framework
     * 
     * @author William Taylor & Jonathan Livingstone 
     * @version 1.0.0
     * @public 
     */
    this.game = game;

    /**
     * Assign the type
     * 
     * @author William Taylor & Jonathan Livingstone 
     * @version 1.0.0
     * @public 
     */
    this.type = type;

    /**
     * Assign the sprite
     * 
     * @author William Taylor & Jonathan Livingstone 
     * @version 1.0.0
     * @public 
     */
    this.sprite = (this.game.add.sprite(0, 0, texture));

    /**
     * Set the sprite to be initially invisible
     * 
     * @author William Taylor & Jonathan Livingstone 
     * @version 1.0.0
     * @public 
     */
    this.sprite.visible = false;

    /**
     * Set the enemy to be currently alive
     * 
     * @author William Taylor & Jonathan Livingstone 
     * @version 1.0.0
     * @public 
     */
    this.alive = true;
}

/**
 * This is the main update function for the enmies
 * 
 * @author William Taylor & Jonathan Livingstone 
 * @version 1.0.0
 * @license Apache-2.0
 * @param { Player } player - The instance of the player object.
 * @param { Phaser.Group } walls - The Phaser.Group object which contains all platform walls.
 * @param { Bullet } bullet - The bullet that is being fired by the player.
 * @param { boolean } alive - Is the player alive.
 * @example 
 * // Update the enemy
 * this.enemy.update(this.player, this.walls, this.bullet, true);
 */
Enemy.prototype.update = function (player, walls, bullet, alive) {
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

/**
 * A function to return if the enemy is currently dead
 * 
 * @author William Taylor & Jonathan Livingstone 
 * @version 1.0.0
 * @license Apache-2.0
 * @example 
 * // Test if the enemy is dead, and don't draw them if they're dead
 * if (!this.enemy.isDead()) {
 *      this.enemy.render();
 * }
 */
Enemy.prototype.isDead = function () {
    return(!this.alive);
}

/**
 * This function should be called if you want to kill the enemy
 * 
 * @author William Taylor & Jonathan Livingstone 
 * @version 1.0.0
 * @license Apache-2.0
 * @example 
 * // Kill an enemy
 * this.enemy.kill();
 */
Enemy.prototype.kill = function () {
    this.sprite.visible = false;
    this.alive = false;

    Music.play("taptap", false);
}

/**
 * Use this function to spawn an enemy at a specific x and y position
 * 
 * @author William Taylor & Jonathan Livingstone 
 * @version 1.0.0
 * @license Apache-2.0
 * @param { int } x - The spawn x position
 * @param { int } y - The spawn y position
 * @example 
 * // Spawn an enemy at the point {200, 400}
 * this.enemy.spawn(200, 400)
 */
Enemy.prototype.spawn = function (x, y) {
    this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    this.alive = true;

    this.sprite.body.collideWorldBounds = true;
    this.sprite.body.gravity.y = 400;
    this.sprite.visible = true;
    this.sprite.x = x;
    this.sprite.y = y;
}

