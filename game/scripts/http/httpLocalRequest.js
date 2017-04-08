
import { GameException, ErrorSeverity } from '../exception.js';

export class HttpLocalRequest {
  constructor(filename) {
    this.filename = filename;
  }

  grab(parse) {
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
      exception.set("Couldnt get local asset", this.filename, ErrorSeverity.HIGH);
      exception.throw();
    }
  }
}
