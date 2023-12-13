const fs = require("fs");
const text = fs.readFileSync("./data.txt", { encoding: "utf-8" });
const lines = text.split("\n").map((l) => l.trim());

function parseData(lines) {
    const data = [];
    let currentData = [];
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.trim() === "") {
            data.push(currentData);
            currentData = [];
        } else {
            currentData.push(line);
        }
    }
    data.push(currentData);
    return data;
}

function isMirroredRow(row, pattern, withSmudge) {
    let fixedSmudge = false;
    const limit = Math.min(row, pattern.length - row);
    for (let i = 1; i <= limit; i++) {
        for (let j = 0; j < pattern[row - 1].length; j++) {
            const a = pattern[row - i][j];
            const b = pattern[row + i - 1][j];
            if (a !== b) {
                if (withSmudge) {
                    if (!fixedSmudge) {
                        fixedSmudge = true;
                        continue;
                    }
                    return false;
                }
                return false;
            }
        }
    }
    if (withSmudge) {
        return fixedSmudge;
    }
    return true;
}

function isMirroredColumn(column, pattern, withSmudge) {
    let fixedSmudge = false;
    const limit = Math.min(column, pattern[0].length - column);
    for (let i = 1; i <= limit; i++) {
        for (let j = 0; j < pattern.length; j++) {
            const a = pattern[j][column - i];
            const b = pattern[j][column + i - 1];
            if (a !== b) {
                if (withSmudge) {
                    if (!fixedSmudge) {
                        fixedSmudge = true;
                        continue;
                    }
                    return false;
                }
                return false;
            }
        }
    }
    if (withSmudge) {
        return fixedSmudge;
    }
    return true;
}

function mirroredColumn(pattern, withSmudge) {
    for (let i = 1; i < pattern[0].length; i++) {
        if (isMirroredColumn(i, pattern, withSmudge)) {
            return i;
        }
    }
    return null;
}

function mirroredRow(pattern, withSmudge) {
    for (let i = 1; i < pattern.length; i++) {
        if (isMirroredRow(i, pattern, withSmudge)) {
            return i;
        }
    }
    return null;
}

function findMirrored(data, withSmudge) {
    const rows = [];
    const columns = [];

    for (let i = 0; i < data.length; i++) {
        const pattern = data[i];
        const mirroredColumnIndex = mirroredColumn(pattern, withSmudge);
        const mirroredRowIndex = mirroredRow(pattern, withSmudge);
        if (mirroredColumnIndex !== null) {
            columns.push(mirroredColumnIndex);
        } else if (mirroredRowIndex !== null) {
            rows.push(mirroredRowIndex);
        } else {
            const a = pattern;
            // const b = transpose(pattern);
            const l = data[i].length;
        }
    }
    return {
        rows,
        columns,
    };
}

function sum(array) {
    return array.reduce((acc, v) => acc + v, 0);
}

function puzzle1(lines) {
    const data = parseData(lines);
    const mirrors = findMirrored(data);
    const result = sum(mirrors.columns) + sum(mirrors.rows) * 100;
    return result;
}

function puzzle2(lines) {
    const data = parseData(lines);
    const mirrors = findMirrored(data, true);
    const result = sum(mirrors.columns) + sum(mirrors.rows) * 100;
    return result;
}

console.log(puzzle2(lines));
