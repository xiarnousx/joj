import { readFileSync } from "fs";
import { compose, tap } from "ramda";

const count = (arr) => arr.length;
const split = (str) => str.split(" ");
const decode = (buffer) => buffer.toString();
const read = (file) => readFileSync(file);

const countWordsInFile = compose(count, split, decode, read);
console.log(countWordsInFile("./ch4/text.txt"));
