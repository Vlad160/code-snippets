const fs = require("fs");
const path = require("path");

const COMMANDS = {
  down: "down",
  up: "up",
  forward: "forward",
};

function readFile() {
  const file = fs.readFileSync(path.join(__dirname, "./input.txt"), "utf-8");
  return file.split("\r\n");
}

function parseFile(input) {
  return input.map((item) => {
    const [command, value] = item.split(" ");
    return { command, value: +value };
  });
}

function calculatePos(commands) {
  let depth = 0;
  let pos = 0;
  let len = commands.length;
  for (let i = 0; i < len; i++) {
    const { command, value } = commands[i];
    switch (command) {
      case COMMANDS.down:
        depth += value;
        break;
      case COMMANDS.up:
        depth -= value;
        break;
      case COMMANDS.forward:
        pos += value;
        break;
      default:
        throw new Error(`Unknown command ${command}`);
    }
  }
  return { depth, pos };
}

function calculatePosWithAim(commands) {
  let depth = 0;
  let pos = 0;
  let aim = 0;
  let len = commands.length;
  for (let i = 0; i < len; i++) {
    const { command, value } = commands[i];
    switch (command) {
      case COMMANDS.down:
        aim += value;
        break;
      case COMMANDS.up:
        aim -= value;
        break;
      case COMMANDS.forward:
        pos += value;
        depth += aim * value;
        break;
      default:
        throw new Error(`Unknown command ${command}`);
    }
  }
  return { depth, pos };
}

const file = readFile();
const data = parseFile(file);
const { depth, pos } = calculatePosWithAim(data);

console.log(depth * pos);
