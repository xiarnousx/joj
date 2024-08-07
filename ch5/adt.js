import { compose, curry } from "ramda";
import { Failure, Success } from "../lib/Validation.js";

const Pair = (left, right) =>
  compose(
    Object.seal,
    Object.freeze
  )({
    left,
    right,
    toString: () => `Pair[${left}, ${right}]`,
  });

const checkTampering = (block) =>
  block.hash === block.calculateHash()
    ? Success.of(block)
    : Failure.of("Block invalid hash");

const checkTimestamps = curry((prevTimestamp, block) => {
  return block.timestamp >= prevTimestamp
    ? Success.of(block)
    : Failure.of(`Block timestamp out of order`);
});

const checkIndex = curry((prevIndex, block) => {
  prevIndex < block.index
    ? Success.of(block)
    : Failure.of(`Block out of order`);
});
