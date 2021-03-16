var isAnagram = function (s, t) {
  const len1 = s.length,
    len2 = t.length;
  const map = {};
  if (len1 !== len2) {
    return false;
  }

  for (let i = 0; i < len1; i++) {
    const c1 = s[i];
    const c2 = t[i];
    if (c1 === c2) {
      continue;
    }
    if (map[c1] === undefined) {
      map[c1] = 0;
    }
    if (map[c2] === undefined) {
      map[c2] = 0;
    }
    map[c1] = map[c1] + 1;
    map[c2] = map[c2] - 1;
  }
  return Object.values(map).every((v) => v === 0);
};

console.log(isAnagram("anagram", "nagaram"));
