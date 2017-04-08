
import { GameException, ErrorSeverity } from '../exception.js';

export class HttpPostRequest {
  constructor(url) {
    this.xmlHttpRequest = null;
    this.requestURL = url;
    this.callback = function () {};
  }

  send(body) {
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
      gameException.set("HTTP_PostRequest", err.message, ErrorSeverity.OK_TO_IGNORE);
      gameException.throw();

      return false;
    }
  }

  setCallback(callback) {
    this.callback = callback;
  }

  setUrl(url) {
    this.url = url;
  }
}
