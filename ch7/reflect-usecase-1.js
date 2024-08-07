const perfCountHandler = (...names) => {
  return {
    get(target, key) {
      if (names.includes(key)) {
        const start = process.hrtime();
        const result = Reflect.get(...arguments);
        const end = process.hrtime(start);
        const timeTook = end[0] * 1000 + end[1] / 1000000
        console.info(`Execution time took ${timeTook} miliseconds`);
        return result;
      }

      Reflect.get(target, key);
    },
  };
};

class ComputeIntensive {
  doWork() {
    const limit = Math.pow(10, 10);
    let init = 0;
    while (init < limit) init++;
  }
}

const perfLogProxy = Proxy.revocable(
  new ComputeIntensive(),
  perfCountHandler("doWork")
);
const compute = perfLogProxy.proxy;
compute.doWork();
perfLogProxy.revoke();
//compute.doWork(); // no console log
