
/**
 * The is the constructor which creates the enemy spawn class
 * 
 * @constructor
 * @author William Taylor & Jonathan Livingstone 
 * @version 1.0.0
 * @license Apache-2.0
 * @example 
 * // Create the Enemy Spawner
 * this.enemySpawner = new EnemySpawn(this.game, "spawn");
 */
function EnemySpawn(game, textureID) {
    /**
     * The Phaser Framework
     * 
     * @author William Taylor & Jonathan Livingstone 
     * @version 1.0.0
     * @public 
     */
    this.game = game;

    /**
     * Description
     * 
     * @author William Taylor & Jonathan Livingstone 
     * @version 1.0.0
     * @public 
     */
    this.spawnSprite = this.game.add.sprite(100, 100, textureID);

    /**
     * This is the number of spawn points for enemies that are created
     * 
     * @author William Taylor & Jonathan Livingstone 
     * @version 1.0.0
     * @public 
     */
    this.spawnNumber = 0;

    /**
     * The enemies themselves
     * 
     * @author William Taylor & Jonathan Livingstone 
     * @version 1.0.0
     * @public 
     */
    this.enemies = [];

    /**
     * Description
     * 
     * @author William Taylor & Jonathan Livingstone 
     * @version 1.0.0
     * @public 
     */
    this.spawns = 0;
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
EnemySpawn.prototype.setSpawnNumber = function (num, textureIDs, attachFunction) {
    if (textureIDs.length == 3) {
        this.spawnNumber = Number(num);

        for (var i = 0; i < this.spawnNumber; i++) {
            var type = parseInt(Math.abs(Math.random() * 3));

            this.enemies.push(new Enemy(this.game, textureIDs[type], type));
            if (attachFunction) {
                attachFunction(this.enemies[i], i);
            }
        }
    }
}

/**
 * Set the spawn position
 * 
 * @author William Taylor & Jonathan Livingstone 
 * @version 1.0.0
 * @license Apache-2.0
 * @example 
 * // Set the spawn poisition to {200, 300}
 * this.spawnPosition.setSpawnPosition(200, 300)
 */
EnemySpawn.prototype.setSpawnPosition = function (x, y) {
    this.spawnSprite.x = x;
    this.spawnSprite.y = y;
}

/**
 * This is the main update function for the Enemy Spawn Points
 * Which updates all enemies and counts the number of dead enemies
 * 
 * @author William Taylor & Jonathan Livingstone 
 * @version 1.0.0
 * @license Apache-2.0
 * @example 
 * // Update the Enemy Spawner class
 * this.enemySpawner.update(this.player, this.walls, this.bullets);
 */
EnemySpawn.prototype.update = function (player, walls, bullet) {
    var dead = 0;

    var playerAlive = player.isAlive();
    for (b = 0; b < this.spawns; b++) {
        this.enemies[b].update(player.sprite, walls, bullet, playerAlive);
        if (this.enemies[b].isDead()) {
            dead++;
        }
    }

    return dead;
}

/**
 * Stop enemies spawning
 * 
 * @author William Taylor & Jonathan Livingstone 
 * @version 1.0.0
 * @license Apache-2.0
 * @example 
 * // Stop enemies spawning
 * this.spawnPoint.stopSpawning();
 */
EnemySpawn.prototype.stopSpawning = function () {
    clearInterval(this.intervalID);
}

/**
 * Start the enemies spawning at a point, and set their 'Spawn Time' to be certain interval
 * 
 * @author William Taylor & Jonathan Livingstone 
 * @version 1.0.0
 * @license Apache-2.0
 * @example 
 * // Make the enemies start spawning at the position {200, 300}
 * // once every 10 seconds
 * this.spawnPoint.startSpawning(10, 200, 300);
 */
EnemySpawn.prototype.startSpawning = function (ms, x, y) {
    var instance = this;
    
    this.intervalID = setInterval(function () {
        if (instance.spawns < instance.enemies.length) {
            if (instance.spawns < instance.spawnNumber) {
                instance.enemies[instance.spawns].spawn(x, y);
                instance.spawns++;
            } else {
                clearInterval(instance.intervalID);
            }
        } else {
            clearInterval(instance.intervalID);
        }

    }, ms);
}