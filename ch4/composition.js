import { compose, curry } from "ramda";
import { createHash } from "crypto";
import { props, prop } from "./utils.js";

const assemble = (...pieces) => {
  return pieces.map(JSON.stringify).join("");
};

const computeChipher = curry((options, data) =>
  createHash(options.algorithm).update(data).digest(options.encoding)
);

const HasHash = (keys, options = { algorithm: "SHA256", encoding: "hex" }) => ({
  calculateHash() {
    const objToHash = Object.fromEntries(keys.map((k) => [k, prop(k, this)]));
    return compose(computeChipher(options), assemble, props(keys))(objToHash);
  },
});

const hashTransaction = Object.assign(
  { sender: "a", recipient: "b", funds: 10 },
  HasHash(["sender", "recipient", "funds"])
);
console.log(hashTransaction.calculateHash());
