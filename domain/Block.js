import { HasHash, HasValidation } from "../lib/mixins.js";
import { Validation } from "../lib/Validation.js";
import {
  checkTampering,
  checkIndex,
  checkTimestamps,
} from "../validators/validators.js";

export class Block {
  #blockchain;

  constructor(index, previousHash, data = []) {
    this.index = index;
    this.data = data;
    this.previousHash = previousHash;
    this.timestamp = Date.now();
    this.hash = this.calculateHash();
  }

  set blockchain(b) {
    this.#blockchain = b;
    return this;
  }

  isGenesis() {
    return this.previousHash === "0".repeat(64);
  }

  isValid() {
    const { index: prevIndex, timestamp: prevTimestamp } =
      this.#blockchain.lookup(this.previousHash);

    return Validation.of(Object.freeze(this))
      .flatMap(checkTimestamps(prevTimestamp))
      .flatMap(checkIndex(prevIndex))
      .flatMap(checkTampering);
  }
}

Object.assign(
  Block.prototype,
  HasHash(["index", "timestamp", "previousHash", "data"]),
  HasValidation()
);
