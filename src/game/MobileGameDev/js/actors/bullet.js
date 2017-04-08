
/**
 * Enum for types of enemy's that can be spawned.
 * @readonly
 * @enum {number}
 */
var BULLET_TYPE = {
    GREEN: 0, 
    RED: 1, 
    BLACK: 2
}

/**
 * Create the Bullet object
 * 
 * @constructor
 * @author William Taylor & Jonathan Livingstone 
 * @version 1.0.0
 * @license Apache-2.0
 * @example 
 * // Create a new Bullet and assign it to the projective variable
 * var projectile = new Bullet(game);
 */
function Bullet(game) {
    /**
     * This is the active colour, or type, of the bullet
     * 
     * @author William Taylor & Jonathan Livingstone 
     * @version 1.0.0
     * @public 
     */
    this.activeBullet = BULLET_TYPE.GREEN;

    /**
     * The Phaser Framework
     * 
     * @author William Taylor & Jonathan Livingstone 
     * @version 1.0.0
     * @public 
     */
    this.game = game;

    /**
    * This is the sprite for the Bullet
    * 
    * @author William Taylor & Jonathan Livingstone 
    * @version 1.0.0
    * @public 
    */
    this.sprites = [];
}

/**
 * Setup the bullet, including the Sprite, Physics, and Scale
 * 
 * @author William Taylor & Jonathan Livingstone 
 * @version 1.0.0
 * @license Apache-2.0
 * @example 
 * // Setup information about a bullet
 * this.bullet.setup();
 */
Bullet.prototype.setup = function () {
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

/**
 * Get the currently active Bullet Sprite
 * 
 * @author William Taylor & Jonathan Livingstone 
 * @version 1.0.0
 * @license Apache-2.0
 * @example 
 * // Get the currently active bullet sprite and assign it to bulletType
 * var bulletType = this.bullet.getActiveSprite();
 */
Bullet.prototype.getActiveSprite = function () {
    return this.sprites[this.activeBullet];
}

/**
 * Test whether a collision happened between an enemy and the bullet
 * 
 * @author William Taylor & Jonathan Livingstone 
 * @version 1.0.0
 * @license Apache-2.0
 * @example 
 * // Assign, true or false, to didBulletHitEnemy based on whether they overlapped or not
 * var didBulletHitEnemy = this.bullet.handleEnemyCollision(this.enemy);
 */
Bullet.prototype.handleEnemyCollision = function (obj1, obj2, type) {
    this.reset(this.activeBullet);

    return (this.activeBullet == type);
}

Bullet.prototype.reset = function (index) {
    this.sprites[index].body.collideWorldBounds = false;
    this.sprites[index].body.velocity.x = 0;
    this.sprites[index].body.velocity.y = 0;
    this.sprites[index].body.gravity.y = 0;
    this.sprites[index].x = -100;
    this.sprites[index].y = -100;
}

/**
 * This function handles the sudo *creation* of a bullet (though their techincally already
 * created) when the user fires a bullet.
 * 
 * @author William Taylor & Jonathan Livingstone 
 * @version 1.0.0
 * @license Apache-2.0
 * @example 
 * // Create a bullet when the user presses the Spacebar
 * if (input.spacebar) {
 *      this.bullet.fire(this.player.x, this.player.y, 2000, 0, 0, 0);
 * }
 */
Bullet.prototype.fire = function (x, y, duration, direction, pointer_x, pointer_y) {
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

    Music.play("fire");
}

/**
 * The main update function for the Player's Bullet
 * Essentially destroys the bullet if the player's dead
 * 
 * @author William Taylor & Jonathan Livingstone 
 * @version 1.0.0
 * @license Apache-2.0
 * @example 
 * // Update the bullet
 * this.bullet.update();
 */
Bullet.prototype.update = function (player_x, player_y, blocks, playerAlive) {
    if (playerAlive == false) {
        this.reset(this.activeBullet);
    }
}

/**
 * Switch the type of bullet the player is currently using
 * 
 * @author William Taylor & Jonathan Livingstone 
 * @version 1.0.0
 * @license Apache-2.0
 * @example 
 * // Cycle through the bullet types when the Return Key is pressed
 * if (input.returnKey) {
 *      this.bullet,switchType();
 * }
 */
Bullet.prototype.switchType = function () {
    this.reset(this.activeBullet);
    this.activeBullet++;

    if (this.activeBullet > 2) {
        this.activeBullet = 0;
    }
}