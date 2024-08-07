import { HasValidation } from "../lib/mixins.js";

export class Blockchain {
  #blocks = new Map();

  constructor(genesis = createGenesisBlock()) {
    this.#blocks.set(genesis.hash, genesis);
  }

  height() {
    return this.#blocks.size;
  }

  lookup(hash) {
    const h = hash;
    if (this.#blocks.has(h)) {
      return this.#blocks.get(h);
    }

    throw new Error(`Block with hash ${h} not found!`);
  }

  push(newBlock) {
    this.#blocks.set(newBlock.hash, newBlock);
    return newBlock;
  }
}

Object.assign(Blockchain.prototype, HasValidation());
