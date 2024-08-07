const notNull = (a) => a !== null;
const square = (a) => a ** 2;
const identity = (a) => a;
const fortyTwo = () => 42;
const safeOperation = (operation, guard, recover) => (input) =>
  guard(input, operation) || recover();

const onlyIf = (validator) => (input, operation) =>
  validator(input) ? operation(input) : NaN;

const orElse = identity;

const safeSquare = safeOperation(square, onlyIf(notNull), orElse(fortyTwo));

console.log(safeSquare(2));
console.log(safeSquare(null));
