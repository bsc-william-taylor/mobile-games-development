
/**
 * This is the main function for the news board. It takes the HTTP Link, and the Phaser Framwork,
 * as parameters
 * 
 * @constructor
 * @author William Taylor & Jonathan Livingstone 
 * @version 1.0.0
 * @license Apache-2.0
 * @example 
 * // Create the News Boards
 * this.newsBoard = new NewsBoard("http://www.info.com", Phaser.application)
 */
function NewsBoard(httpLink, phaser) {
    /**
     * Add a new piece of news onto the board
     * 
     * @author William Taylor & Jonathan Livingstone 
     * @version 1.0.0
     * @public 
     */
    this.newsRequest = new HTTP_GetRequest(httpLink);

    /**
     * This sets the news stories to be 0
     * 
     * @author William Taylor & Jonathan Livingstone 
     * @version 1.0.0
     * @public 
     */
    this.newsStories = [];

    /**
     * This sets the labels for the news to be 0
     * 
     * @author William Taylor & Jonathan Livingstone 
     * @version 1.0.0
     * @public 
     */
    this.newsLabels = [];

    /**
     * Pass the Phaser framework to the News class
     * 
     * @author William Taylor & Jonathan Livingstone 
     * @version 1.0.0
     * @public 
     */
    this.phaser = phaser;    
}

/**
 * Creates a new News Board
 * 
 * @author William Taylor & Jonathan Livingstone 
 * @version 1.0.0
 * @license Apache-2.0
 * @example 
 * // some comment
 * some code
 */
NewsBoard.prototype.createNewsBoard = function (backPlateID) {
    this.newsBackPlate = this.phaser.add.sprite(500, 250, backPlateID);
    this.newsBackPlate.height = 350;
    this.newsBackPlate.width = 600;

    this.newsHeader = this.phaser.add.text(515, 260, "News Board",
       { font: "60px Comic Sans MS", fill: "#FFFFFF", align: "center" }
    );

    this.newsHeader.height = 50;
    this.newsHeader.width = 200;
   
    var _this = this;

    this.newsRequest.onRecieved(function (d) {
        if (_this.newsStories.length == 0) {
            _this.newsStories = d;
            _this.populateNewsBoard(8);
        }
    });

    this.newsRequest.send();
}

/**
 * This will populate the News Board with everything currently held
 * 
 * @author William Taylor & Jonathan Livingstone 
 * @version 1.0.0
 * @license Apache-2.0
 * @example 
 * // Populate stories in the news board, limiting the number of stories to 10
 * this.newsBoard.populateNewsBoard(10);
 */
NewsBoard.prototype.populateNewsBoard = function (maxStories) {
    for (i = 0; i < this.newsStories.length && i < maxStories; i++) {
        var header = "New Version";
        var text = "herewearetestingthelimitofthenewsfeedas";
        515, 260
        this.newsLabels[(i * 2)] = this.phaser.add.text(550, 330 + (i * 35), this.newsStories[i].Heading.S,
            { font: "20px Comic Sans MS", fill: "#FDFDFD", align: "left" }
        );

        this.newsLabels[(i * 2) + 1] = this.phaser.add.text(730, 330 + (i * 35), this.newsStories[i].Text.S,
            { font: "20px Comic Sans MS", fill: "#FDFDFD", align: "left" }
        );
    }
}