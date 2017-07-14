
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const app = express();

const levelApi = require('./level-api.js');
const scoreApi = require('./score-api.js');
const newsApi = require('./news-api.js');

class Server {
  constructor(serverName) {
    this.name = serverName;
    this.portNumber = 3000;
  }

  to_minutes(num) {
    let mins = (num / 1000) / 60;
    return mins.toFixed(2);
  }

  setListeningPort(portNumber) {
    if (this.portNumber >= 2000) {
      this.portNumber = portNumber;
    } else {
      this.portNumber = 3000;
    }
  }

  start() {
    const startTime = Date.now();

    app.use(bodyParser.json());
    app.use(cors());
    app.use('/level/', levelApi);
    app.use('/score/', scoreApi);
    app.use('/news/', newsApi);
    app.get('/', (req, res) => {
      const html = `
      <html>
        <body>
          <h1>Server online</h1>
        </body>
      </html>
      `;

      res.setHeader('Content-Type', 'text/html');
      res.write(html);
      res.end();
    });

    const server = app.listen(this.portNumber, () => {
      const host = server.address().address;
      const port = server.address().port;

      console.log(this.name, `Listening at http://${host}:${port}`);
    });
  }
}

const port = () => Number(process.argv.slice(-1)[0]);
const server = new Server('MobileGameDev Server');
server.setListeningPort(port());
server.start();
