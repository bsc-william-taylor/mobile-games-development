
 /**
 * A enum for setting how severe the game error/exception is. So that
 * we log small errors and present large errors when they happen.
 * 
 * @author William Taylor & Jonathan Livingstone 
 * @version 1.0.0
 * @license Apache-2.0
 * @enum { string } 
 * @readonly
 */
var ERROR_SEVERITY = {
     /**
     * When a exception is given an OK to ignore severity value
     * the program will continue to execute and the error
     * message will be outputted to the console.
     * 
     * @author William Taylor & Jonathan Livingstone 
     * @version 1.0.0
     * @type { string }
     * @public 
     */
    OK_TO_IGNORE: "Ignore",

     /**
    * When a exception is given an HIGH severity value
    * the program will stop executing and the error
    * message will be outputted using the alert function.
    *  
    * @author William Taylor & Jonathan Livingstone 
    * @version 1.0.0
    * @type { string }
    * @public 
    */
    HIGH: "High",

    /**
     * When a exception is given an HIGH severity value
     * the program will stop executing and the error
     * message will be outputted using the alert function.
     *  
     * @author William Taylor & Jonathan Livingstone 
     * @version 1.0.0
     * @type { string }
     * @public 
     */
    LOW: "Low"
}

/**
 * The following is a object that handles game errors
 * and displays relevant debug information when required.
 * 
 * @constructor
 * @author William Taylor & Jonathan Livingstone 
 * @version 1.0.0
 * @license Apache-2.0
 */
function GameException() {
    /**
     * The severity of the error/execption that the game has encountered
     * 
     * @author William Taylor & Jonathan Livingstone 
     * @version 1.0.0
     * @public 
     */
    this.severity = ERROR_SEVERITY.OK_TO_IGNORE;

    /**
     * The message to be displayed to the programmer for debugging
     * purposes
     * 
     * @author William Taylor & Jonathan Livingstone 
     * @version 1.0.0
     * @public 
     */
    this.message = "";

    /**
     * The title for either the console log of alert box
     * 
     * @author William Taylor & Jonathan Livingstone 
     * @version 1.0.0
     * @public 
     */
    this.title = "";
}

/**
 * This function throws the exception and displays the message
 * in either the console or opens up an alert box instead.
 * 
 * @author William Taylor & Jonathan Livingstone 
 * @version 1.0.0
 * @license Apache-2.0
 * @example 
 * // throws the exception showing the relevant debug information
 * exception.throw();
 */
GameException.prototype.throw = function () {
    if (this.severity === ERROR_SEVERITY.OK_TO_IGNORE) {
        console.log(this.severity);
        console.log(this.title);
        console.log(this.message);
    } else {
        window.alert("Throwing " + this.severity + " problem error");
        window.alert(this.title + "\n" + this.message);
    }
}

/**
 * This function sets the information that will come up when
 * the exception is thrown.
 * 
 * @author William Taylor & Jonathan Livingstone 
 * @version 1.0.0
 * @license Apache-2.0
 * @param { string } title - The title for the exception
 * @param { string } message - The message for the exception
 * @param { enum } severity - The severity of the exception
 * @example 
 * // Sets the information
 * exception.throw("Error", "You have an exception", ERROR_SEVERITY.LOW);
 */
GameException.prototype.set = function (title, message, severity) {
    this.setSeverity(severity);
    this.setMessage(message);
    this.setTitle(title);
}

/**
 * This is a setter for the message property
 * 
 * @author William Taylor & Jonathan Livingstone 
 * @version 1.0.0
 * @license Apache-2.0
 * @param { string } msg - The message for the exception
 * @example 
 * // Sets message to equal "ERROR1"
 * gameException.setMessage("ERROR1");
 */
GameException.prototype.setMessage = function (msg) {
    if (msg) {
        this.message = msg;
    }
}

/**
 *  This is a setter for the severity property
 * 
 * @author William Taylor & Jonathan Livingstone 
 * @version 1.0.0
 * @license Apache-2.0
 * @param { enum } severity - The severity of the exception
 * @example 
 * // Sets severity to equal ERROR_SEVERITY.LOW
 * gameException.setSeverity(ERROR_SEVERITY.LOW);
 */
GameException.prototype.setSeverity = function (severity) {
    if (severity) {
        this.severity = severity;
    }
}

/**
 * This is a setter for the title property
 * 
 * @author William Taylor & Jonathan Livingstone 
 * @version 1.0.0
 * @license Apache-2.0
 * @param { string } title - The title for the exception
 * @example 
 * // Sets title to equal "Major Error"
 * gameException.setTitle("Major Error");
 */
GameException.prototype.setTitle = function (title) {
    if (title) {
        this.title = title;
    }
}