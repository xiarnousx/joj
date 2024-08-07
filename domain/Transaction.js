import { HasHash, HasSignature, HasValidation } from "../lib/mixins.js";
export class Transaction {
  sender = "";
  recipient = "";
  funds = 0.0;
  #feePercent = 0.6;
  transactionId = "";
  timestamp = Date.now();

  constructor(sender, recipient, funds = 0.0, description = "Generic") {
    this.sender = sender;
    this.recipient = recipient;
    this.description = description;
    this.funds = Number(funds);
    this.transactionId = this.calculateHash();
  }

  displayTransaction() {
    return `Transactionn from ${this.sender} to ${this.recipient} for ${this.funds}`;
  }

  get netTotal() {
    return Transaction.precisionRound(this.funds * this.#feePercent, 2);
  }

  static precisionRound(number, precision) {
    const factor = Math.pow(10, precision);
    return Math.round((number * factor) / factor);
  }
}

Object.assign(
  Transaction.prototype,
  HasHash(["timestamp", "sender", "recipient", "funds"]),
  HasSignature(["sender", "recipient", "funds"]),
  HasValidation()
);
