

var MobileGame = MobileGame || {};

/**
 * This is the constructor for the Gameover screen
 * 
 * @constructor
 * @author William Taylor & Jonathan Livingstone 
 * @version 1.0.0
 * @license Apache-2.0
 * @example 
 * // Create the game over screen
 * this.gameOver = new GameOver();
 */
MobileGame.GameOver = function () { }

MobileGame.GameOver.prototype = {
    /**
     * The initialization function which saves the player's score ready to be displayed
     * and stored in the database.
     * 
     * @author William Taylor & Jonathan Livingstone 
     * @version 1.0.0
     * @license Apache-2.0
     * @example 
     * // Initialize the game over screen
     * this.gameOver.init();
     */
    init: function (params) {
        this.playersScore = params;
        PLAYER_SCORE(-this.playersScore);
    },

    /**
     * The preload function for the Gameover screen
     * 
     * @author William Taylor & Jonathan Livingstone 
     * @version 1.0.0
     * @license Apache-2.0
     * @example 
     * // Load the Game Over screen
     * this.gameover.preload();
     */
    preload: function () {
        this.game = Application.phaser;
        this.game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
    },

    /**
     * Create the Gameover screen, including the Sprites and Buttons
     * 
     * @author William Taylor & Jonathan Livingstone 
     * @version 1.0.0
     * @license Apache-2.0
     * @example 
     * // Create the Game Over screen
     * this.gameover.create();
     */
    create: function () {
        if (!this.playersScore) this.playersScore = 100;
        this.background = this.game.add.sprite(0, 0, 'city_background');

        this.title = this.game.add.text(0, 50, "Game Over",
            { font: "120px Comic Sans MS", fill: "#FDFDFD", align: "center" }
        );

        this.title.x = this.game.world.centerX - this.title.width / 2;

        this.back = this.game.add.button(30, 30, 'back', this.backPress, this);
        this.back.onInputDown.add(this.backPress, this);
        this.back.height /= 1.5;
        this.back.width /= 1.5;

        this.score = this.game.add.text(0, 250, "Your Score was " + this.playersScore.toString(),
            { font: "60px Comic Sans MS", fill: "#FDFDFD", align: "center" }
        );

        this.score.x = this.game.world.centerX - this.score.width / 2;

        this.buttons = new ButtonSet(this.game);
        this.buttons.pushButton("SCORES", this.game.world.centerX - 110, 550, 'button', this.highScore, this);
        this.buttons.setButtonSetSize(220, 80);

        this.buttons.attachText("SCORES", "View Highscores", "22px Comic Sans MS");

        var score = this.playersScore.toString();

        this.timerID = setTimeout(function () {
            var name = (prompt("Enter your name"));

            if (name) {
                var postRequest = new HTTP_PostRequest("http://52.16.253.24:3002/score/postScore/");
                var body = {
                    "name": name.toString(),
                    "highscore": score,
                    "service": "VERSION1"
                }
               
                postRequest.send(body);
            }
        }, 1000);

        Music.stop("level");
        Music.play("gameover");
    },

    /**
     * Takes the user back to the Highscores screen
     * 
     * @author William Taylor & Jonathan Livingstone 
     * @version 1.0.0
     * @license Apache-2.0
     * @example 
     * // Go to the Highscore screen
     * this.gameover.highScore();
     */
    highScore: function () {
        clearTimeout(this.timerID);

        Music.stop("gameover");
        Music.play("menu", true);

        this.game.state.start("Highscores");
    },

    /**
     * Takes the User to the Main Menu
     * 
     * @author William Taylor & Jonathan Livingstone 
     * @version 1.0.0
     * @license Apache-2.0
     * @example 
     * // Take the User back to the Main Menu
     * this.gameover.backPress();
     */
    backPress: function () {
        clearTimeout(this.timerID);

        Music.stop("gameover");
        Music.play("menu", true);

        this.game.state.start("Menu");
    },

    /**
    * This function will render additional debug information on screen
    * if the game is in debug mode.
    * 
    * @author William Taylor & Jonathan Livingstone 
    * @version 1.0.0
    * @license Apache-2.0
    * @example 
    * // Render the Gameover screen
    * this.gameover.render();
    */
    render: function () {
        if (Application.debug) {
            this.game.time.advancedTiming = true;
            this.game.debug.text(this.game.time.fps || '--', 2, 14, "#000000");
        }
    }
}
