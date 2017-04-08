
/**
 * This is the application namespace which provies a list of functions which
 * sets up the application ready for the user to play it.
 * 
 * @author William Taylor & Jonathan Livingstone 
 * @version 1.0.0
 * @license Apache-2.0
 * @namespace
 */
var Application = {
    /**
     * The location at which the canvas element will be inserted
     * when the game creates a canvas to draw on.
     * 
     * @author William Taylor & Jonathan Livingstone 
     * @version 1.0.0
     * @public 
     */
    canvasParentElement: "",

    /**
     * The amount of pixels or size of the canvas we will be rendering
     * to. This value defaults to 1280, 720 for performance reasons.
     * 
     * @author William Taylor & Jonathan Livingstone 
     * @version 1.0.0
     * @public 
     */
    canvasSize: [1280, 720],

    /**
     * This variable stores what type of drawing api we will to use
     * to render game objects, Either WebGL or Canvas,, AUTO is the default
     * value meaning the right api will be selected by phaser for the right device.
     * 
     * @author William Taylor & Jonathan Livingstone 
     * @version 1.0.0
     * @public 
     */
    canvasType: Phaser.AUTO,

    /**
     * The state the game is being run in. If debug is true
     * additional information will be rendered on screen for
     * debugging reasons if it isnt it will not be displayed.
     * 
     * @author William Taylor & Jonathan Livingstone 
     * @version 1.0.0
     * @public 
     */
    debug: false,

    /**
     * The instance of the phasers game object which acts
     * as the main object which we interact with when it comes
     * to calling phaser functions and interacting with its built
     * in objects.
     * 
     * @author William Taylor & Jonathan Livingstone 
     * @version 1.0.0
     * @public 
     */
    phaser: null,

    /**
     * This function creates the phaser game object and starts the game.
     * 
     * @author William Taylor & Jonathan Livingstone 
     * @version 1.0.0
     * @license Apache-2.0
     * @param { object[] } states - An array of states and their IDs you want to be in the application.
     * @example 
     * // Starts the game up with 3 game states
     * Application.start(["Boot", MobileGame.Boot,
     *      "Menu", MobileGame.Menu,
     *      "LV1", MobileGame.LV1
     *  ]);
     */
    start: function(array) {
        this.phaser = new Phaser.Game(
            this.canvasSize[0],
            this.canvasSize[1],
            this.canvasType,
            this.canvasParentElement,
            this.canvasCallbacks
        );

        for (var i = 0; i < array.length; i += 2) {
            this.phaser.state.add(array[i], array[i + 1]);
        }

        this.phaser.state.start(array[0]);
    },

    /**
    * This function is automatically called on load and attaches
    * a callback function so that the game is started when
    * the window has loaded all DOM content.
    * 
    * @author William Taylor & Jonathan Livingstone 
    * @version 1.0.0
    * @license Apache-2.0
    */
    main: function() {
        window.addEventListener("DOMContentLoaded",
            function () {
                Application.canvasSize = [1280, 720];
                Application.start(["Boot", MobileGame.Boot,
                    "Highscores", MobileGame.Highscores,
                    "Controls", MobileGame.Controls,
                    "GameOver", MobileGame.GameOver,
                    "Preload", MobileGame.Preload,
                    "Credits", MobileGame.Credits,
                    "Menu", MobileGame.MainMenu,
                    "LV1", MobileGame.Level1,
                    "LV2", MobileGame.Level2,
                    "LV3", MobileGame.Level3,
                    "LV4", MobileGame.Level4,
                    "LV5", MobileGame.Level5
                ]);
            }
        );
    }()
}