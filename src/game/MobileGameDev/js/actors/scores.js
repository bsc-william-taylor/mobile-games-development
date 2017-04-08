
/**
 * The constructor which creates the Score Board
 * 
 * @constructor
 * @author William Taylor & Jonathan Livingstone 
 * @version 1.0.0
 * @license Apache-2.0
 * @example 
 * // some comment
 * some code
 */
function ScoreBoard(httpLink, phaser) {
    this.newsRequest = new HTTP_GetRequest(httpLink);
    this.newsStories = [];
    this.newsLabels = [];
    this.phaser = phaser;
}

/**
 * This function will create the News Board
 * 
 * @author William Taylor & Jonathan Livingstone 
 * @version 1.0.0
 * @license Apache-2.0
 * @example 
 * // some comment
 * some code
 */
ScoreBoard.prototype.createNewsBoard = function (backPlateID) {
    this.newsBackPlate = this.phaser.add.sprite(900, 200, backPlateID);
    this.newsBackPlate.height = 800;
    this.newsBackPlate.width = 800;
    this.newsBackPlate.x = this.phaser.world.centerX - 800 / 2;

    this.newsHeader = this.phaser.add.text(1050, 220, "Top 5 Highscores",
       { font: "60px Comic Sans MS", fill: "#FFFFFF", align: "center" }
    );

    this.newsHeader.height = 100;
    this.newsHeader.width = 500;
    this.newsHeader.x = this.phaser.world.centerX - 500 / 2;

    var _this = this;
    
    this.newsRequest.onRecieved(function (d) {
        if (_this.newsStories.length == 0) {
            _this.newsStories = d;
            _this.populateNewsBoard(5);
        } 
    });

    this.newsRequest.send();
}

/**
 * This function is used to populdate the news board
 * 
 * @author William Taylor & Jonathan Livingstone 
 * @version 1.0.0
 * @license Apache-2.0
 * @example 
 * // Populate the news board with a maximum of 10 stories
 * this.scoreBoard.populateNewsBoard(10);
 */
ScoreBoard.prototype.populateNewsBoard = function (maxStories) {
    for (i = 0; i < this.newsStories.length && i < maxStories; i++) {
        this.newsLabels[(i * 2)] = this.phaser.add.text(400, 350 + (i * 60), this.newsStories[i].Name.S,
            { font: "50px Comic Sans MS", fill: "#FDFDFD", align: "left" }
        );

        this.newsLabels[(i * 2) + 1] = this.phaser.add.text(800, 350 + (i * 60), this.newsStories[i].Highscore.N,
            { font: "50px Comic Sans MS", fill: "#FDFDFD", align: "left" }
        );
    }
}