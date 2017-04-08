
/**
 * The following was a namespace to manage the browsers
 * state however has been depricated and replaced by using
 * phasers built in functions.
 * 
 * @author William Taylor & Jonathan Livingstone 
 * @version 1.0.0
 * @license Apache-2.0
 * @deprecated Since 0.9
 * @namespace
 */
var Browser = {
    /**
    * The current state of the window if true the browser is fullscreen.
    * 
    * @author William Taylor & Jonathan Livingstone 
    * @version 1.0.0
    * @public 
    */
    fullscreen: false,

    /**
     * This function toggles the fullscreen state.
     * 
     * @author William Taylor & Jonathan Livingstone 
     * @version 1.0.0
     * @license Apache-2.0
     * @deprecated Since 0.9
     * @example 
     * // Toggles the fullscreen mode for the browser
     * Browser.toggleFullscreen();
     */
    toggleFullscreen: function () {
        if (!this.fullscreen) {
            if (document.documentElement.requestFullScreen) {
                document.documentElement.requestFullScreen();
            } else if (document.documentElement.mozRequestFullScreen) {
                document.documentElement.mozRequestFullScreen();
            } else if (document.documentElement.webkitRequestFullScreen) {
                document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
            }

            this.fullscreen = true;
        } else {
            if (document.cancelFullScreen) {
                document.cancelFullScreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            }

            this.fullscreen = false;
        }
    },
}