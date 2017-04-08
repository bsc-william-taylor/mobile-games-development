
/**
 * The HTTP_PostRequest allows JSON data to be posted to a certain
 * server.
 * 
 * @constructor
 * @author William Taylor & Jonathan Livingstone 
 * @version 1.0.0
 * @license Apache-2.0
 * @param { string } url - The address to the api which will handle the json data posted
 * @example 
 * // Creates a HTTP_PostRequest object which can then send requests to that url
 * var request = new HTTP_PostRequest("127.0.0.1");
 */
function HTTP_PostRequest(url) {
    /**
     * The XMLHttpRequest object which will handle the network protocol.
     * 
     * @author William Taylor & Jonathan Livingstone 
     * @version 1.0.0
     * @public 
     */
    this.xmlHttpRequest = null;

    /**
     * the url to send the data to
     * 
     * @author William Taylor & Jonathan Livingstone 
     * @version 1.0.0
     * @public 
     */
    this.requestURL = url;

    this.callback = function () {};
}

/**
 * This function sends the data provided in the request to the url
 * given in the constructor.
 * 
 * @author William Taylor & Jonathan Livingstone 
 * @version 1.0.0
 * @license Apache-2.0
 * @param { object } body - A JSON object which represents the body of the request.
 * @example 
 * // This will then send this data to the server
 * request.send({"msg":"hi"});
 */
HTTP_PostRequest.prototype.send = function (body) {
    var instance = this;

    try {
        this.xmlHttpRequest = new XMLHttpRequest();
        this.xmlHttpRequest.onload = function () {
            instance.callback(this.responseText);
        }

        this.xmlHttpRequest.open("POST", this.requestURL, false);
        this.xmlHttpRequest.setRequestHeader("Content-type", "application/json");
        this.xmlHttpRequest.send(JSON.stringify(body));

        var status = this.xmlHttpRequest.status;

        if (status >= 200 && status < 304) {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        var gameException = new GameException();
        gameException.set("HTTP_PostRequest", err.message, ERROR_SEVERITY.OK_TO_IGNORE);
        gameException.throw();

        return false;
    }
}

HTTP_PostRequest.prototype.setCallback = function (callback) {
    this.callback = callback;
}

HTTP_PostRequest.prototype.setUrl = function (url) {
    this.url = url;
}