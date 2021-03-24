var rotate = function (matrix) {
  const len = matrix.length;
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < i; j++) {
      [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
    }
  }
  const mid = (len / 2) << 0;
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < mid; j++) {
      [matrix[i][j], matrix[i][len - 1 - j]] = [
        matrix[i][len - 1 - j],
        matrix[i][j],
      ];
    }
  }
  return matrix;
};

console.log(
  rotate([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ])
);
