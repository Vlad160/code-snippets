var maxProfit = function (prices) {
  let maxProfit = 0;
  let minPrice = -1;
  for (let i = 0; i < prices.length; i++) {
    const v = prices[i];
    if (minPrice === -1) {
      minPrice = v;
      continue;
    }
    if (v - minPrice > maxProfit) {
      maxProfit = v - minPrice;
    }
    if (minPrice > v) {
      minPrice = v;
    }
  }
  return maxProfit;
};

console.log(maxProfit([1,2]));
