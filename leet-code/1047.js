var removeDuplicates = function (s) {
  const stack = [];
  const len = s.length;
  for (let charIdx = 0; charIdx < len; charIdx++) {
    let char = s[charIdx];
    while (stack.length > 0 && char === stack[stack.length - 1]) {
      stack.pop();
      char = stack.pop();
    }
    stack.push(char);
  }
  return stack.join("");
};

console.log(removeDuplicates("azxxzy"));
