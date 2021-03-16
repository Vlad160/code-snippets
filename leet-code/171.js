var titleToNumber = function (columnTitle) {
  let sum = 0;
  let mul = 1;
  for (let i = columnTitle.length - 1; i >= 0; i--) {
    sum += (columnTitle.charCodeAt(i) - 64) * mul;
    mul *= 26;
  }
  return sum;
};

console.log(titleToNumber("ZY"));
