
/**
 * This is the constructor which will create an enemy boss
 * 
 * @constructor
 * @author William Taylor & Jonathan Livingstone 
 * @version 1.0.0
 * @license Apache-2.0
 * @example 
 * // Create the boss
 * this.boss = new Boss();
 */
function EnemyBoss(game, healthPoints) {
    /**
     * This is how much health the boss has
     * 
     * @author William Taylor & Jonathan Livingstone 
     * @version 1.0.0
     * @public 
     */
    this.hitsToKill = healthPoints;

    /**
     * This sets the colour-type of the boss
     * 
     * @author William Taylor & Jonathan Livingstone 
     * @version 1.0.0
     * @public 
     */
    this.type = ENEMY_TYPES.RED;

    /**
     * Whether the boss is currently alive or not
     * 
     * @author William Taylor & Jonathan Livingstone 
     * @version 1.0.0
     * @public 
     */
    this.alive = true;

    /**
     * The Phaser Framework
     * 
     * @author William Taylor & Jonathan Livingstone 
     * @version 1.0.0
     * @public 
     */
    this.game = game;

    /**
     * This is how many hits the Boss has currently sustained
     * 
     * @author William Taylor & Jonathan Livingstone 
     * @version 1.0.0
     * @public 
     */
    this.hits = 0;
}

/**
 * This is the initialization function for the ememy boss which adds the Sprite
 * 
 * @author William Taylor & Jonathan Livingstone 
 * @version 1.0.0
 * @license Apache-2.0
 * @example 
 * // Create the Boss at the position {100, 200}
 * this.boss.setup(100, 200, "EnemyBoss")
 */
EnemyBoss.prototype.setup = function (x, y, ID) {
    this.sprite = this.game.add.sprite(x, y, ID);

    this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    this.behaviour = new EnemyIdleBehaviour();
    this.alive = true;

    this.sprite.body.collideWorldBounds = true;
    this.sprite.body.gravity.y = 400;
    this.sprite.body.maxVelocity.x = 50;
}

/**
 * Whether the boss id dead or not
 * 
 * @author William Taylor & Jonathan Livingstone 
 * @version 1.0.0
 * @license Apache-2.0
 * @example 
 * // Only render the boss if they're alive
 * if (!this.boss.isDead()) {
 *      this.boss.render();
 * }
 */
EnemyBoss.prototype.isDead = function() {
    return !this.alive;
}

/**
 * Call this function to score a hit into the boss
 * If the boss takes enough hits, then kill them
 * 
 * @author William Taylor & Jonathan Livingstone 
 * @version 1.0.0
 * @license Apache-2.0
 * @example 
 * // Make the player hit the boss (and automatically kill them boss if they take hits)
 * this.boss.kill();
 */
EnemyBoss.prototype.kill = function () {
    this.hits++;

    if (this.hits >= this.hitsToKill) {
        this.sprite.visible = false;
        this.alive = false;
    } else {
        this.alive = true;
    }
}

/**
 * This is the main update function for the enemy boss
 * 
 * @author William Taylor & Jonathan Livingstone 
 * @version 1.0.0
 * @license Apache-2.0
 * @example 
 * // Update the Boss
 * this.boss.render();
 */
EnemyBoss.prototype.update = function (player, walls, bullet) {
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