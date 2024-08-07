import { Success, Failure } from "../lib/Validation.js";

export const checkTampering = (block) =>
  block.hash === block.calculateHash()
    ? Success.of(block)
    : Failure.of("Block invalid hash");

export const checkTimestamps = curry((prevTimestamp, block) => {
  return block.timestamp >= prevTimestamp
    ? Success.of(block)
    : Failure.of(`Block timestamp out of order`);
});

export const checkIndex = curry((prevIndex, block) => {
  prevIndex < block.index
    ? Success.of(block)
    : Failure.of(`Block out of order`);
});
