var intersect = function (nums1, nums2) {
  const [first, second] =
    nums1.length < nums2.length ? [nums1, nums2] : [nums2, nums1];

  const map = {};
  const len = first.length;
  for (let i = 0; i < len; i++) {
    const v = first[i];
    if (map[v] === undefined) {
      map[v] = 1;
    } else {
      map[v] = map[v] + 1;
    }
  }
  const result = [];
  const len2 = second.length;
  for (let i = 0; i < len2; i++) {
    const v = second[i];
    if (map[v]) {
      result.push(v);
      map[v] = map[v] - 1;
    }
  }
  return result;
};

console.log(intersect([1, 2, 2, 1], [2, 2]));
