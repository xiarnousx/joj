// Use Case Protocol Control

const VERSION = "2.0";

export class API {
  get [Symbol.for("version")]() {
    return VERSION;
  }
}

const api = new API();
switch (api[Symbol.for("version")]) {
  case "1.0":
    console.log("Iam version one");
    break;
  case "2.0":
    console.log("Iam version two");
    break;
}

console.log(Symbol.for("version"));
