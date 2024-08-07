class ABC {
  data = [];
  constructor(data = []) {
    this.data = data;
  }

  [Symbol.iterator]() {
    return this.data[Symbol.iterator]();
  }
}

const abc = new ABC(["a", "b", "c"]);

for (const item of abc) {
  console.log(item);
}
