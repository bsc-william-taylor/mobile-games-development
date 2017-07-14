
// Import the frameworks we will be using
var body_parser = require('body-parser');
var application = require('express')();
var config = require('../util/config.js');
var amazon = require('aws-sdk');
var path = require('path');
var fs = require('fs');

amazon.config.update(config.getConfig());

/**
 * API_Level is a class which represents the LevelAPI which allows a application
 * to access the design for each level in the game.
 * 
 * @constructor
 * @author William Taylor
 * @version 1.0.0
 * @license Apache-2.0
 * @example 
 * // Creates a API_Level object which will then handle requests
 * var levelAPI = new API_Level();
 */
function API_Level() {    
    /**
     * A dynamodb object for communicating with online 
     * database tables managed by the AWS sdk
     * 
     * @author William Taylor
     * @version 1.0.0
     * @public 
     */
    this.dynamodb = new amazon.DynamoDB({
        region: "eu-west-1",
        apiVersion: '2012-08-10'
    });
}

/**
 * This function handles the getLevel get http request and
 * returns the level in a json format.
 * 
 * @author William Taylor
 * @version 1.0.0
 * @license Apache-2.0
 * @example 
 * handleGetLevel(request, response); // This will handle the request for the server
 */
API_Level.prototype.handleGetLevel = function (req, res) {
    // make sure the level is specified
    if (req.body.level) {
        // then calculate the filename to grab
        var filename = "./lvls/" + req.body.level;
        fs.readFile(filename, 'utf8', function (err, data) {
          if (err) throw err;
          res.json(JSON.parse(data.replace(/^\uFEFF/, ''))); // then send it back
        });
    } else {
        // if arguments arent specified send this message back for debugging reasons
        res.json({ "msg": "didnt pass the level you want to get in the request" });
    }
}

/**
 * This function sets up the API_Level object and make sure that
 * all incoming requests are handled. it also sets up the middleware
 * which will handle a set of requests in the sub url /level/
 * 
 * @author William Taylor
 * @version 1.0.0
 * @license Apache-2.0
 * @example 
 * // Sets up a API_Level object which will then handle requests
 * level_API.setup();
 */
API_Level.prototype.setup = function () {
    // First capture the classes instance so we can refer to it later
    var instance = this;
    // then provide exports for this node module
    module.exports = function () {
        // attach the following post request to post scores
        application.post('/getLevel/', function (request, response) {
            // upon recieving said request we will call this function
            instance.handleGetLevel(request, response);
        });
        
        // then return the express instance which will act as the middleware for the server module
        return application;
    }();
}

// Create the score api object and initialise it
var levelAPI = new API_Level();
levelAPI.setup();