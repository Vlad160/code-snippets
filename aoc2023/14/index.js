const fs = require("fs");
const text = fs.readFileSync("./data.txt", { encoding: "utf-8" });
const lines = text.split("\n").map((l) => l.trim());

function parseData(lines) {
    return lines.map((l) => l.split(""));
}

function tiltNorth(x, y, grid) {
    let prev = x;
    let current = x - 1;
    let next = grid[current]?.[y];
    while (current >= 0 && next && next === ".") {
        grid[current][y] = "O";
        grid[prev][y] = ".";
        prev = current;
        current--;
        next = grid[current]?.[y];
    }
}

function tiltSouth(x, y, grid) {
    let prev = x;
    let current = x + 1;
    let next = grid[current]?.[y];
    while (current < grid.length && next && next === ".") {
        grid[current][y] = "O";
        grid[prev][y] = ".";
        prev = current;
        current++;
        next = grid[current]?.[y];
    }
}

function tiltWest(x, y, grid) {
    let prev = y;
    let current = y - 1;
    let next = grid[x][current];
    while (current >= 0 && next && next === ".") {
        grid[x][current] = "O";
        grid[x][prev] = ".";
        prev = current;
        current--;
        next = grid[x][current];
    }
}

function tiltEast(x, y, grid) {
    let prev = y;
    let current = y + 1;
    let next = grid[x][current];
    while (current < grid[x].length && next && next === ".") {
        grid[x][current] = "O";
        grid[x][prev] = ".";
        prev = current;
        current++;
        next = grid[x][current];
    }
}
function calcScore(data) {
    let score = 0;
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].length; j++) {
            if (data[i][j] === "O") {
                score += data.length - i;
            }
        }
    }
    return score;
}

function iterateNorth(data) {
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].length; j++) {
            if (data[i][j] === "O") {
                tiltNorth(i, j, data);
            }
        }
    }
    return data;
}

function iterateSouth(data) {
    for (let i = data.length - 1; i >= 0; i--) {
        for (let j = 0; j < data[i].length; j++) {
            if (data[i][j] === "O") {
                tiltSouth(i, j, data);
            }
        }
    }
    return data;
}

function iterateWest(data) {
    for (let i = data.length - 1; i >= 0; i--) {
        for (let j = 0; j < data[i].length; j++) {
            if (data[i][j] === "O") {
                tiltWest(i, j, data);
            }
        }
    }
    return data;
}

function iterateEast(data) {
    for (let i = data.length - 1; i >= 0; i--) {
        for (let j = data[i].length - 1; j >= 0; j--) {
            if (data[i][j] === "O") {
                tiltEast(i, j, data);
            }
        }
    }
    return data;
}

function puzzle1(lines) {
    const data = parseData(lines);
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].length; j++) {
            if (data[i][j] === "O") {
                tiltNorth(i, j, data);
            }
        }
    }
    const score = calcScore(data);
    return score;
}

function puzzle2(lines, iterations) {
    let data = parseData(lines);
    const cache = {};
    const cycle = (data) => {
        iterateNorth(data);
        iterateWest(data);
        iterateSouth(data);
        iterateEast(data);
        return data;
    };
    let skipCache = false;
    for (let k = 0; k < iterations; k++) {
        const key = JSON.stringify(data);
        if (cache[key] && !skipCache) {
            const v = cache[key];
            const diff = k - v;
            const iterationsLeft = (iterations - k - 1) % diff;
            k = iterations - iterationsLeft - 1;
            skipCache = true;
        }
        data = cycle(data);
        cache[key] = k;
    }
    const score = calcScore(data);
    return score;
}