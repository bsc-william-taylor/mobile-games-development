
/**
 * Conctor to create a button
 * 
 * @constructor
 * @author William Taylor & Jonathan Livingstone 
 * @version 1.0.0
 * @license Apache-2.0
 * // create a button
 * this.button = new ButtonSet();
 */
function ButtonSet(phaser) {
    /**
     * The Phaser Framework
     * 
     * @author William Taylor & Jonathan Livingstone 
     * @version 1.0.0
     * @public 
     */
    this.phaser = phaser;

    /**
     * Description
     * 
     * @author William Taylor & Jonathan Livingstone 
     * @version 1.0.0
     * @public 
     */
    this.buttons = [];

    /**
     * Description
     * 
     * @author William Taylor & Jonathan Livingstone 
     * @version 1.0.0
     * @public 
     */
    this.isOver = false;

    /**
     * Description
     * 
     * @author William Taylor & Jonathan Livingstone 
     * @version 1.0.0
     * @public 
     */
    this.tint = "0xFFFFFF";

    this.onUp = function (button) {

    }
}

/**
 * This is the function which handles what happens when the user presses down on a button
 * 
 * @author William Taylor & Jonathan Livingstone 
 * @version 1.0.0
 * @license Apache-2.0
 * @example
 * // some comment
 * some code
 */
ButtonSet.prototype.pushButton = function (ID, x, y, texureID, callback, instance, tint) {
    var newButton = this.phaser.add.button(x, y, texureID, callback, instance);
    var current = this;

    var onOut = function () {
        newButton.tint = current.tint;
        current.isOver = false;
        current.onUp(current.buttons);
    }

    var onDown = function () {
        newButton.tint = "0x333333";
        current.isOver = true;
        Music.play("click");
    }

    var onUp = function () {
        current.isOver = false;

        setTimeout(function () {
            newButton.tint = current.tint;
            current.onUp(current.buttons);
        }, 100);
    }

    newButton.onInputOver.add(function () { current.isOver = true; newButton.tint = "0x333333"; }, this);
    newButton.onInputDown.add(onDown, this);
    newButton.onInputOut.add(onOut, this);
    newButton.onInputUp.add(onUp, this);
 
    if (tint) {
        newButton.tint = tint;
    }

    this.buttons.push({
        id: ID.toString(),
        button: newButton,
        text: null
    });
}

/**
 * Set the side of the button based on a width and height
 * 
 * @author William Taylor & Jonathan Livingstone 
 * @version 1.0.0
 * @license Apache-2.0
 * @example
 * // Set the size of a button to {100, 30}
 * this.button.setButtonSetSize(100, 30);
 */
ButtonSet.prototype.setButtonSetSize = function (width, height) {
    for (i = 0; i < this.buttons.length; i++) {
        this.buttons[i].button.height = height;
        this.buttons[i].button.width = width;
    }
}

/**
 * Attach a string to get drawn ontop of a button
 * 
 * @author William Taylor & Jonathan Livingstone 
 * @version 1.0.0
 * @license Apache-2.0
 * @example
 * // Make the Play button say, "Play Game," in Ariel font
 * this.button.attachText("Play", "Play Game!", "Arial");
 */
ButtonSet.prototype.attachText = function (buttonID, text, textFont) {
    for (i = 0; i < this.buttons.length; i++) {
        if (this.buttons[i].id.toLowerCase() === buttonID.toLowerCase()) {
            var buttonImage = this.buttons[i].button;

            this.buttons[i].text = this.phaser.add.text(0, 0, text,
                { font: textFont, fill: "#FDFDFD", align: "left" }
            );

            var buttonMiddleY = buttonImage.y + (buttonImage.height / 2);
            var buttonMiddleX = buttonImage.x + (buttonImage.width / 2);
           

            this.buttons[i].text.y = buttonMiddleY - this.buttons[i].text.height / 2;
            this.buttons[i].text.x = buttonMiddleX - this.buttons[i].text.width / 2;
           
            return true;
        }
    }

    return false;
}