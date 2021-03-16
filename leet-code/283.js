var moveZeroes = function (nums) {
  const len = nums.length;
  let j = 0;
  for (let i = 0; i < len; i++) {
    const v = nums[i];
    if (v === 0) {
      j = Math.max(j, i);
      while (nums[j] === 0 && j < len - 1) {
        j++;
      }
      if (j === nums.length) {
        [nums[i], nums[j]] = [nums[j], nums[i]];
        return nums;
      }
      [nums[i], nums[j]] = [nums[j], nums[i]];
    }
  }
  return nums;
};

console.log(moveZeroes([1, 0]));
