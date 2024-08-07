import _ from "lodash";

export const prop = (name) => (obj) =>
  obj[name] && _.isFunction(obj[name]) ? obj[name].call(obj) : obj[name];

export const props =
  (...names) =>
  (obj) =>
    names.map((n) => prop(n)(obj));
