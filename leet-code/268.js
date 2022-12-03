var missingNumber = function(nums) {
  const len = nums.length;
  const expectedSum = (0.5 * len) * (len + 1);
  const realSum = nums.reduce((acc, num) => acc + num);
  return expectedSum - realSum;
};

console.log(missingNumber([3, 0, 1]));


var missingNumber2 = function(nums) {
  let result = 0;
  for (let i = 0; i < nums.length; i++) {
    result ^= nums[i] ^ i;
  }
  return result ^ nums.length;
}