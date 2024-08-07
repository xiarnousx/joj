import EventEmitter from "events";

// By combining EventEmitter and Symbol.asyncIterator, we can implement a real push solution
class PushArray extends Array {
  static EVENT_NAME = "new_value";
  #eventEmitter = new EventEmitter();

  constructor(...values) {
    super(...values);
  }

  push(value) {
    this.#eventEmitter.emit(PushArray.EVENT_NAME, value);
    return super.push(value);
  }

  subscribe({ next }) {
    this.#eventEmitter.on(PushArray.EVENT_NAME, (value) => {
      next(value);
    });
  }

  unsubscribe() {
    this.#eventEmitter.removeAllListeners(PushArray.EVENT_NAME);
  }
}

const pushArray = new PushArray(1, 2, 3);

pushArray.subscribe({
  // this object is called observer
  // Observers align with Iterable/Iterator protocol
  // and a protocol push generator
  // the API for representing a stream is known as Observable
  next(val) {
    console.log("new value", val);
  },
});

pushArray.push(4);
pushArray.push(5);

pushArray.unsubscribe();
pushArray.push(6);

// Reactive programming
// - Data propagation follows pub/sub model
// - Declarative lazy pipeline, unitl subscriber subscribes nothing runs
