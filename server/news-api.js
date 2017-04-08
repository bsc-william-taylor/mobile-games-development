
const config = require('./utilities/config.js');
const express = require('express');
const amazon = require('aws-sdk');
const app = express();

amazon.config.update(config.getConfig());

class NewsApi {
  constructor() {
    this.sessionPosts = 0;
    this.dynamodb = new amazon.DynamoDB({
      region: "eu-west-1",
      apiVersion: '2012-08-10'
    });
  }

  getPostID(version, callback) {
    var data = {
      TableName: "UWS-MobileGameDevNews",
      KeyConditions: {
        Service: {
          ComparisonOperator: 'EQ',
          AttributeValueList: [{ S: version }]
        },
        PostID: {
          ComparisonOperator: 'GE',
          AttributeValueList: [{ N: '0' }]
        }
      },
      AttributesToGet: ["PostID"],
      ScanIndexForward: false
    };

    this.dynamodb.query(data, function (err, news) {
      if (err) {
        console.log(err);
      } else {
        if (news.Count == 0) {
          callback("0");
        } else {
          var ID = Number(news.Items[0].PostID.N);
          callback((++ID).toString());
        }
      }
    });
  }

  handleNewsPost(req, res) {
    if (req.body && req.body.heading && req.body.service && req.body.text) {
      this.getPostID(req.body.service, (postNumber) => {
        const params = {
          TableName: "UWS-MobileGameDevNews",
          Item: {
            Heading: { S: req.body.heading },
            PostID: { N: postNumber },
            Service: { S: req.body.service },
            Text: { S: req.body.text }
          }
        };

        this.dynamodb.putItem(params, function (err, data) {
          if (err) {
            console.log(err, err.stack);
            res.json({ "msg": err });
          } else {
            res.json({ "msg": "News Posted" });
          }
        });
      });
    } else {
      res.json({ "msg": "Didnt provide all information needed" });
    }
  }

  handleListNews(req, res) {
    const data = {
      TableName: "UWS-MobileGameDevNews",
      KeyConditions: {
        Service: {
          ComparisonOperator: 'EQ',
          AttributeValueList: [{ S: "VERSION1" }]
        },
        PostID: {
          ComparisonOperator: 'GE',
          AttributeValueList: [{ N: '0' }]
        }
      },
      AttributesToGet: ["Heading", "PostID", "Text", "Service"],
      ScanIndexForward: false
    };

    this.dynamodb.query(data, function (err, news) {
      if (err) {
        console.log(err);
        res.json([]);
      } else {
        res.json(news.Items);
      }
    });
  }

  handleDeleteRequest(req, res) {
    if (req.body.service && req.body.postID) {
      const params = {
        TableName: "UWS-MobileGameDevNews",
        Key: {
          Service: { S: req.body.service },
          PostID: { N: req.body.postID }
        }
      };

      this.dynamodb.deleteItem(params, (err, data) => {
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
}

module.exports = (() => {
  const newsApi = new NewsApi();

  app.post('/postNews/', function (request, response) {
    newsApi.handleNewsPost(request, response);
  });

  app.get('/getNews/', function (request, response) {
    newsApi.handleListNews(request, response);
  });

  app.post('/deleteNews/', function (request, response) {
    newsApi.handleDeleteRequest(request, response);
  });

  return app;
})();
