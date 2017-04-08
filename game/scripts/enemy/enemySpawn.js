
import { Enemy } from './enemy.js';

export class EnemySpawn {
  constructor(game, textureID) {
    this.game = game;
    this.spawnSprite = this.game.add.sprite(100, 100, textureID);
    this.spawnNumber = 0;
    this.enemies = [];
    this.spawns = 0;
  }

  setSpawnNumber(num, textureIDs, attachFunction) {
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

  setSpawnPosition(x, y) {
    this.spawnSprite.x = x;
    this.spawnSprite.y = y;
  }

  update(player, walls, bullet) {
    var dead = 0;
    var playerAlive = player.isAlive();

    for (let b = 0; b < this.spawns; b++) {
      this.enemies[b].update(player.sprite, walls, bullet, playerAlive);
      if (this.enemies[b].isDead()) {
        dead++;
      }
    }

    return dead;
  }

  stopSpawning() {
    clearInterval(this.intervalID);
  }

  startSpawning(ms, x, y) {
    this.intervalID = setInterval(() => {
      if (this.spawns < this.enemies.length) {
        if (this.spawns < this.spawnNumber) {
          this.enemies[this.spawns].spawn(x, y);
          this.spawns++;
        } else {
          clearInterval(this.intervalID);
        }
      } else {
        clearInterval(this.intervalID);
      }
    }, ms);
  }
}
