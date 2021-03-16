var lengthOfLongestSubstring = function (s) {
  let left = 0;
  let longest = 0;
  let current = 0;
  const map = {};
  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    if (!map[char]) {
      map[char] = true;
      current += 1;
    } else {
      longest = Math.max(longest, current);
      let c = s[left];
      map[c] = false
      left += 1;
      while (c !== char) {
        c = s[left];
        map[c] = false;
        left += 1;
        current -= 1;
      }
      map[c] = true
    }
  }
  return Math.max(longest, current);
};

console.log(lengthOfLongestSubstring("aab"));
