const proto = {
  sender: "luis@tjoh.com",
};

const child = Object.create(proto);

child.recipient = "luke@tjoh.com";

console.dir(child.sender);

// Object.setPrototypeOf(child, proto)
// Object.getPrototypeOf(child)

const transaction = {
  sender: "luis@tjoj.com",
  recipient: "luke@tjoj.com",
};

const hashTransaction = Object.create(transaction);
hashTransaction.calculateHash = function calculateHash() {
  const data = [this.sender, this.recipient].join("");
  let hash = 0,
    i = 0;
  while (i < data.length) {
    hash = ((hash << 5) - hash + data.charCodeAt(i++)) << 0;
  }

  return hash ** 2;
};

// const moneyTransaction = Object.create(transaction, {
//   funds: {
//     // data descriptors
//     value: 0.0,
//     enumerable: true,
//     writable: true,
//     configurable: false,
//   },
// });

const moneyTransaction = Object.setPrototypeOf({}, hashTransaction);

moneyTransaction.funds = 0.0;

moneyTransaction.addFunds = function addFunds(funds = 0) {
  // repeating the function name helps build more informative stack trace
  this.funds = funds;
};

moneyTransaction.addFunds(10.0);

console.log(moneyTransaction.funds);

const areSame = Object.getPrototypeOf(moneyTransaction) === transaction;

console.log(areSame);
console.log(moneyTransaction.sender);

