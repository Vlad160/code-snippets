var isPowerOfThree = function (n) {
    const epsilon = 0.00000000001;
    return Math.abs(((Math.log10(n) / Math.log10(3)) % 1)) <= epsilon;
  };

console.log(isPowerOfThree(19684));
