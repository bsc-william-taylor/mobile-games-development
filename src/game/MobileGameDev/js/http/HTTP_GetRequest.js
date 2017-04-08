

/**
 * The HTTP_GetRequest will return json data provided from a HTTP
 * get request from a given server.
 * 
 * @constructor
 * @author William Taylor & Jonathan Livingstone 
 * @version 1.0.0
 * @license Apache-2.0
 * @param { string } url - The address to the api which will send back some data.
 * @example 
 * // Creates a HTTP_GetRequest object which will send the GET request
 * var request = new HTTP_GetRequest("127.0.0.1");
 */
function HTTP_GetRequest(url) {
    /**
     * The XMLHttpRequest object which will handle the network protocol.
     * 
     * @author William Taylor & Jonathan Livingstone 
     * @version 1.0.0
     * @public 
     */
    this.xmlHttpRequest = new XMLHttpRequest();

   /**
    * the url to send the data to
    * 
    * @author William Taylor & Jonathan Livingstone 
    * @version 1.0.0
    * @license Apache-2.0
    * @public 
    */
    this.requestURL = url;

    /**
     * The callback function called when the server has responded
     * with the relevant data.
     * 
     * @author William Taylor & Jonathan Livingstone 
     * @license Apache-2.0
     * @version 1.0.0
     * @public 
     */
    this.callback = null;
}

/**
 * This is just a setter for the callback function.
 * 
 * @author William Taylor
 * @version 1.0.0
 * @license Apache-2.0
 * @param { function } func - The callback function when data have been recieved
 * @example 
 * // This will then send the top 5 scores to the response object in JSON format
 * request.onRecieved(function(data) { console.log(data); });
 */
HTTP_GetRequest.prototype.onRecieved = function (func) {
    this.callback = func;
}

/**
 * This function sends the request and will call the callback function when it 
 * has recieved the relevant data
 * 
 * @author William Taylor
 * @version 1.0.0
 * @license Apache-2.0
 * @example 
 * // Send the request wait for your callback to be executed
 * request.send();
 */
HTTP_GetRequest.prototype.send = function () {
    try {
        var instance = this;
        this.xmlHttpRequest.onload = function () {
            if (instance.callback) {
                instance.callback(JSON.parse(this.responseText));
            }
        }

        this.xmlHttpRequest.open("GET", this.requestURL, true);
        this.xmlHttpRequest.send(null);
    } catch (err) {
        var exception = new GameException();
        exception.set("Couldnt execute get request", this.requestURL, SEVERITY.HIGH);
        exception.throw();
        return "";
    }
}