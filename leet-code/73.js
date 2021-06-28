const matrix = [
  [0, 1, 2, 0],
  [3, 4, 5, 2],
  [1, 3, 1, 5],
];
var setZeroes = function (matrix) {
  const m = matrix.length,
    n = matrix[0].length;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (matrix[i][j] === 0) {
        matrix[i][0] = -1;
        matrix[0][j] = -1;
      }
    }
  }
  for (let i = 0; i < m; i++) {
      // TODO
  }
  return matrix;
};

console.log(JSON.stringify(setZeroes(matrix)));
