const MyStore = {
  init(element) {
    this.length = 0;
    this.push(element);
    return this;
  },
  push(b) {
    this[this.length] = b;
    return ++this.length;
  },
};

const Blockchain = Object.create(MyStore);
const chain = Object.create(Blockchain);

const Transaction = {
  init(sender, recipient, funds = 0.0) {
    const _feePercent = 0.6;

    this.sender = sender;
    this.recipient = recipient;
    this.funds = Number(funds);

    function _precisionRound(number, precision) {
      const factor = Math.pow(10, precision);
      return Math.round((number * factor) / factor);
    }

    this.netTotal = function () {
      return _precisionRound(funds * _feePercent, 2);
    };

    return this;
  },

  displayTransaction() {
    return `Transaction from ${this.sender} to ${this.recipient} for ${this.funds};`;
  },
};

const HashTransaction = Object.create(Transaction);

HashTransaction.init = function HashTransaction(sender, recipient, funds) {
  Transaction.init(sender, recipient, funds);
  this.transactionId = this.calculateHash();
  return this;
};

HashTransaction.calculateHash = function calculateHash() {
  const data = [this.sender, this.recipient, this.funds].join("");
  let hash = 0,
    i = 0;
  while (i < data.length) {
    hash = ((hash << 5) - hash + data.charCodeAt(i++)) << 0;
  }

  return hash ** 2;
};

const tx = Object.create(HashTransaction).init("a", "b", 10);
console.log(tx.transactionId);
