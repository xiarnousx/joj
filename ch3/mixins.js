const HasHash = (keys) => ({
  calculateHash() {
    const data = keys.map((f) => this[f]).join("");
    let hash = 0,
      i = 0;
    while (i < data.length) {
      hash = ((hash << 5) - hash + data.charCodeAt(i++)) << 0;
    }

    return hash ** 2;
  },
});

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

const HashTransaction = Object.assign(
  Object.create(Transaction),
  HasHash(["sender", "recipient", "funds"])
);
