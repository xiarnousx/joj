import { Monad, Functor, NoopFunctor } from "./mixins.js";
export class Validation {
  #val;

  constructor(value) {
    this.#val = value;
    const types = [Success.name, Failure.name];
    if (!types.includes(new.target.name)) {
      throw new TypeError(`Please use Validation.of`);
    }
  }

  get() {
    return this.#val;
  }

  static of(value) {
    return Validation.Success(value);
  }

  static Success(a) {
    return Success.of(a);
  }

  static Failure(b) {
    return Failure.of(b);
  }

  get isSuccess() {
    return false;
  }

  get isFailure() {
    return false;
  }

  getOrElse(defaultValue) {
    return this.isSuccess ? this.#val : defaultValue;
  }

  toString() {
    return `${this.constructor.name}(${this.#val})`;
  }
}

export class Success extends Validation {
  static of(a) {
    return new Success(a);
  }

  get isSuccess() {
    return true;
  }
}

Object.assign(Success.prototype, Functor, Monad);

export class Failure extends Validation {
  static of(b) {
    return new Failure(b);
  }

  get isFailure() {
    return true;
  }

  get() {
    throw new TypeError(`Can't extract the value of a Failure`);
  }
}

Object.assign(Failure.prototype, NoopFunctor)
