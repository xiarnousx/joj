import { curry, compose } from "ramda";

export const ValueObject = (obj) => compose(Object.seal, Object.freeze)(Object.assign(Object.create(null), obj));