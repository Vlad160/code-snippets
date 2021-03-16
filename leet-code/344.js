var reverseString = function (s) {
  const len = Math.floor(s.length / 2);
  const origLen = s.length;
  for (let i = 0; i < len; i++) {
    [s[origLen - i - 1], s[i]] = [s[i], s[origLen - i - 1]];
  }
  return s;
};

console.log(reverseString(["h", "e", "l", "l", "o"]));
