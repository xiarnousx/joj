
// Simulate private property of a class
const _count = Symbol("count");

class Counter {
  constructor(count) {
    Object.defineProperty(this, _count, {
      enumerable: false,
      writable: true,
    });

    this[_count] = count;
  }

  inc(by = 1) {
    return (this[_count] += by);
  }

  dec(by = 1) {
    return (this[_count] -= by);
  }
}

// _count is Discoverbale throug:
// Reflect.ownKyes
// Object.getOwnPropertySymbols
