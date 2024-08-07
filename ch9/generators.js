function* sayIt() {
  yield "the";
  yield "joy";
  yield "of";
  return "javascript";
}

for (const word of sayIt()) {
  console.log(word);
}
console.log(sayIt().next().value);

function* getIt() {
  // it seems infinte loop, but it's yielding the generator function pauses
  // the runtime does not execute infinitely
  while (true) {
    yield Math.round(Math.random() * 10 + 1);
  }
}

console.log(getIt().next().value);
console.log(getIt().next().value);

// async generators yield a promise
