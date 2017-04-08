
/**
 *
 * @namespace
 */
var MobileGame = MobileGame || {};

/**
 * The boot object which will boot the game and set some global
 * properties.
 *
 * @constructor
 * @author William Taylor & Jonathan Livingstone 
 * @version 1.0.0
 * @license Apache-2.0
 */
MobileGame.Boot = MobileGame.Boot || function () { };

/**
 * The function that boots the Phaser Application
 * 
 * @author William Taylor & Jonathan Livingstone 
 * @version 1.0.0
 * @license Apache-2.0
 * @example 
 * // some comment
 * some code
 */
MobileGame.Boot.prototype = {
    /**
     * This is the preload function, which starts the preload
     * state.
     * 
     * @author William Taylor & Jonathan Livingstone 
     * @version 1.0.0
     * @license Apache-2.0
     * @example 
     * // Call the Preload function
     * Application.phaser.state.preload();
     */
    preload: function () {
        var game = Application.phaser;

        game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
        game.stage.backgroundColor = '#FFFFFF';
        game.load.image("loader", "data/img/loader.png");
        game.load.image("splash", "data/img/splash.jpg"); 
    },

    /**
     * Starts the application loading. It starts the Preload state.
     * 
     * @author William Taylor & Jonathan Livingstone 
     * @version 1.0.0
     * @license Apache-2.0
     * @example 
     * // Start the entire framework
     * Application.phaser.state.create();
     */
    create: function () {
        Application.phaser.state.start("Preload");
    }
}