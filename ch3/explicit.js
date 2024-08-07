const UpperCaseFormatter = {
  format: function (msg) {
    return msg.toUpperCase();
  },
};

const Foo = {
  formatter: UpperCaseFormatter,
  saySomething: function (msg) {
    console.log(this.formatter.format(msg));
  },
};

Foo.saySomething("hello");
