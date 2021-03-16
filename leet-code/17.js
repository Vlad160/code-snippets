var letterCombinations = function (digits) {
  if (!digits.length) {
    return [];
  }
  const res = [];
  const first = parseInt(digits[0]);
  let m = 3 * (first - 2);
  if (first > 7) {
    m += 1;
  }
  const variants = Array(first === 9 || first === 7 ? 4 : 3)
    .fill(97)
    .map((c, i) => c + m + i);
  if (digits.length === 1) {
    return variants.map((c) => String.fromCharCode(c));
  }
  const rest = letterCombinations(digits.slice(1));

  for (let i = 0; i < variants.length; i++) {
    const vars = rest.map((c) => String.fromCharCode(variants[i]) + c);
    res.push(...vars);
  }

  return res;
};

console.log(letterCombinations("23"));
