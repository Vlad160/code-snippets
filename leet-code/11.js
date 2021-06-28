const height = [1, 8, 6, 2, 5, 4, 8, 3, 7];
var maxArea = function (height) {
  let i = 0, j = height.length - 1;
  let max = -1;
  while(i < j) {
      max = Math.max(max, Math.min(height[i], height[j]) * (j - i));
      if (height[i] > height[j]) {
        j--;
      } else {
          i++;
      }
  }
  return max;
};

console.log(maxArea(height));
