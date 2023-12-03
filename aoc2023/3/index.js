const fs = require("fs");
const text = fs.readFileSync("./data.txt", { encoding: "utf-8" });

function isSymbol(char) {
    return char && !isDigit(char) && char !== ".";
}

function isPart(range, line, before, after) {
    const [start, end] = range;
    const min = Math.max(0, start - 1);
    const max = Math.min(line.length, end + 1);
    if (isSymbol(line[min]) || isSymbol(line[max])) {
        return true;
    }
    const adjacentBefore = before
        .slice(min, max + 1)
        .split("")
        .find(isSymbol);
    if (adjacentBefore) {
        return true;
    }

    const adjacentAfter = after
        .slice(min, max + 1)
        .split("")
        .find(isSymbol);
    if (adjacentAfter) {
        return true;
    }
    return false;
}

function isDigit(str) {
    const charCode = str.charCodeAt(0);
    return charCode >= 48 && charCode <= 57;
}

function sum(numbers) {
    return numbers.reduce((acc, value) => acc + value, 0);
}

function getParts(lines) {
    const parts = [];
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        let index = 0;
        let start = null;
        while (index < line.length) {
            const char = line[index];
            const _isDigit = isDigit(char);
            if (!_isDigit) {
                if (start !== null) {
                    const _isPart = isPart(
                        [start, index - 1],
                        line,
                        lines[i - 1] || "",
                        lines[i + 1] || "",
                    );
                    if (_isPart) {
                        const value = +line.slice(start, index);
                        parts.push({
                            line: i,
                            value: value,
                            range: [start, index - 1],
                        });
                    }

                    start = null;
                }
            } else {
                if (start === null) {
                    start = index;
                }
            }
            index++;
        }
        if (start !== null) {
            const _isPart = isPart(
                [start, index],
                line,
                lines[i - 1] || "",
                lines[i + 1] || "",
            );
            if (_isPart) {
                const value = +line.slice(start);
                parts.push({
                    line: i,
                    value: value,
                    range: [start, line.length - 1],
                });
            }
        }
    }
    return parts;
}

function getGears(lines) {
    const gears = [];
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        for (let j = 0; j < line.length; j++) {
            const char = line[j];
            if (char !== "*") {
                continue;
            }
            gears.push({
                line: i,
                index: j,
            });
        }
    }
    return gears;
}

function puzzle1(text) {
    const lines = text.split("\n").map((l) => l.trim());
    const parts = getParts(lines);
    return sum(parts.map((p) => p.value));
}

function puzzle2(text) {
    const lines = text.split("\n").map((l) => l.trim());
    const parts = getParts(lines);
    const gears = getGears(lines);
    let sum = 0;
    for (const gear of gears) {
        const { line, index } = gear;
        const adjacentParts = [];
        const currentLeft = parts.find(
            (p) => p.line === line && p.range[1] + 1 === index,
        );
        if (currentLeft) {
            adjacentParts.push(currentLeft.value);
        }
        const currentRight = parts.find(
            (p) => p.line === line && p.range[0] - 1 === index,
        );
        if (currentRight) {
            adjacentParts.push(currentRight.value);
        }
        const top = parts.filter(
            (p) =>
                p.line == line - 1 &&
                index >= p.range[0] - 1 &&
                index <= p.range[1] + 1,
        );
        adjacentParts.push(...top.map((p) => p.value));
        const bottom = parts.filter(
            (p) =>
                p.line === line + 1 &&
                index >= p.range[0] - 1 &&
                index <= p.range[1] + 1,
        );
        adjacentParts.push(...bottom.map((p) => p.value));
        if (adjacentParts.length === 2) {
            sum += adjacentParts[0] * adjacentParts[1];
        }
    }
    return sum;
}
