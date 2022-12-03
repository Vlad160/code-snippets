const fs = require("fs");
const path = require("path");

function readData() {
  const file = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf8");
  const lines = file.split("\r\n");
  const numbers = lines[0].split(",").map((v) => +v);
  const boards = [];
  i = 2;
  while (i < lines.length) {
    const line = lines[i].trim();
    if (!line) {
      i++;
      continue;
    }
    const board = readBoard(lines.slice(i, i + 5));
    boards.push(board);
    i += 5;
  }
  return { numbers, boards };
}

function readBoard(lines) {
  const board = lines.map((line) =>
    line
      .trim()
      .split(/\s+/)
      .map((v) => +v)
  );
  return board;
}

function isBoardComplete(board) {
  for (let i = 0; i < board.length; i++) {
    const isRowComplete = board[i].every((v) => v < 0);
    if (isRowComplete) {
      return board[i];
    }
    const isColumnComplete = board[i].every((v, j) => board[j][i] < 0);
    if (isColumnComplete) {
      return board[i].map((v, j) => board[j][i]);
    }
  }
  return null;
}

function removeNumberFromBoard(board, number) {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === number) {
        board[i][j] = -1;
      }
    }
  }
}

function sumOfUnmarked(board) {
  let sum = 0;
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] >= 0) {
        sum += board[i][j];
      }
    }
  }
  return sum;
}

function main() {
  const data = readData();
  const { numbers, boards } = data;
  for (let i = 0; i < numbers.length; i++) {
    const number = numbers[i];
    for (let j = 0; j < boards.length; j++) {
      const board = boards[j];
      removeNumberFromBoard(board, number);
      const complete = isBoardComplete(board);
      if (complete) {
        const sum = sumOfUnmarked(board);
        return sum * number;
      }
    }
  }
}

function main2() {
  const data = readData();
  const { numbers, boards } = data;
  for (let i = 0; i < numbers.length; i++) {
    const number = numbers[i];
    for (let j = 0; j < boards.length; j++) {
      const board = boards[j];
      removeNumberFromBoard(board, number);
      const complete = isBoardComplete(board);
      if (complete && boards.length === 1) {
        const sum = sumOfUnmarked(boards[0]);
        return sum * number;
      } else if (complete) {
        boards.splice(j, 1);
        j--;
      }
    }
  }
}
console.log(main2());
