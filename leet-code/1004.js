/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var longestOnes = function (nums, k) {
  let maxSeq = 0;
  let p1 = 0;
  const len = nums.length;
  for (let p2 = 0; p2 < len; p2++) {
    if (nums[p2] === 0) {
      if (k > 0) {
        k--;
      } else {
        while (nums[p1] === 1) {
          p1 += 1;
        }
        p1 += 1;
      }
    }
    maxSeq = Math.max(maxSeq, p2 - p1 + 1);
  }
  return maxSeq;
};

console.log(longestOnes([0, 0, 0, 0], 0));
