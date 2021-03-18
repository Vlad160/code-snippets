// I'm stupid

var searchRange = function (nums, target) {
  let left = 0,
    rigth = nums.length - 1;

  while (true) {
    let mid = Math.floor((left + rigth) / 2);
    const value = nums[mid];
    if (value === target) {
      let l = mid,
        r = mid;
      while (l >= 0 && nums[l - 1] === target) {
        l -= 1;
      }
      while (r < nums.length - 1 && nums[r + 1] === target) {
        r += 1;
      }
      return [l, r];
    }
    if (left > rigth) {
      return [-1, -1];
    }
    if (value > target) {
      rigth = mid - 1;
    } else if (value < target) {
      left = mid + 1;
    }
  }
};

console.log(searchRange([5, 7, 7, 8, 8, 10], 8));
