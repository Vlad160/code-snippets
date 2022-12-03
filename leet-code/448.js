/**
 * @param {number[]} nums
 * @return {number[]}
 */
var findDisappearedNumbers = function (nums) {
  const allNums = Array.from({ length: nums.length }).fill(false);
  for (let i = 0; i < nums.length; i++) {
    allNums[nums[i] - 1] = true;
  }
  console.log(allNums);
  return allNums.reduce((acc, el, i) => {
    if (!el) {
      acc.push(i + 1);
    }
    return acc;
  }, []);
};

var findDisappearedNumbers2 = function (nums) {
  let oredered = 0;
  while (oredered !== nums.length) {
    oredered = 0;
    for (let i = 0; i < nums.length; i++) {
      const value = nums[i];
      if (value === i + 1 || value === null) {
        oredered++;
        continue;
      }
      if (value === nums[value - 1]) {
        nums[value - 1] = null;
      }
      [nums[i], [nums[value - 1]]] = [nums[value - 1], [nums[i]]];
    }
  }

  const result = [];

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === null) {
      result.push(i + 1);
    }
  }

  return result;
};

// console.log(findDisappearedNumbers2([4, 3, 2, 7, 8, 2, 3, 1]));

var findDisappearedNumbers3 = function (nums) {
  for (let i = 0; i < nums.length; i++) {
    const idx = Math.abs(nums[i]) - 1;
    nums[idx] = -Math.abs(nums[idx]);
  }
  const result = [];
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > 0) {
      result.push(i + 1);
    }
  }
  return result;
};

console.log(findDisappearedNumbers3([4, 3, 2, 7, 8, 2, 3, 1]));
