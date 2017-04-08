
export var ErrorSeverity = {
  OkayToIgnore: "Ignore",
  High: "High",
  Low: "Low"
}

export class GameException {
  constructor() {
    this.severity = ErrorSeverity.OkayToIgnore;
    this.message = "";
    this.title = "";
  }

  throw() {
    if (this.severity === ErrorSeverity.OkayToIgnore) {
      console.log(this.severity);
      console.log(this.title);
      console.log(this.message);
    } else {
      window.alert("Throwing " + this.severity + " problem error");
      window.alert(this.title + "\n" + this.message);
    }
  }

  set(title, message, severity) {
    this.setSeverity(severity);
    this.setMessage(message);
    this.setTitle(title);
  }

  setMessage(msg) {
    if (msg) {
      this.message = msg;
    }
  }

  setSeverity(severity) {
    if (severity) {
      this.severity = severity;
    }
  }

  setTitle(title) {
    if (title) {
      this.title = title;
    }
  }
}
