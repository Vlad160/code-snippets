const createPromise = (time = 100) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(Math.random()), time);
  });

function* main() {
  const p1 = yield createPromise(100);

  console.log(p1);
  const p2 = yield createPromise(150);
  console.log(p2);

  try {
    const p3 = yield Promise.reject(2);
  } catch (e) {
    console.log(e);
  }

  const p4 = yield createPromise(150);
  console.log(p4);
  return 1;
}

function gen(fn) {
  const generator = fn();
  function iterator(genState) {
    const value = Promise.resolve(genState.value);
    if (genState.done) {
      return genState.value;
    }
    value.then(
      (val) => {
        iterator(generator.next(val));
      },
      (err) => {
        iterator(generator.throw(err));
      }
    );
  }
  iterator(generator.next());
}

const v = gen(main);


console.log(`v: ${v}`);