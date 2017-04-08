

var MobileGame = MobileGame || {};


/**
 * The contructor for the Credits page
 * 
 * @constructor
 * @author William Taylor & Jonathan Livingstone 
 * @version 1.0.0
 * @license Apache-2.0
 * @example 
 * // Create the credits ui state
 * this.credits = new MobileGame.Credits();
 */
MobileGame.Credits = function () { }

MobileGame.Credits.prototype = {
    /**
     * This is the preload function for the credits
     * which stores the Phaser application
     * 
     * @author William Taylor & Jonathan Livingstone 
     * @version 1.0.0
     * @license Apache-2.0
     * @example 
     * // Load the credits
     * this.credits.preload();
     */
    preload: function () {
        this.game = Application.phaser;
    },

    /**
     * The create function for the credits.
     * It Initializes the Sprite, Pictures, and some Global Data
     * 
     * @author William Taylor & Jonathan Livingstone 
     * @version 1.0.0
     * @license Apache-2.0
     * @example 
     * // Create the credits
     * this.credits.create();
     */
    create: function() {
        this.background = this.game.add.sprite(0, 0, 'city_background');

        this.buttons = new ButtonSet(Application.phaser);
        this.buttons.pushButton("BACK", 30, 30, 'back', this.goback, this);

        this.title = this.game.add.text(0, 50, "Credits",
            { font: "150px Comic Sans MS", fill: "#FDFDFD", align: "center" }
        );

        this.title.x = this.game.world.centerX - this.title.width / 2;

        this.footer = this.game.add.text(0, 600, '\"Made with JavaScript and Phaser 2.3 only\"',
            { font: "40px Comic Sans MS", fill: "#FDFDFD", align: "center" }
        );

        this.footer.x = this.game.world.centerX - this.footer.width / 2;

        this.jonathon = this.game.add.button(350, 275, 'jonathan', this.jonathonPress, this);
        this.jonathon.height = 200;
        this.jonathon.width = 200;

        this.jonathonText = this.game.add.text(260, 500, "B00236297\n  Did the physics, levels design, and input",
            { font: "20px Comic Sans MS", fill: "#FDFDFD", align: "center" }
        );

        this.william = this.game.add.button(780, 275, 'william', this.williamPress, this);
        this.william.height = 200;
        this.william.width = 200;

        this.williamText = this.game.add.text(700, 500, "B00235610\n  Did the server, http code, and loading",
            { font: "20px Comic Sans MS", fill: "#FDFDFD", align: "center" }
        );
    },
    
    /**
     * Will open William Taylor's LinkedIn page when his picture is clicked on
     * 
     * @author William Taylor & Jonathan Livingstone 
     * @version 1.0.0
     * @license Apache-2.0
     * @example 
     * // Open William Taylors LinkedIn Page
     * this.credits.williamPress();
     */
    williamPress: function() {
        window.open("https://uk.linkedin.com/pub/william-taylor/66/179/32b");
    },

    /**
     * Will open Jonathan Livingstone's LinkedIn page when his picture is clicked
     * 
     * @author William Taylor & Jonathan Livingstone 
     * @version 1.0.0
     * @license Apache-2.0
     * @example 
     * // Open Jonathan Livingstone's LinkedIn Page
     * this.credits.jonathonPress();
     */
    jonathonPress: function () {
        window.open("https://uk.linkedin.com/in/jlivingstone94");
    },

    /**
     * Press this button to bo back to the menu from the credits
     * 
     * @author William Taylor & Jonathan Livingstone 
     * @version 1.0.0
     * @license Apache-2.0
     * @example 
     * // Go back to the Main Menu state
     * this.credits.goback();
     */
    goback: function () {
        this.game.state.start('Menu');
    },

    /**
    * Renders additional debug information on the screen if the game is in debug mode
    * 
    * @author William Taylor & Jonathan Livingstone 
    * @version 1.0.0
    * @license Apache-2.0
    * @example 
    * // Render the Credits page onscreen
    * this.credits.render();
    */
    render: function () {
        if (Application.debug) {
            this.game.time.advancedTiming = true;
            this.game.debug.text(this.game.time.fps || '--', 2, 14, "#000000");
        }
    }
};                                                     