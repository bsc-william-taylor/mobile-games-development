

var PLAYER_SCORE = function (start) {
    var score = start;
    return function (number) {
        score += number;
        return score;
    }
}(0);

/**
 * Constructor for the Player
 * 
 * @constructor
 * @author William Taylor & Jonathan Livingstone 
 * @version 1.0.0
 * @license Apache-2.0
 * @example 
 * // Create the player
 * this.player = new Player(this.game);
 */
function Player(game) {
    this.projectile = new Bullet(game);
    this.game = game;
    this.timeout = true;
    this.duration = undefined;
    this.disableUpdate = false;
    this.deaths = 0;
}

/**
 * This is the function to setup the player, which will add their Sprite,
 * Animation, enable Physics and Gravity, and add their Collision Box.
 * 
 * @author William Taylor & Jonathan Livingstone 
 * @version 1.0.0
 * @license Apache-2.0
 * @example 
 * // Setup the Sprite and Physics for the Player
 * this.player.setup();
 */
Player.prototype.setup = function () {
    this.projectile.setup();

    this.sprite = this.game.add.sprite(0, 650, 'character');
    this.sprite.animations.add('walk', [0, 1, 2, 3, 4, 5]);
    this.sprite.anchor.setTo(0.5, 1);

    Application.phaser.physics.enable(this.sprite, Phaser.Physics.ARCADE);

    this.sprite.body.gravity.y = 400;
    this.sprite.body.collideWorldBounds = true;
}

/**
 * Description
 * 
 * @author William Taylor & Jonathan Livingstone 
 * @version 1.0.0
 * @license Apache-2.0
 * @example 
 * // some comment
 * some code
 */
Player.prototype.exitScene = function () {
    this.sprite.body.collideWorldBounds = false;
    this.sprite.body.velocity.x = 100;
    this.disableUpdate = true;
}

/**
 * Set the Player's position
 * 
 * @author William Taylor & Jonathan Livingstone 
 * @version 1.0.0
 * @license Apache-2.0
 * @example 
 * // Move the player to the position {400, 800}
 * this.player.setPosition(400, 800);
 */
Player.prototype.setPosition = function (x, y) {
    this.sprite.x = x;
    this.sprite.y = y;
}

/**
 * Switch the projectile the player's currently using
 * 
 * @author William Taylor & Jonathan Livingstone 
 * @version 1.0.0
 * @license Apache-2.0
 * @example 
 * // Cycle to the next projective
 * this.player.switchType();
 */
Player.prototype.switchProjectile = function () {
    this.projectile.switchType();
}

/**
 * This is the main update code for the player, which handles their physics and movement
 * 
 * @author William Taylor & Jonathan Livingstone 
 * @version 1.0.0
 * @license Apache-2.0
 * @example 
 * // Update the player
 * this.player.update(this.world, "Lv1", false);
 */
Player.prototype.update = function (pointer, level, overHud) {    
    if (!this.disableUpdate) {
        if (pointer.msSinceLastClick <= 250 && this.sprite.body.velocity.y == 0.0) {
            this.sprite.body.velocity.y = -350;
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

Player.prototype.getBulletColour = function () {
    switch (this.projectile.activeBullet) {
        case BULLET_TYPE.GREEN: return "0x00FF00";
        case BULLET_TYPE.BLACK: return "0x000000";
        case BULLET_TYPE.RED: return "0xFF0000";

        default: break;
    }

    return "0xFFFFFF";
}

Player.prototype.isAlive = function () {
    return this.sprite.visible;
}

/**
 * Get the Player's current score
 * 
 * @author William Taylor & Jonathan Livingstone 
 * @version 1.0.0
 * @license Apache-2.0
 * @example 
 * // Store the player's score in the variable score
 * var score = this.player.getScore();
 */
Player.prototype.getScore = function () {
    return PLAYER_SCORE(0);
}

/**
 * Get the type of bullet the Player's currently using
 * 
 * @author William Taylor & Jonathan Livingstone 
 * @version 1.0.0
 * @license Apache-2.0
 * @example 
 * // Get the type of bullet the player's currently using
 * var bulletType = this.player.getBulletSprite();
 */
Player.prototype.getBulletSprite = function () {
    return this.projectile.getActiveSprite();
}