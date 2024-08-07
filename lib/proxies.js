import { isFunction } from "lodash";

export const autoHashHandler = (...props) => ({
  set(hashable, key) {
    if (props.includes(key) && !isFunction(hashable[key])) {
      Reflect.set(...arguments);
      const newHash = Reflect.apply(hashable["calculateHash"], hashable, []);
      Reflect.set(hashable, "hash", newHash);
      return true;
    }
  },
});
