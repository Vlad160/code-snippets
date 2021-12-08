const fs = require("fs");
const path = require("path");
const file = fs.readFileSync(path.join(__dirname, "./input.txt"), "utf-8");

const lines = file.split("\r\n").map((number) => +number);

/**
 *
 * @param {number[]} measurements
 */
function countIncreases(measurements) {
  const len = measurements.length;
  let count = 0;
  for (let i = 1; i < len; i += 1) {
    count += measurements[i] > measurements[i - 1] ? 1 : 0;
  }
  return count;
}
/**
 *
 * @param {number[]} measurements
 */
function countSlidingWindow(measurements) {
    const len = measurements.length;
    let count = 0;
    for (let i = 2; i < len; i += 1) {
      count += measurements[i] > measurements[i - 3] ? 1 : 0;
    }
    return count;
}

console.log(countSlidingWindow(lines));
