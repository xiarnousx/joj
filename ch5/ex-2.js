import { Failure, Success } from "../lib/Validation.js";

const toUpper = (val) => val.toUpperCase();

const fromNullable = (val) =>
  val && val !== null ? Success.of(val) : Failure.of(`Value can't be null`);


const res1 = fromNullable('joj').map(toUpper).toString();
console.log(res1);

const res2 = fromNullable(null).map(toUpper).toString();
console.log(res2);