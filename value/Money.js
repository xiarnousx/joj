import { curry, compose } from "ramda";
import { precisionRound } from "../utils.js";
import { ValueObject } from "./ValueObject.js";

export const BTC = "B|";

export const Money = curry((currency, amount) => {
  return ValueObject({
    amount,
    currency,
    equals: (other) => currency === other.currency && amount === other.amount,
    round: (precision = 2) =>
      Money(currency, precisionRound(amount, precision)),
    minus: (m) => Money(currency, amount - m.amount),
    plus: (m) => Money(currency, amount + m.amount),
    compareTo: (other) => amount - other.amount,
    valueOf: () => precisionRound(amount, 2),
    toString: () => `${currency}${amount}`,
  });
});

Money.zero = (currency = BTC) => Money(currency, 0);
Money.sum = (m1, m2) => m1.add(m2);
Money.subtract = (m1, m2) => m1.minus(m2);
