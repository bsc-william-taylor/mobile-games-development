
/**
 * Constructor for the Levels
 * 
 * @constructor
 * @author William Taylor & Jonathan Livingstone 
 * @version 1.0.0
 * @license Apache-2.0
 * @example 
 * // Construct a new Level called, "Lv1"
 * this.level = new Level("Lv1");
 */
function Level(layoutID, filename) {
    /**
     * The Phaser Framework
     * 
     * @author William Taylor & Jonathan Livingstone 
     * @version 1.0.0
     * @public 
     */
    this.game = Application.phaser;

    /**
     * Description
     * 
     * @author William Taylor & Jonathan Livingstone 
     * @version 1.0.0
     * @public 
     */
    this.platformGroup = null;

    /**
     * The enemy spawn points within the level
     * 
     * @author William Taylor & Jonathan Livingstone 
     * @version 1.0.0
     * @public 
     */
    this.enemySpawns = [];

    /**
     * The boss the player has to fight
     * 
     * @author William Taylor & Jonathan Livingstone 
     * @version 1.0.0
     * @public 
     */
    this.enemyBoss = null;

    /**
     * The Platforms for the level
     * 
     * @author William Taylor & Jonathan Livingstone 
     * @version 1.0.0
     * @public 
     */
    this.platforms = [];

    /**
     * This is the total number of enemies in the level
     * 
     * @author William Taylor & Jonathan Livingstone 
     * @version 1.0.0
     * @public 
     */
    this.totalEnemies = 0;

    /**
     * This is the name of the level
     * 
     * @author William Taylor & Jonathan Livingstone 
     * @version 1.0.0
     * @public 
     */
    this.filename = filename;

    /**
     * This is the Phaser scene ID
     * 
     * @author William Taylor & Jonathan Livingstone 
     * @version 1.0.0
     * @public 
     */
    this.sceneID = "Menu";

    /**
     * Description
     * 
     * @author William Taylor & Jonathan Livingstone 
     * @version 1.0.0
     * @private 
     */

    var onlineData = MobileGame.getLayout(layoutID);

    if (onlineData != 0) {
        this.LevelData = JSON.parse(onlineData);
    } else {
        var request = new XMLHttpRequest();
        request.open('GET', filename, false);
        request.send(null);

        if (request.status === 200) {
            this.LevelData = JSON.parse(request.responseText);

            console.log(this.LevelData);
        }
    }
}

/**
 * Stop all the enemy's spawning
 * 
 * @author William Taylor & Jonathan Livingstone 
 * @version 1.0.0
 * @license Apache-2.0
 * @example 
 * // Stop the enemy's spawning in the current level
 * this.level.stopSpawningEnemies();
 */
Level.prototype.stopSpawningEnemies = function () {
    for (var i = 0; i < this.enemySpawns.length; i++) {
        this.enemySpawns[i].stopSpawning();
    }
}

/**
 * Create the level's world
 * 
 * @author William Taylor & Jonathan Livingstone 
 * @version 1.0.0
 * @license Apache-2.0
 * @example 
 * // Create the level's world
 * this.level.createWorld();
 */
Level.prototype.createWorld = function () {
    this.background = Application.phaser.add.sprite(0, 0, this.LevelData.Background);
    this.sceneID = this.LevelData.Next;

    this.next = this.game.add.sprite(1100, 550, "arrow");
    this.next.visible = false;

    for (var i = 0; i < this.LevelData.EnemySpawns.length; i++) {
        var element = this.LevelData.EnemySpawns[i];

        var spawnX = Number(element.SpawnPosition.x);
        var spawnY = Number(element.SpawnPosition.y);

        var gateX = Number(element.GatePosition.x);
        var gateY = Number(element.GatePosition.y);

        var enemySpawn = new EnemySpawn(Application.phaser, element.ID);
        enemySpawn.setSpawnPosition(gateX, gateY);
        enemySpawn.setSpawnNumber(Number(element.Spawns), ["enemy1", "enemy2", "enemy3"], function (enemy, ID) {
            var random = Math.random();
            if (random > Number(element.Behaviour.Active)) {
                enemy.behaviour = new EnemyActiveBehaviour();
            } else {
                enemy.behaviour = new EnemyIdleBehaviour();
            }
        });

        enemySpawn.startSpawning(Number(element.Delay), spawnX, spawnY);

        this.enemySpawns[i] = (enemySpawn);
        this.totalEnemies += Number(element.Spawns);
    }

    this.platformGroup = Application.phaser.add.group();

    for (var i = 0; i < this.LevelData.Platforms.length; i++) {
        var element = this.LevelData.Platforms[i];

        var x = element.x;
        var y = element.y;
        var w = element.w;
        var h = element.h;

        this.platforms[i] = Application.phaser.add.tileSprite(Number(x), Number(y), Number(w), Number(h), element.ID);

        Application.phaser.physics.enable(this.platforms[i], Phaser.Physics.ARCADE);

        this.platformGroup.add(this.platforms[i]);
    }

    this.platformGroup.setAll('body.immovable', true);

    if (this.LevelData.Boss) {
        var textureID = this.LevelData.Boss.ID;
        var health = Number(this.LevelData.Boss.HitPoints);
        var x = Number(this.LevelData.Boss.x);
        var y = Number(this.LevelData.Boss.y);

        this.enemyBoss = new EnemyBoss(this.game, health);
        this.enemyBoss.setup(x, y, textureID);
    }
}

/**
 * The main update function, which handles the Collisions for the Player, as well as
 * updating the enemies
 * 
 * @author William Taylor & Jonathan Livingstone 
 * @version 1.0.0
 * @license Apache-2.0
 * @example 
 * // Update the current level
 * this.level.update(this.player);
 */
Level.prototype.update = function (player) {
    this.game.physics.arcade.collide(player.sprite, this.platformGroup);
    this.game.physics.arcade.collide(player.getBulletSprite(), this.platformGroup);

    this.dead = 0;

    for(i = 0; i < this.enemySpawns.length; i++) {
        this.dead += this.enemySpawns[i].update(player, this.platformGroup, player.projectile);
    }

    if (this.enemyBoss != null) {
        this.enemyBoss.update(player.sprite, this.platformGroup, player.projectile);
    }

    if (this.dead >= this.totalEnemies && (this.enemyBoss == null || this.enemyBoss.isDead())) {
        this.next.visible = true;

        if (player.sprite.x > 1100) {
            player.exitScene();
        }

        if (player.sprite.x > 1350) {
            PLAYER_SCORE(100);
            this.game.state.start(this.sceneID, true, false, player.getScore());
        }
    }
}