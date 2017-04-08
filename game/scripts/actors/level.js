
import { EnemyActiveBehaviour } from '../enemy/enemyActiveBehaviour.js';
import { EnemyEmptyBehaviour } from '../enemy/enemyEmptyBehaviour.js';
import { EnemyIdleBehaviour } from '../enemy/enemyIdleBehaviour.js';
import { PLAYER_SCORE } from '../actors/player.js';
import { EnemySpawn } from '../enemy/enemySpawn.js';
import { getLayout } from '../stages/levels/levels.js';

export class Level {
  constructor(phaser, layoutID, filename) {
    this.game = phaser;
    this.platformGroup = null;
    this.enemySpawns = [];
    this.enemyBoss = null;
    this.platforms = [];
    this.totalEnemies = 0;
    this.filename = filename;
    this.sceneID = "Menu";

    const onlineData = getLayout(layoutID);

    if (onlineData != null) {
      this.LevelData = JSON.parse(onlineData);
    } else {
      var request = new XMLHttpRequest();
      request.open('GET', filename, false);
      request.send(null);

      if (request.status === 200) {
        this.LevelData = JSON.parse(request.responseText);
      }
    }
  }

  stopSpawningEnemies() {
    for (var i = 0; i < this.enemySpawns.length; i++) {
      this.enemySpawns[i].stopSpawning();
    }
  }

  createWorld() {
    this.background = this.game.add.sprite(0, 0, this.LevelData.Background);
    this.background.height = 1080;
    this.background.width = 1920;
    this.sceneID = this.LevelData.Next;
    this.next = this.game.add.sprite(1800, 900, "arrow");
    this.next.visible = false;

    for (var i = 0; i < this.LevelData.EnemySpawns.length; i++) {
      var element = this.LevelData.EnemySpawns[i];

      var spawnX = Number(element.SpawnPosition.x);
      var spawnY = Number(element.SpawnPosition.y);

      var gateX = Number(element.GatePosition.x);
      var gateY = Number(element.GatePosition.y);

      var enemySpawn = new EnemySpawn(this.game, element.ID);
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

    this.platformGroup = this.game.add.group();

    for (var i = 0; i < this.LevelData.Platforms.length; i++) {
      var element = this.LevelData.Platforms[i];

      var x = element.x;
      var y = element.y;
      var w = element.w;
      var h = element.h;

      this.platforms[i] = this.game.add.tileSprite(Number(x), Number(y), Number(w), Number(h), element.ID);
      this.game.physics.enable(this.platforms[i], Phaser.Physics.ARCADE);
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

  update(player) {
    this.game.physics.arcade.collide(player.sprite, this.platformGroup);
    this.game.physics.arcade.collide(player.getBulletSprite(), this.platformGroup);

    this.dead = 0;

    for(let i = 0; i < this.enemySpawns.length; i++) {
      this.dead += this.enemySpawns[i].update(player, this.platformGroup, player.projectile);
    }

    if (this.enemyBoss != null) {
      this.enemyBoss.update(player.sprite, this.platformGroup, player.projectile);
    }

    if (this.dead >= this.totalEnemies && (this.enemyBoss == null || this.enemyBoss.isDead())) {
      this.next.visible = true;

      if (player.sprite.x > 1850) {
        player.exitScene();
      }

      if (player.sprite.x > 1850) {
        PLAYER_SCORE(100);
        this.game.state.start(this.sceneID, true, false, player.getScore());
      }
    }
  }
}
