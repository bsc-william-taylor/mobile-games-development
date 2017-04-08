
/**
 * This is a variable which will store the game's music
 * 
 * @author William Taylor & Jonathan Livingstone 
 * @version 1.0.0
 * @license Apache-2.0
 * @namespace
 * @example 
 * // some comment
 * some code
 */
var Music = {
    /**
     * Store the game's sounds
     * 
     * @author William Taylor & Jonathan Livingstone 
     * @version 1.0.0
     * @public 
     */
    sounds: [],

    /**
     * Should we play sounds or not
     * 
     * @author William Taylor & Jonathan Livingstone 
     * @version 1.0.0
     * @public 
     */
    muted: false,

    /**
     * Pause the currently-playing music
     * 
     * @author William Taylor & Jonathan Livingstone 
     * @version 1.0.0
     * @license Apache-2.0
     * @example 
     * // Pause the background music
     * this.music.pause("background_song");
     */
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

    /**
     * Play some music, either from the start or continue it
     * 
     * @author William Taylor & Jonathan Livingstone 
     * @version 1.0.0
     * @license Apache-2.0
     * @example 
     * // Play some background music from it's last paused place
     * this.music.play("background_music", false);
     */
    play: function (ID, loop) {
        if (!this.muted) {
            var music;

            if (!loop) {
                music = Application.phaser.add.audio(ID);
                music.play();
            } else {
                music = Application.phaser.add.audio(ID);
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

    /**
    * Mutes the sound and sets it back to the start
    * 
    * @author William Taylor & Jonathan Livingstone 
    * @version 1.0.0
    * @license Apache-2.0
    * @example 
    * // Stop the currently playing music
    * this.music.clear();
    */
    clear: function () {
        this.mute();
        this.sounds.length = 0;
    },

    /**
    * Mute the currently-playing music
    * 
    * @author William Taylor & Jonathan Livingstone 
    * @version 1.0.0
    * @license Apache-2.0
    * @example 
    * // Mute the Background music
    * this.music.mute("background_music");
    */
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