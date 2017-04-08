

var MobileGame = MobileGame || {};

/**
 * The constructor for the High-Scores class
 * 
 * @constructor
 * @author William Taylor & Jonathan Livingstone 
 * @version 1.0.0
 * @license Apache-2.0
 */
MobileGame.Highscores = function(){};

MobileGame.Highscores.prototype = {
    /**
     * This is the URL to download the High Scores
     * 
     * @author William Taylor & Jonathan Livingstone 
     * @version 1.0.0
     * @public 
     */
    scoreBoardUrl: "http://52.16.253.24:3002/score/GetScores/",

    /**
     * Holds the scoreboard
     * 
     * @author William Taylor & Jonathan Livingstone 
     * @version 1.0.0
     * @public 
     */
    scoreBoard: null,
    
    /**
     * Stores the Phaser framework and creates the scoreboard objec
     * 
     * @author William Taylor & Jonathan Livingstone 
     * @version 1.0.0
     * @license Apache-2.0
     * @example 
     * // Load the High Scores screen
     * this.highScores.preload();
     */
    preload: function () {
        this.game = Application.phaser;
        this.scoreBoard = new ScoreBoard(this.scoreBoardUrl, this.game);
    },

    /**
     * The main creation function for the High Scores,
     * which creates all the buttons and text
     * 
     * @author William Taylor & Jonathan Livingstone 
     * @version 1.0.0
     * @license Apache-2.0
     * @example 
     * // Create the High Scores page
     * this.highScores.create();
     */
    create: function () {
        this.background = this.game.add.sprite(0, 0, 'city_background');

        this.buttons = new ButtonSet(Application.phaser);
        this.buttons.pushButton("BACK", 30, 30, 'back', this.goback, this);

        this.title = this.game.add.text(0, 50, "Highscores",
            { font: "100px Comic Sans MS", fill: "#FDFDFD", align: "center" }
        );

        this.title.x = this.game.world.centerX - this.title.width / 2;
        this.scoreBoard.createNewsBoard("news");
        this.scoreBoard.populateNewsBoard(5);

        this.sprite_right = this.game.add.sprite(250, 160, 'character');
        this.sprite_right.animations.add('walk', [0, 1, 2, 3, 4, 5]);
        this.sprite_right.animations.play('walk', 10, true);

        this.sprite_left = this.game.add.sprite(1030, 160, 'character');
        this.sprite_left.animations.add('walk', [0, 1, 2, 3, 4, 5]);
        this.sprite_left.animations.play('walk', 10, true);
        this.sprite_left.scale.x = -1;
    },

    /**
     * Make the player go back to the Main Menu from the High Score Screen
     * 
     * @author William Taylor & Jonathan Livingstone 
     * @version 1.0.0
     * @license Apache-2.0
     * @example 
     * // Go back to the Main Menu from the High Score screen
     * this.highScores.goback();
     */
    goback: function () {
        this.game.state.start('Menu');
    },

    /**
     * The function will render additional onscreen information
     * if the game is in debug mode.
     * 
     * @author William Taylor & Jonathan Livingstone 
     * @version 1.0.0
     * @license Apache-2.0
     * @example 
     * // Render the High Scores page
     * this.highScore.render();
     */
     render: function () {
        if (Application.debug) {
            this.game.time.advancedTiming = true;
            this.game.debug.text(this.game.time.fps || '--', 2, 14, "#000000");
        }
     }
};