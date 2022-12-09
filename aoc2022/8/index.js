const fs = require("fs");
const { EOL } = require("os");

function collectVisibleFromTop(forest, cache) {
    const len = forest.length;
    let visible = 0;
    for (let i = 0; i < len; i++) {
        j = -1;
        let max = -1;
        while (j <= forest.length - 2) {
            const current = Number(forest[++j][i]);
            if (current > max) {
                max = current;
                if (!cache[j][i]) {
                    visible++;
                    cache[j][i] = true;
                }
            }
        }
    }
    return visible;
}

function collectVisibleFromLeft(forest, cache) {
    const len = forest[0].length;
    let visible = 0;
    for (let i = 0; i < forest.length; i++) {
        j = -1;
        let max = -1;
        while (j <= len - 2) {
            const current = Number(forest[i][++j]);
            if (current > max) {
                max = current;
                if (!cache[i][j]) {
                    visible++;
                    cache[i][j] = true;
                }
            }
        }
    }
    return visible;
}

function collectVisibleFromBottom(forest, cache) {
    const len = forest.length;
    let visible = 0;
    for (let i = 0; i < len; i++) {
        j = forest.length;
        let max = -1;
        while (j >= 1) {
            const current = forest[--j][i];
            if (current > max) {
                max = current;
                if (!cache[j][i]) {
                    visible++;
                    cache[j][i] = true;
                }
            }
        }
    }
    return visible;
}

function collectVisibleFromRight(forest, cache) {
    const len = forest[0].length;
    let visible = 0;
    for (let i = 0; i < forest.length; i++) {
        j = len;
        let max = -1;
        while (j >= 1) {
            const current = Number(forest[i][--j]);
            if (current > max) {
                max = current;
                if (!cache[i][j]) {
                    visible++;
                    cache[i][j] = true;
                }
            }
        }
    }
    return visible;
}

function toRight(forest, i, j, cb) {
    const len = forest[i].length;
    for (let col = j + 1; col < len - 2; col++) {
        const current = Number(forest[i][col]);
        if (cb(current, i, col) === false) {
            return;
        }
    }
}

function toLeft(forest, i, j, cb) {
    for (let col = j - 1; col >= 0; col--) {
        const current = Number(forest[i][col]);
        if (cb(current, i, col) === false) {
            return;
        }
    }
}

function toTop(forest, i, j, cb) {
    for (let row = i - 1; row >= 0; row--) {
        const current = Number(forest[row][j]);
        if (cb(current, row, j) === false) {
            return;
        }
    }
}

function toBottom(forest, i, j, cb) {
    const len = forest.length;
    for (let row = i + 1; row < len; row++) {
        const current = Number(forest[row][j]);
        if (cb(current, row, j) === false) {
            return;
        }
    }
}
// 1717
// Should be refactored using fucntions from toDirection
function solve() {
    const content = fs.readFileSync("./data.txt", { encoding: "utf-8" });
    const lines = content.split(EOL);
    let visible = 0;
    const cache = new Array(lines.length).fill(null).map(() => []);
    visible += collectVisibleFromTop(lines, cache);
    visible += collectVisibleFromBottom(lines, cache);
    visible += collectVisibleFromLeft(lines, cache);
    visible += collectVisibleFromRight(lines, cache);
    return visible;
}

function getTreeScore(forest, i, j) {
    const self = Number(forest[i][j]);
    function wrap(cb) {
        let counter = 0;
        cb(forest, i, j, (current) => {
            counter += 1;
            if (current >= self) {
                return false;
            }
        });
        return counter;
    }
    const score = wrap(toTop) * wrap(toBottom) * wrap(toLeft) * wrap(toRight);
    return score;
}
// Caching should be used in toDirection to retrieve score of previous tree
function solve2() {
    const content = fs.readFileSync("./data.txt", { encoding: "utf-8" });
    const lines = content.split(EOL);
    const rows = lines.length;
    let max = 0;
    for (let i = 0; i < rows; i++) {
        const line = lines[i];
        const len = line.length;
        for (let j = 0; j < len; j++) {
            const score = getTreeScore(lines, i, j);
            if (score > max) {
                max = score;
            }
        }
    }
    return max;
}

console.log(solve2());
