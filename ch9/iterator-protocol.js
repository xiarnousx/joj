function randomNumberIterator(size = 1) {
  function nextRandomInteger(min) {
    return function (max) {
      return Math.floor(Math.random() * (max - min)) + min;
    };
  }

  const numbers = Array(size)
    .fill(1)
    .map((min) => nextRandomInteger(min)(Number.MAX_SAFE_INTEGER));

  return {
    // What makes object iteratable
    [Symbol.iterator]() {
      return this;
    },
    next() {
      if (numbers.length === 0) return { done: true };
      return { value: numbers.shift(), done: false };
    },
  };
}

const it = randomNumberIterator(3);
// using for ... of construct
for (const n of it) {
  console.log(n);
}
// using spread operator
console.log([...randomNumberIterator(3)]);
