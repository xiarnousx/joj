const symA = Symbol("a");
const symB = Symbol("a");

console.log(symA === symB, symA.toString(), symA.description);
// Because symbolds hide their unique value, you can provide an optional description,
// which is used only for debuging and logging purposes. This string doesn't factor
// into the underlying unique value or into the lookup process

const obj = {};
const symFoo = Symbol("foo");

obj["foo"] = "bar";
obj[symFoo] = "baz";

console.log(obj.foo, obj[symFoo], obj[Symbol("foo")]);
// Because a symbol represents a unique value, it is used primarily as a collision free object.
// You can retrieve the value of the symbol only if you have the symbol refrences e.g. symFoo

// Symbols are not discoverable
// for .. in
// for .. of
// Object.keys
// Object.getOwnPropertyNames
// The only way to get sysmbols is throug
// Object.getOwnPropertySymbols

// The symbol reference is copied by reference when spread operator or Object.assign the same symbol not different one

// example:
const clone = { ...obj };
console.log(clone[symFoo] === obj[symFoo]); // TRUE

// Symbol Regestries
// local registery
const local = Symbol("local");
// Global registery accessible across realms
const global = Symbol.for("global");
Symbol.keyFor(global);
