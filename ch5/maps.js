import { identity, compose } from "ramda";

const unique = (letters) => Array.from(new Set(letters));
const join = (arr) => arr.join("");
const toUpper = (str) => str.toUpperCase();

const letters = ["aabbcc"].map(unique).map(join).map(toUpper).pop();
console.log(letters);

const l = identity(["aabbcc"]).map(unique).map(join).map(toUpper).pop();
console.log(l);

const l2 = compose(toUpper, join, unique);

console.log(l2('aabbcc'));
