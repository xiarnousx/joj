// Functions as a template
function Transaction(sender, recipient) {
  this.sender = sender;
  this.recipient = recipient;
}

function HashTransaction(sender, recipient) {
  if (!new.target) {
    return new HashTransaction(sender, recipient);
  }

  Transaction.call(this, sender, recipient);
  
  // adds calculate hash to every instance created
  this.calculateHash = function calculateHash() {
    const data = [this.sender, this.recipient].join("");
    let hash = 0,
      i = 0;
    while (i < data.length) {
      hash = ((hash << 5) - hash + data.charCodeAt(i++)) << 0;
    }

    return hash ** 2;
  };
}

const tx = new HashTransaction("luis@tjoj.com", "luke@tjoj.com");
console.log(tx.calculateHash());
console.log(tx.sender);
