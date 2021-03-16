var isHappy = function (n) {
  let current = n;
  let prev = current;
  let set = new Set();
  while (true) {
    let sum = 0;
    prev = current;

    while (current !== 0) {
      const r = current % 10;
      sum += r ** 2;
      current = (current / 10) << 0;
    }

    if (sum === 1) {
      return true;
    }
    current = sum;
    if (set.has(current)) {
      return false;
    }
    set.add(current);
  }
};

console.log(isHappy(2));
