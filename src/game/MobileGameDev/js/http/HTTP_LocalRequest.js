
/**
 * The HTTP_LocalRequest allows a JSON file on the server that stores
 * the website to be accessed using a XMLHttpRequest object
 * 
 * @constructor
 * @author William Taylor & Jonathan Livingstone 
 * @version 1.0.0
 * @license Apache-2.0
 * @param { string } filename - The location of the local file on the server.
 * @example 
 * // Creates a HTTP_LocalRequest object which will retrieve the file
 * var request = new HTTP_LocalRequest("127.0.0.1");
 */
function HTTP_LocalRequest(filename) {
    /**
     * The filename that will be grabbed when grab() is called
     * 
     * @author William Taylor & Jonathan Livingstone 
     * @version 1.0.0
     * @public 
     */
    this.filename = filename;
}

/**
 * This function will then acquire  specific file and will return the
 * source inside it.
 * 
 * @author William Taylor
 * @version 1.0.0
 * @license Apache-2.0
 * @param { boolean } parse - Should we parse the json in the file
 * @example 
 * // jsonSource will be equal to JSON.parse(the_data_in_your_file);
 * var jsonSource = request.grab(true);
 * // data will be equal to (the_data_in_your_file);
 * var data = request.grab();
 */
HTTP_LocalRequest.prototype.grab = function (parse) {
    var request = new XMLHttpRequest();
    request.open('GET', this.filename, false);
    request.send(null);

    if (request.status == 200) {
        if (parse) {
            return JSON.parse(request.responseText);
        } else {
            return request.responseText;
        }
    } else {
        var exception = new GameException();
        exception.set("Couldnt get local asset", this.filename, SEVERITY.HIGH);
        exception.throw();
        return "";
    }
}

