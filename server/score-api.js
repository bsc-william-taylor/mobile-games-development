
const config = require('./utilities/config.js');
const express = require('express');
const amazon = require('aws-sdk');
const app = express();

amazon.config.update(config.getConfig());

class ScoreApi {
  constructor() {
    this.sessionPosts = 0;
    this.dynamodb = new amazon.DynamoDB({
      region: "eu-west-1",
      apiVersion: '2012-08-10'
    });
  }

  handleGetScores(req, res) {
    const data = {
      TableName: "UWS-MobileGameDevScores",
      KeyConditions: {
        Service: {
          ComparisonOperator: 'EQ',
          AttributeValueList: [{
            S: "VERSION1"
          }]
        },
        Highscore: {
          ComparisonOperator: 'GE',
          AttributeValueList: [{
            N: '0'
          }]
        }
      },

      AttributesToGet: ["Service", "Highscore", "Name"],
      ScanIndexForward: false,
      Limit: 100
    };

    this.dynamodb.query(data, (err, news) => {
      if (err) {
        console.log(err);
      } else {
        res.json(news.Items);
      }
    });
  }

  handleDeleteRequest(req, res) {
    if (req.body && req.body.service && req.body.name && req.body.highscore) {
      const params = {
        TableName: "UWS-MobileGameDevScores",
        Key: {
          Service: { S: req.body.service },
          Highscore: { N: req.body.highscore },
        },
        Expected: {
          Name: {
            Exists: true,
            Value: {
              S: req.body.name
            }
          }
        }
      };

      this.dynamodb.deleteItem(params, function (err, data) {
        if (err) {
          res.json({ "msg": err });
        } else {
          res.json({ "msg": "item deleted successful" });
        }
      });
    } else {
      res.json({ "msg": "invalid request" });
    }
  }

  handleScorePost(req, res) {
    if (req.body && req.body.service && req.body.highscore && req.body.name) {
      const params = {
        Item: {
          Service: { S: req.body.service },
          Highscore: { N: req.body.highscore },
          Name: { S: req.body.name },
        },

        TableName: "UWS-MobileGameDevScores"
      };

      this.sessionPosts++;
      this.dynamodb.putItem(params, (err, data) => {
        if (err) {
          console.log(err, err.stack);
          res.json({ "msg": "Score Post Failed" });
        } else {
          res.json({ "msg": "Score Posted" });
        }
      });
    } else {
      res.json({ "msg": "Invalid params" });
    }
  }
}

module.exports = (() => {
  const scoreApi = new ScoreApi();

  app.post('/postScore/', (request, response) => {
    scoreApi.handleScorePost(request, response);
  });

  app.get('/getScores/', (request, response) => {
    scoreApi.handleGetScores(request, response);
  });

  app.post('/deleteScore/', (request, response) => {
    scoreApi.handleDeleteRequest(request, response);
  });

  return app;
})();
