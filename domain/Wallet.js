import { prop, not, curry, compose, map, reduce, filter, chain } from "ramda";
import { Money } from "../value/Money.js";

const balanceOf = curry((addr, tx) => {
  return Money.sum(
    tx.recipient === addr ? tx.funds : Money.zero(),
    tx.sender === addr ? -tx.funds : Money.zero()
  );
});

function computeBalance(address, ledger) {
  return compose(
    Money.round,
    reduce(Money.sum, Money.zero()),
    map(balanceOf(address)),
    chain(prop('data')),
    filter(compose(not, prop('isGensis'))),
    Array.from
  )(ledger)
  // return Array.from(ledger)
  //   .filter(not(prop("isGensis")))
  //   .flatMap(prop("data"))
  //   .map(balanceOf(address))
  //   .reduce(Money.sum, Money.zero())
  //   .round();
}

class Wallet {
  constructor(publicKey, privateKey) {
    this.publicKey = publicKey;
    this.privateKey = privateKey;
  }

  get address() {
    return this.publicKey;
  }

  balance(ledger) {
    return computeBalance(this.address, ledger);
  }
}
