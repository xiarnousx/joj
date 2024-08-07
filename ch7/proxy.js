import { compose, curry } from "ramda";

const credentials = {
  username: "@luijar",
  password: "som3thingR@ndom",
  login: () => {
    console.log("logging in....");
  },
};

function dateFormat(date) {
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
}

const traceHanlder = {
  get(target, key) {
    console.log(`${dateFormat(new Date())}[TRACE] Calling ${key}:${target[key]}`);
    return target[key];
  },
};

const passwordObfuscatorHandler = {
  get(target, key) {
    if (key === "password") {
      return "\u2022".repeat(12);
    }

    return target[key];
  },

  has(target, key) {
    if (key === "password") return false;
    return key in target;
  },
};

const weave = curry((handler, target) => new Proxy(target, handler));

const proxy = compose(weave(traceHanlder), weave(passwordObfuscatorHandler))(credentials);

proxy.login;
proxy.password;
proxy.username;
