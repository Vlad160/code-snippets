const fs = require("fs");
const path = require("path");

function readFile() {
  const file = fs.readFileSync(path.join(__dirname, "./input.txt"), "utf-8");
  return file.split("\r\n");
}

/**
 *
 * @param {number[]} nums
 */
function calculateDiagnostic(nums) {
  const gamma = [];
  const epsilon = [];
  const len = nums.length;
  const mid = (len / 2) << 0;
  for (let i = 0; i < nums[0].length; i++) {
    const sum = nums.reduce((acc, str) => +str[i] + acc, 0);
    const g = sum >= mid ? 1 : 0;
    gamma.push(g);
    epsilon.push((g + 1) % 2);
  }

  return {
    epsilon: parseInt(epsilon.join(""), 2),
    gamma: parseInt(gamma.join(""), 2),
  };
}

function calculateBits(nums, i) {
  return nums.reduce(
    (acc, str) => {
      const v = +str[i];
      acc[0] += (v + 1) % 2;
      acc[1] += v;
      return acc;
    },
    [0, 0]
  );
}

function compOxygen(bits) {
  return bits[0] > bits[1] ? 0 : 1;
}

function compDeoxide(bits) {
  return bits[0] <= bits[1] ? 0 : 1;
}

function calculateGas(nums, comp) {
  let currentValues = nums;
  let i = 0;
  while (currentValues.length !== 1) {
    const sum = calculateBits(currentValues, i);
    const digit = comp(sum);
    currentValues = currentValues.filter((str) => +str[i] === digit);
    i++;
  }
  return parseInt(currentValues[0], 2);
}
const data = readFile();
const oxygen = calculateGas(data, compOxygen);
const deoxide = calculateGas(data, compDeoxide);

console.log(oxygen * deoxide);
