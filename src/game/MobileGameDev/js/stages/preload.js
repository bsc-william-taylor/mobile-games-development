
/**
 * Our game namespace which will hold all scenes as inner namespaces 
 * to avoid any sort of name clash
 * @namespace
 */
var MobileGame = MobileGame || {};

/**
 * This is an array which will store loaded level data which shall be taken from the server.
 * 
 * @author William Taylor & Jonathan Livingstone 
 * @version 1.0.0
 * @public 
 */
MobileGame.levelLayouts = [];

/**
 * Enum for ID to the level json data which is stored in the  levelLayouts array
 * which is stored in the MobileGame namespace
 * @readonly
 * @enum {number} ID
 */
var LEVEL_LAYOUT_ID = {
    LV1: 1,
    LV2: 2,
    LV3: 3,
    LV4: 4,
    LV5: 5
};


/**
 * The function which will return json data if it has been loaded
 * from te server or will return 0 if no data from the server has been
 * recieved.
 *
 * @constructor
 * @author William Taylor & Jonathan Livingstone 
 * @version 1.0.0
 * @license Apache-2.0
 */
MobileGame.getLayout = function (ID) {
    if (ID >= MobileGame.levelLayouts.length) {
        return 0;
    } else {
        return MobileGame.levelLayouts[ID - 1];
    }
}


/**
 * The preload object which will handle the loading
 *
 * @constructor
 * @author William Taylor & Jonathan Livingstone 
 * @version 1.0.0
 * @license Apache-2.0
 */
MobileGame.Preload = MobileGame.Preload || function () { };

MobileGame.Preload.prototype = {
    /**
     * This is the Phaser state that the game will start when the game
     * has loaded.
     * 
     * @author William Taylor & Jonathan Livingstone 
     * @version 1.0.0
     * @public 
     */
    startingState: "Menu",

    /**
     * This is the preload function, which loads the game's resources
     * 
     * @author William Taylor & Jonathan Livingstone 
     * @version 1.0.0
     * @license Apache-2.0
     * @example 
     * // Preload the class
     * this.preoad.prelaod();
     */
    preload: function () {
        this.game = Application.phaser;
        this.game.input.MAX_POINTERS = 1;

        this.background = this.game.add.sprite(0, 0, "splash");
        this.preloadBar = this.game.add.sprite(640, 600, "loader");
        this.preloadBar.anchor.setTo(0.5);

        this.game.load.setPreloadSprite(this.preloadBar);
        this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
        this.game.scale.refresh();

        var assetFile = new HTTP_LocalRequest("data/load.txt");
        var jsonText = assetFile.grab(true);
        var instance = this;

        this.continue = false;

        for (var i = 0; i < jsonText.assets.length; i++) {
            var type = jsonText.assets[i].type;

            switch (type) {
                case "spritesheet": this.game.load.spritesheet(jsonText.assets[i].ID, jsonText.assets[i].filename, 54, 73, 11); break;
                case "image": this.game.load.image(jsonText.assets[i].ID, jsonText.assets[i].filename); break;
                case "audio": this.game.load.audio(jsonText.assets[i].ID, jsonText.assets[i].filename); break;

                default: console.log("Unsupported file type"); break;
            }
        }
 
        var requests = new HTTP_PostRequest("http://52.16.253.24:3002/level/getLevel");
        var instance = this;

        requests.setCallback(function (data) {
            MobileGame.levelLayouts.push(data);

            var length = MobileGame.levelLayouts.length;

            if (length < 5) {
                var body = { "level": "level" + (length+1).toString() + ".json" };
                requests.send(body);
            } else {
                instance.continue = true;
            }
        });

       
        this.skip = requests.send({ "level": "level1.json" });
    },

    /**
     * This is the main creation function, which creates pointers
     * and then starts the actual game
     * 
     * @author William Taylor & Jonathan Livingstone 
     * @version 1.0.0
     * @license Apache-2.0
     * @example 
     * // Create the data for the class
     * this.preload.create();
     */
    create: function () {
        this.game.input.addPointer();
        this.game.input.addPointer();

        if (!this.skip || this.continue && Music.hasDecodedTracks()) {
            Music.play("menu", true);

            this.game.state.start(this.startingState);
        }
    },
}