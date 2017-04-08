
var MobileGame = MobileGame || {};

/**
 * The constructor for level 4
 * 
 * @constructor
 * @author William Taylor & Jonathan Livingstone 
 * @version 1.0.0
 * @license Apache-2.0
 * @example 
 * // Construct level 4
 * this.level = new MobileGame.Level4();
 */
MobileGame.Level4 = function () { }

MobileGame.Level4.prototype = {
    /**
     * Preloads all memory for level 4's resources
     * 
     * @author William Taylor & Jonathan Livingstone 
     * @version 1.0.0
     * @license Apache-2.0
     * @example 
     * // Preload level 4
     * this.level1.preload();
     */
    preload: function () {
        this.pointer = Application.phaser.input.activePointer;
        this.pointer.y = 650;
        this.pointer.x = 0;

        this.game = Application.phaser;

        this.levelLayout = new Level(LEVEL_LAYOUT_ID.LV4, "data/lvl/level4.txt");
        this.uiButtons = new ButtonSet(Application.phaser);
        this.player = new Player(this.game);
    },

    /**
     * Create all the assets for level 4
     * 
     * @author William Taylor & Jonathan Livingstone 
     * @version 1.0.0
     * @license Apache-2.0
     * @example 
     * // Create level 4
     * this.level4.create();
     */
    create: function () {
        var instance = this;

        this.levelLayout.createWorld();
        this.player.setup();

        this.uiButtons.pushButton("MENU", 30, 30, 'button', this.handleBackButtonPress, this);
        this.uiButtons.pushButton("SWITCH", 1250 - 200, 30, 'button', this.handleToggleButtonPress, this, "0x00FF00");
        this.uiButtons.setButtonSetSize(200, 75);

        this.uiButtons.attachText("MENU", "Menu", "30px Comic Sans MS");
        this.uiButtons.attachText("SWITCH", "Change Bullet", "23px Comic Sans MS");
        this.uiButtons.onUp = function (buttons) {
            buttons[1].button.tint = instance.player.getBulletColour();
        }
    },

    /**
     * The following will update the state and call the appropiate action
     * when certain events are triggered.
     * 
     * @author William Taylor & Jonathan Livingstone 
     * @version 1.0.0
     * @license Apache-2.0
     * @example 
     * // Updates level 4
     * this.level4.update();
     */
    update: function () {
        this.levelLayout.update(this.player, this.blockGroup);
        this.player.update(Application.phaser.input.activePointer, this.levelLayout, this.uiButtons.isOver);
    },

    /** 
    * The render function is an additional render pass which will be used
    * to render debug information onto the screen if the game is in debug mode.
    * 
    * @author William Taylor & Jonathan Livingstone 
    * @version 1.0.0
    * @license Apache-2.0
    * @example 
    * // Render debug information for level 4
    * this.level4.render();
    */
    render: function () {
        if (Application.debug) {
            this.game.time.advancedTiming = true;
            this.game.debug.text(this.game.time.fps || '--', 2, 14, "#000000");
        }
    },

    /**
     * Switch the player's current projectile
     * 
     * @author William Taylor & Jonathan Livingstone 
     * @version 1.0.0
     * @license Apache-2.0
     * @example 
     * // Switch the player's current projectile
     * this.level4.handleToggleButtonPress();
     */
    handleToggleButtonPress: function () {
        this.player.switchProjectile();
    },

    /**
     * Takes the user back to the main menu
     * 
     * @author William Taylor & Jonathan Livingstone 
     * @version 1.0.0
     * @license Apache-2.0
     * @example 
     * // Take the user back to the main menu
     * this.level1.handleBackButtonPress();
     */
    handleBackButtonPress: function () {
        Music.play("menu", true);

        this.levelLayout.stopSpawningEnemies();
        this.game.state.start("Menu");
    },
}