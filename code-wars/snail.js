/**
 *
 * @param {Array[]} array
 * SUCH A SHAME
 */
function snail(array) {
  if (array.length === 1 && !array[0][0]) {
    return [];
  }
  let i = 0,
    j = 0,
    count = 0,
    incI = 0,
    incJ = 1;
  const len = array.length;
  const borders = {
    top: 0,
    bottom: len - 1,
    left: 0,
    right: len - 1,
  };
  const result = [];
  const max = len * len;
  let dir = "r";
  while (count < max) {
    count++;
    result.push(array[i][j]);
    if (i === borders.top && j === borders.right && dir === "r") {
      incJ = 0;
      incI = 1;
      borders.top += 1;
      dir = "b";
    } else if (i === borders.bottom && j === borders.right && dir === "b") {
      incI = 0;
      incJ = -1;
      borders.right -= 1;
      dir = "l";
    } else if (i === borders.bottom && j === borders.left && dir === "l") {
      incI = -1;
      incJ = 0;
      borders.bottom -= 1;
      dir = "u";
    } else if (i === borders.top && j === borders.left && dir === "u") {
      incI = 0;
      incJ = 1;
      borders.left += 1;
      dir = "r";
    }
    i += incI;
    j += incJ;
  }
  return result;
}

console.log(snail([[]]));
