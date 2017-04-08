

var MobileGame = MobileGame || {};

/**
 * The constructor for the Main Menu
 * 
 * @constructor
 * @author William Taylor & Jonathan Livingstone 
 * @version 1.0.0
 * @license Apache-2.0
 * @example 
 * // Construct the Main Menu class
 * this.mainMenu = new MobileGame.MainMenu();
 */
MobileGame.MainMenu = function () {}

MobileGame.MainMenu.prototype = {
    /**
     * Create the Newsboard
     * 
     * @author William Taylor & Jonathan Livingstone 
     * @version 1.0.0
     * @license Apache-2.0
     * @example 
     * // Create the Main Menu, and initializes the Newsboard
     * this.mainMenu.preload();
     */
    preload: function () {
        this.game = Application.phaser;

        if (!this.newsBoard) {
            this.newsBoard = new NewsBoard("http://52.16.253.24:3002/news/GetNews/", this.game);
        }
    },

    /**
     * Takes the player to the Controls Page
     * 
     * @author William Taylor & Jonathan Livingstone 
     * @version 1.0.0
     * @license Apache-2.0
     * @example 
     * // Start the game by taking the controls page
     * this.mainMenu.handlePlayPress(0, 0, 0);
     */
    handlePlayPress: function (s, s1, s2) {
        var _this = this;
        setTimeout(function () { _this.game.state.start("Controls"); }, 500);
    },

    /**
     * Takes the User to the highscore screen
     * 
     * @author William Taylor & Jonathan Livingstone 
     * @version 1.0.0
     * @license Apache-2.0
     * @example 
     * // Take the player to the Highscore screen
     * this.mainMenu.handleHighScorePress(0, 0, 0);
     */
    handleHighscorePress: function (s, s1, s2) {
        var _this = this;
        setTimeout(function () { _this.game.state.start("Highscores"); }, 500);
    },

    /**
     * Takes the player to the Credits screen
     * 
     * @author William Taylor & Jonathan Livingstone 
     * @version 1.0.0
     * @license Apache-2.0
     * @example 
     * // Take the User to the Credits screen
     * this.mainMenu.handleCreditsPress();
     */
    handleCreditsPress: function (s, s1, s2) {
        var _this = this;
        setTimeout(function () { _this.game.state.start("Credits"); }, 500);
    },

    /**
     * Create the Menu. Also creates the background, buttons, and audio for the Main Menu
     * 
     * @author William Taylor & Jonathan Livingstone 
     * @version 1.0.0
     * @license Apache-2.0
     * @example 
     * // Create the Main Menu
     * this.mainMenu.create();
     */
    create: function () {
        var game = Application.phaser;

        var background = game.add.sprite(0, 0, 'city_background');

        var title = game.add.text(0, 50, "An Edge of 5 Kingdoms",
            { font: "100px Comic Sans MS", fill: "#FDFDFD", align: "center" }
        );

        var programmer = game.add.text(10, 0, "B00235610 & B00236297",
           { font: "40px Comic Sans MS", fill: "#FDFDFD", align: "center" }
        );

        programmer.y = 720 - programmer.height;

        title.x = game.world.centerX - title.width / 2;

        background.height = 720;
        background.width = 1280;

        this.buttons = new ButtonSet(this.game);
        this.buttons.pushButton("PLAY", 200, 250, 'button', this.handlePlayPress, this);
        this.buttons.pushButton("SCORES", 200, 370, 'button', this.handleHighscorePress, this);
        this.buttons.pushButton("CREDITS", 200, 490, 'button', this.handleCreditsPress, this);
        this.buttons.setButtonSetSize(220, 80);

        this.buttons.attachText("PLAY", "Play", "40px Comic Sans MS");
        this.buttons.attachText("SCORES", "Scores", "40px Comic Sans MS");
        this.buttons.attachText("CREDITS", "Credits", "40px Comic Sans MS");

        this.newsBoard.createNewsBoard("news");
        this.newsBoard.populateNewsBoard(8);

        this.optionButtons = new ButtonSet(this.game);
        this.optionButtons.pushButton("FULLSCREEN", 1280 - 120, 720 - 120, 'fullscreen', this.fullscreen, this);
        this.optionButtons.pushButton("AUDIO", 1280 - 120, 600 - 120, 'audio', this.mute, this);
        this.optionButtons.setButtonSetSize(100, 100);

        Music.stop("level");
    },

    /**
     * Toggles Fullscreen mode
     * 
     * @author William Taylor & Jonathan Livingstone 
     * @version 1.0.0
     * @license Apache-2.0
     * @example 
     * // Toggle fullscreen mode
     * this.mainMenu.fullscreen();
     */
    fullscreen: function () {
        this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
        this.game.scale.refresh();

        if (this.game.scale.isFullScreen) {
            this.game.scale.stopFullScreen();
        } else {
            this.game.scale.startFullScreen();
        }
    },

    /**
     * Mute any currently-playing music
     * 
     * @author William Taylor & Jonathan Livingstone 
     * @version 1.0.0
     * @license Apache-2.0
     * @example 
     * // Mute any currently-playing music in the Main Menu
     * this.mainMenu.mute();
     */
    mute: function () {
        Music.mute();
    },
    
    /**
    * Renders additional information if the game is in debug mode
    * for debugging purposes.
    * 
    * @author William Taylor & Jonathan Livingstone 
    * @version 1.0.0
    * @license Apache-2.0
    * @example 
    * // Render the Main Menu
    * this.mainMenu.render();
    */
    render: function () {
        if (Application.debug) {
            this.game.time.advancedTiming = true;
            this.game.debug.text(this.game.time.fps || '--', 2, 14, "#000000");
        }
    }
}
