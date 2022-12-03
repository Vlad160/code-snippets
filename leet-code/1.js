/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
 var twoSum = function(nums, target) {
    const map = {};
    const len = nums.length;
    for (let i = 0; i < len; i++) {
        const num = nums[i];
        const rem = target - num;
        if (map[rem] !== undefined) {
            return [map[rem], i];
        }
        map[num] = i;
    }
};