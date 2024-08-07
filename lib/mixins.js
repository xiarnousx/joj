import { identity } from "ramda";

const DEFAULT_ALGO_SHA256 = "SHA256";
const DEFAULT_ENCODING_HEX = "hex";
const DEFAULT_SIGN_ALGO = "RSA-SHA256";

export const Functor = {
  map(f = identity) {
    return this.constructor.of(f(this.get()));
  },
};

export const NoopFunctor = {
  flatMap(f) {
    return this;
  },
  chain(f) {
    return this.flatMap(f);
  },
  bind(f) {
    return this.flatMap(f);
  },
  map() {
    return this;
  },
};

export const Monad = {
  flatMap(f) {
    return this.map(f).get();
  },
  chain(f) {
    return this.flatMap(f);
  },
  bind(f) {
    return this.flatMap(f);
  },
};

export const HasHash = (
  keys,
  options = { algorithm: DEFAULT_ALGO_SHA256, encoding: DEFAULT_ENCODING_HEX }
) => ({
  calculateHash() {
    const data = keys.map((f) => this[f]).join("");
    let hash = 0,
      i = 0;
    while (i < data.length) {
      hash = ((hash << 5) - hash + data.charCodeAt(i++)) << 0;
    }

    return hash ** 2;
  },
});

export const HasSignature = (
  keys,
  options = { algorithm: DEFAULT_SIGN_ALGO, encoding: DEFAULT_ENCODING_HEX }
) => ({
  generateSignature(privateKey) {
    const data = keys.map((f) => this[f]).join("");
    return Buffer.from(data).toString("base64");
  },
  verifySignature(publicKey, signature) {
    const data = keys.map((f) => this[f]).join("");
    return (
      data === Buffer.from(this.generateSignature(), "base64").toString("ascii")
    );
  },
});

export const HasValidation = () => ({
  validate() {
    return [...this].reduce(
      (validationResult, nextItem) =>
        validationResult.flatMap(() => nextItem.validate()),
      this.isValid()
    );
  },
});

