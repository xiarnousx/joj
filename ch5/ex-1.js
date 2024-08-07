import fs from "fs";
import { compose } from "ramda";
import { Success, Failure } from "../lib/Validation.js";

const read = (f) =>
  fs.existsSync(f)
    ? Success.of(fs.readFileSync(f))
    : Failure.of(`File ${f} does not exists`);

const count = (arr) => arr.length;
const split = (str) => str.split(" ");
const decode = (encoding) => (buffer) => buffer.toString(encoding);

const countBlocksInFile = compose(count, JSON.parse, decode("utf8"), read);
