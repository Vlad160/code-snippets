var findPaths = function (m, n, maxMove, startRow, startColumn) {
  const memo = new Array(m)
    .fill(null)
    .map(() =>
      new Array(n).fill(null).map(() => new Array(maxMove + 1).fill(Infinity))
    );
  const M = 1000000007;
  function loop(curMax, curRow, curCol) {
    if (curRow === m || curCol === n || curRow < 0 || curCol < 0) return 1;
    if (curMax === 0) {
      return 0;
    }
    if (memo[curRow][curCol][curMax] !== Infinity) {
      return memo[curRow][curCol][curMax];
    }
    memo[curRow][curCol][curMax] =
      ((loop(curMax - 1, curRow + 1, curCol) % M) +
        (loop(curMax - 1, curRow - 1, curCol) % M) +
        (loop(curMax - 1, curRow, curCol + 1) % M) +
        (loop(curMax - 1, curRow, curCol - 1) % M)) %
      M;
    return memo[curRow][curCol][curMax];
  }

  return loop(maxMove, startRow, startColumn);
};

console.log(findPaths(2, 2, 2, 0, 0));
