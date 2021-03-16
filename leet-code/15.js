var threeSum = function (nums) {
  const sums = [];
  nums.sort((a, b) => a - b);

  for (let i = 0; i < nums.length - 2; i++) {
    if (i !== 0 && nums[i] == nums[i - 1]) {
      continue;
    }
    const a = nums[i];
    let j = i + 1;
    let k = nums.length - 1;

    while (j < k) {
      const b = nums[j];
      const c = nums[k];
      const s = a + b + c;
      if (s === 0) {
        sums.push([a, b, c]);
        j++;
        while (j < k && nums[j] == nums[j - 1]) {
          j++;
        }
      } else if (s > 0) {
        k--;
      } else if (s < 0) {
        j++;
      }
    }
  }

  return sums;
};

console.log(threeSum([-1,0,1,2,-1,-4]));
