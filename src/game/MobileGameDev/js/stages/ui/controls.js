

var MobileGame = MobileGame || {};

/**
 * This is the constructor which will create the controls
 * scene.
 * 
 * @constructor
 * @author William Taylor & Jonathan Livingstone 
 * @version 1.0.0
 * @license Apache-2.0
 */
MobileGame.Controls = function () { }

MobileGame.Controls.prototype = {
    /**
     * The preload function for the controls
     * scene which will store the phaser instance for later use.
     * 
     * @author William Taylor & Jonathan Livingstone 
     * @version 1.0.0
     * @license Apache-2.0
     * @example 
     * // Load the controls
     * this.controls.preload();
     */
    preload: function () {
        this.game = Application.phaser;
    },

    /**
     * Called when the player pressed the back from the Controls page, and takes the Player
     * back to the menu state
     * 
     * @author William Taylor & Jonathan Livingstone 
     * @version 1.0.0
     * @license Apache-2.0
     * @example 
     * // Call when the player presses the Back button, and take them to the Main Menu
     * this.controls.backPress();
     */
    backPress: function() {
        this.game.state.start("Menu");
    },

    /**
     * Starts the first level when the user presses the Play button
     * 
     * @author William Taylor & Jonathan Livingstone 
     * @version 1.0.0
     * @license Apache-2.0
     * @example 
     * // Call when the player presses Play and go to Level 1
     * this.controls.playPress();
     */
    playPress: function () {
        Music.stop("menu");

        this.game.state.start("LV1");
    },

    /**
     * Create the controls page, assign the Background and the buttons
     * 
     * @author William Taylor & Jonathan Livingstone 
     * @version 1.0.0
     * @license Apache-2.0
     * @example 
     * // Create the controls
     * this.controls.create();
     */
    create: function () {
        this.background = this.game.add.sprite(0, 0, 'city_background');
        this.background.height = 720;
        this.background.width = 1280;

        this.title = this.game.add.text(0, 50, "Controls",
            { font: "150px Comic Sans MS", fill: "#FDFDFD", align: "center" }
        );

        this.title.x = this.game.world.centerX - this.title.width / 2;

        this.buttons = new ButtonSet(this.game);
        this.buttons.pushButton("START", this.game.world.centerX - 110, 550, 'button', this.playPress, this);
        this.buttons.setButtonSetSize(220, 80);

        this.buttons.attachText("START", "Start Game", "30px Comic Sans MS");

        this.tutorialImages = [];

        var x = 215;
        for (var i = 0; i < 3; i++) {
            this.tutorialImages[i] = this.game.add.sprite(x, 276, "controls"+(1+i).toString());
            this.tutorialImages[i].width = 250;
            this.tutorialImages[i].height = 200;

            x += 300;
        }

        this.buttons.pushButton("BACK", 30, 30, 'back', this.backPress, this);
    },

    /**
    * This is an additional render pass that will render debug information
    * if the game is being run in debug mode.
    * 
    * @author William Taylor & Jonathan Livingstone 
    * @version 1.0.0
    * @license Apache-2.0
    * @example 
    * // Render the controls to the screen
    * this.controls.render();
    */
    render: function () {
        if (Application.debug) {
            this.game.time.advancedTiming = true;
            this.game.debug.text(this.game.time.fps || '--', 2, 14, "#000000");
        }
    }
}