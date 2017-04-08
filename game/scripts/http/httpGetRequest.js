
import { GameException, ErrorSeverity } from '../exception.js';

export class HttpGetRequest {
  constructor(url) {
    this.xmlHttpRequest = new XMLHttpRequest();
    this.requestURL = url;
    this.callback = null;
  }

  onReceived(func) {
    this.callback = func;
  }

  send() {
    try {
      const instance = this;
      this.xmlHttpRequest.onload = function () {
        if (instance.callback) {
          instance.callback(JSON.parse(this.responseText));
        }
      }

      this.xmlHttpRequest.open("GET", this.requestURL, true);
      this.xmlHttpRequest.send(null);
    } catch (err) {
      var exception = new GameException();
      exception.set("Couldnt execute get request", this.requestURL, ErrorSeverity.HIGH);
      exception.throw();
    }
  }
}
