var firstUniqChar = function (s) {
  const len = s.length;
  const map = {};
  const queue = [];
  for (let i = 0; i < len; i++) {
    const char = s[i];
    if (map[char] === undefined) {
      map[char] = i;
      queue.push(char);
    } else {
      map[char] = null;
    }
  }
  let i = 0;
  while (i < queue.length) {
    if (map[queue[i]] === null) {
      i++;
    } else {
      return map[queue[i]];
    }
  }
  return -1;
};

console.log(firstUniqChar("leetcode"));
