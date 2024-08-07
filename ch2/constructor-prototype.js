// For every constructor F, JavaScript automatically creates the object F.prototype

function Transaction(sender, recipient) {
  this.sender = sender;
  this.recipient = recipient;
}

Transaction.prototype.displayTransaction = function displayTransaction() {
  return `Transactionn from ${this.sender} to ${this.recipient}`;
};

function HashTransaction(sender, recipient) {
  if (!new.target) {
    return new HashTransaction(sender, recipient);
  }

  Transaction.call(this, sender, recipient);
}
// shared function among all instances created
HashTransaction.prototype.calculateHash = function calculateHash() {
  const data = [this.sender, this.recipient].join("");
  let hash = 0,
    i = 0;
  while (i < data.length) {
    hash = ((hash << 5) - hash + data.charCodeAt(i++)) << 0;
  }

  return hash ** 2;
};

// Links prototypes for the lookup mechanis to work in case you need to resolve properties from Transaction.prototype
HashTransaction.prototype = Object.create(Transaction.prototype);
// Fixes or sets the constructor value. Without this line, tx would be a Transaction object or constructed from Transaction
HashTransaction.prototype.constructor = HashTransaction;

const tx1 = new HashTransaction("a", "b");
const tx2 = new HashTransaction("c", "d");

console.log(tx1.calculateHash === tx2.calculateHash); // true
