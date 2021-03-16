var countPrimes = function (n) {

  const array = new Array(n).fill(true);

  for (let i = 2; i * i < n; i++) {
    if (array[i]) {
      for (let j = i * i; j < n; j += i) {
        array[j] = false;
      }
    }
  }

  return array.slice(2).filter(x => x).length;
};

console.log(countPrimes(3));
