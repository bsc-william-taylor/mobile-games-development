
var MobileGame = MobileGame || {};

MobileGame.Level5 = function () { }

/**
 * The constructor for level 5
 * 
 * @constructor
 * @author William Taylor & Jonathan Livingstone 
 * @version 1.0.0
 * @license Apache-2.0
 * @example 
 * // Construct level 5
 * this.level = new MobileGame.Level5();
 */
MobileGame.Level5.prototype = {
    /**
     * Create all the assets for level 5
     * 
     * @author William Taylor & Jonathan Livingstone 
     * @version 1.0.0
     * @license Apache-2.0
     * @example 
     * // Create level 5
     * this.level5.create();
     */
    preload: function () {
        this.pointer = Application.phaser.input.activePointer;
        this.pointer.y = 650;
        this.pointer.x = 640;

        this.game = Application.phaser;

        this.levelLayout = new Level(LEVEL_LAYOUT_ID.LV5, "data/lvl/level5.txt");
        this.uiButtons = new ButtonSet(Application.phaser);
        this.player = new Player(this.game);
    },

    /**
     * Create level 5
     * 
     * @author William Taylor & Jonathan Livingstone 
     * @version 1.0.0
     * @license Apache-2.0
     * @example 
     * // Create level 5
     * level5.create();
     */
    create: function () {
        this.levelLayout.createWorld();
        var instance = this;

        this.player.setup();
        this.player.setPosition(640, 650);

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
     * // Updates level 5
     * this.level5.update();
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
    * // Render debug information for level 5
    * this.level5.render();
    */
    render: function () {
        if (Application.debug) {
            this.game.time.advancedTiming = true;
            this.game.debug.text(this.game.time.fps || '--', 2, 14, "#000000");
        }
    },

    /**
     * Switch the player's projective when called
     * 
     * @author William Taylor & Jonathan Livingstone 
     * @version 1.0.0
     * @license Apache-2.0
     * @example 
     * // Switch the player's projectile
     * level5.handleToggleButtonPress();
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