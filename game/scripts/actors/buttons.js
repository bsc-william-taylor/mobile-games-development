
import { Music } from './music.js';

export class ButtonSet {
  constructor(phaser) {
    this.phaser = phaser;
    this.buttons = [];
    this.isOver = false;
    this.tint = "0xFFFFFF";
    this.onUp = function (button) {}
  }

  pushButton(ID, x, y, texureID, callback, instance, tint) {
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
      Music.play(this.phaser, "click");
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

  setButtonSetSize(width, height) {
    for (let i = 0; i < this.buttons.length; i++) {
      this.buttons[i].button.height = height;
      this.buttons[i].button.width = width;
    }
  }

  attachText(buttonID, text, textFont) {
    for (let i = 0; i < this.buttons.length; i++) {
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
}
