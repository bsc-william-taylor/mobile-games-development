
const config = require('./utilities/config.js');
const express = require('express');
const amazon = require('aws-sdk');
const path = require('path');
const app = express();
const fs = require('fs');

amazon.config.update(config.getConfig());

class LevelApi {
  constructor() {
    this.dynamodb = new amazon.DynamoDB({
      region: "eu-west-1",
      apiVersion: '2012-08-10'
    });
  }

  getLevel(req, res) {
    if (req.body.level) {
      const filename = `./levels/${req.body.level}`;
      fs.readFile(filename, 'utf8', function (err, data) {
        if (err)
          throw err;
        res.json(JSON.parse(data.replace(/^\uFEFF/, '')));
      });
    } else {
      res.json({ "msg": "didnt pass the level you want to get in the response" });
    }
  }
}

module.exports = (() => {
  const levelApi = new LevelApi();
  app.post('/getLevel/', (request, response) => {
    levelApi.getLevel(request, response);
  });

  return app;
})();
