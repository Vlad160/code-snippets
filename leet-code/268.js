var missingNumber = function (nums) {
  const len = nums.length;
  let sum = 0;
  for (let i = 0; i < len; i++) {
    sum += nums[i];
  }
  const e = (len / 2) * (len + 1);
  return e - sum;
};

console.log(missingNumber([3, 0, 1]));
