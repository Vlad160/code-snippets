/**
 * @param {number[]} nums
 * @return {number}
 */
var dominantIndex = function (nums) {
  const len = nums.length;
  let idx = 0;
  let max = nums[0];
  let max2 = max * 2;
  for (let i = 1; i < len; i++) {
    const v = nums[i];
    const v2 = v * 2;
    if (v2 <= max) {
      continue;
    }
    if (v >= max2) {
      idx = i;
      max = v;
      max2 = v2;
    } else {
      idx = -1;
      max = Math.max(max, v);
      max2 = Math.max(max2, v2);
    }
  }

  return idx;
};

var dominantIndex2 = function (nums) {
  const len = nums.length;
  let idx = 0,
    max = -Infinity,
    max2 = -Infinity;
  for (let i = 0; i < len; i++) {
    const v = nums[i];
    if (v > max) {
      max2 = max;
      max = v;
      idx = i;
    } else if (max2 < v) {
      max2 = v;
    }
  }
  return 2 * max2 <= max ? idx : -1;
};
// DOESN'T WORK

console.log(dominantIndex2([0, 0, 3, 2]));
