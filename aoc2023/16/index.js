const fs = require("fs");
const text = fs.readFileSync("./data.txt", { encoding: "utf-8" });
const lines = text.split("\n").map((l) => l.trim());

const DIRECTIONS = {
    N: [-1, 0],
    S: [1, 0],
    W: [0, -1],
    E: [0, 1],
};

function castRay(grid, position, direction, visited) {
    const [x, y] = position;
    const encodedPosition = `${x}_${y}`;
    const directions = visited[encodedPosition] || [];
    if (directions.includes(direction)) {
        return;
    }
    directions.push(direction);
    visited[encodedPosition] = directions;
    const nextPos = [
        x + DIRECTIONS[direction][0],
        y + DIRECTIONS[direction][1],
    ];
    const nextChar = grid[nextPos[0]]?.[nextPos[1]];
    if (!nextChar) {
        return;
    }
    if (nextChar === ".") {
        castRay(grid, nextPos, direction, visited);
    } else if (nextChar === "|") {
        if (["S", "N"].includes(direction)) {
            castRay(grid, nextPos, direction, visited);
        } else {
            castRay(grid, nextPos, "S", visited);

            castRay(grid, nextPos, "N", visited);
        }
    } else if (nextChar === "-") {
        if (["E", "W"].includes(direction)) {
            castRay(grid, nextPos, direction, visited);
        } else {
            castRay(grid, nextPos, "E", visited);

            castRay(grid, nextPos, "W", visited);
        }
    } else if (nextChar === "/") {
        if (direction === "E") {
            castRay(grid, nextPos, "N", visited);
        } else if (direction === "W") {
            castRay(grid, nextPos, "S", visited);
        } else if (direction === "N") {
            castRay(grid, nextPos, "E", visited);
        } else if (direction === "S") {
            castRay(grid, nextPos, "W", visited);
        }
    } else if (nextChar === "\\") {
        if (direction === "E") {
            castRay(grid, nextPos, "S", visited);
        } else if (direction === "W") {
            castRay(grid, nextPos, "N", visited);
        } else if (direction === "N") {
            castRay(grid, nextPos, "W", visited);
        } else if (direction === "S") {
            castRay(grid, nextPos, "E", visited);
        }
    } else {
        throw new Error("Should not be there");
    }
}

function puzzle1(lines) {
    const visited = {};
    castRay(lines, [0, -1], "E", visited);
    const len = Object.keys(visited).length - 1;
    return len;
}

function puzzle2(lines) {
    function processRay(start, dir) {
        const visited = {};
        castRay(lines, start, dir, visited);
        const len = Object.keys(visited).length - 1;
        return len;
    }
    let max = 0;
    for (let i = 0; i < lines.length; i++) {
        max = Math.max(processRay([i, -1], "E"), max);
        max = Math.max(processRay([i, lines[0].length], "W"), max);
    }
    for (let i = 0; i < lines[0].length; i++) {
        max = Math.max(processRay([-1, i], "S"), max);
        max = Math.max(processRay([lines.length, i], "N"), max);
    }
    return max;
}