const { group } = require("console");
const fs = require("fs");
const text = fs.readFileSync("./data.txt", { encoding: "utf-8" });
const lines = text.split("\n").map((l) => l.trim());

function parseData(lines) {
    return lines.map((line) => {
        const [draw, groups] = line.split(" ");
        return {
            pic: draw,
            groups: groups.split(",").map((g) => Number.parseInt(g)),
        };
    });
}

function memoize(func) {
    const stored = new Map();

    return (...args) => {
        const k = JSON.stringify(args);
        if (stored.has(k)) {
            return stored.get(k);
        }
        const result = func(...args);
        stored.set(k, result);
        return result;
    };
}

function sum(array) {
    return array.reduce((acc, v) => acc + v);
}

function lastIndexFromBeginning(line, char) {
    let i = 0;
    let sym = line[i];
    while(i < line.length && char == sym) {
        sym = line[++i];
    }
    return i;
}

const bff = memoize(function bruteForceLine2(currentLine, groups) {
    if (currentLine.length === 0) {
        if (groups.length === 0) {
            return 1;
        }
        return 0;
    }
    if (groups.length === 0) {
        for (let i = 0; i < currentLine.length; i++) {
            if (currentLine[i] === "#") {
                return 0;
            }
        }
        return 1;
    }

    if (currentLine.length < sum(groups) + groups.length - 1) {
        return 0;
    }

    const dotIndex = lastIndexFromBeginning(currentLine, ".");
    if (dotIndex !== 0) {
        return bff(currentLine.slice(dotIndex), groups);
    }

    if (currentLine[0] === "#") {
        const [run, ...leftoverGroups] = groups;
        for (let i = 0; i < run; i++) {
            if (currentLine[i] === ".") {
                return 0;
            }
        }
        if (currentLine[run] === "#") {
            return 0;
        }

        return bff(currentLine.slice(run + 1), leftoverGroups);
    }
    return bff("#" + currentLine.slice(1), groups) + bff("." + currentLine.slice(1), groups);
});

function calculateCombinations(data) {
    let result = 0;
    for (const chunk of data) {
        const lineResult = bff(chunk.pic, chunk.groups);
        result += lineResult;
    }
    return result;
}
function unfoldChunk(data) {
    const { pic, groups } = data;
    return {
        pic: Array(5).fill(pic).join("?"),
        groups: Array(5).fill(groups).flat(),
    };
}

function puzzle1(lines) {
    const data = parseData(lines);
    const result = calculateCombinations(data);
    return result;
}

function puzzle2(lines) {
    const data = parseData(lines);
    const unfoldData = data.map(unfoldChunk);
    const result = calculateCombinations(unfoldData);
    return result;
}
