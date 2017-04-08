
export const Music = {
  sounds: [],
  muted: true,

  pause: function (ID) {
    for (var i = 0; i < this.sounds.length; i++) {
      if (this.sounds[i].ID == ID) {
        this.sounds[i].obj.pause();
      }
    }
  },
  
  stop: function (ID) {
    for (var i = 0; i < this.sounds.length; i++) {
      if (this.sounds[i].ID == ID) {
        this.sounds[i].obj.stop();
      }
    }
  },

  play: function (phaser, ID, loop) {
    if (!this.muted) {
      var music;

      if (!loop) {
        music = phaser.add.audio(ID);
        music.play();
      } else {
        music = phaser.add.audio(ID);
        music.loopFull(1.0);
      }

      this.sounds.push({ "ID": ID, "obj": music });
    }
  },

  hasDecodedTracks: function () {
    var decodedTracks = 0;

    for (var i = 0; i < this.sounds.length; i++) {
      if (!this.sounds[i].isDecoding) {
        decodedTracks++;
      }
    }

    return(decodedTracks == this.sounds.length);
  },

  clear: function () {
    this.mute();
    this.sounds.length = 0;
  },

  mute: function (ID) {
    this.muted = !this.muted;

    if (ID) {
      for (var i = 0; i < this.sounds.length; i++) {
        if (this.sounds[i].ID == ID) {
          this.sounds[i].obj.mute = !this.sounds[i].obj.mute;
          break;
        }
      }
    } else {
      for (var i = 0; i < this.sounds.length; i++) {
        this.sounds[i].obj.mute = !this.sounds[i].obj.mute;
      }
    }
  }
}
