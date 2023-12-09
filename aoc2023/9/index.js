const fs = require("fs");
const text = fs.readFileSync("./data.txt", { encoding: "utf-8" });
const lines = text.split("\n").map((l) => l.trim());

function parseData(lines) {
    return lines.map((line) => line.split(" ").map((v) => Number(v)));
}

function getSeqNextValue(line, backwards = false) {
    const seq = [line];
    let currentSeq = line;
    while (true) {
        let zeroes = 0;
        const newSeq = [];
        for (let i = 0; i < currentSeq.length - 1; i++) {
            const nextValue = currentSeq[i + 1] - currentSeq[i];
            if (nextValue === 0) {
                zeroes++;
            }
            newSeq.push(nextValue);
        }
        seq.push(newSeq);
        currentSeq = newSeq;
        if (zeroes === newSeq.length) {
            break;
        }
    }
    let prevValue = 0;
    for (let i = seq.length - 2; i >= 0; i--) {
        const index = backwards ? 0 : -1;
        const lastSeqValue = seq[i].at(index);
        let nextValue = 0;
        if (backwards) {
            nextValue = lastSeqValue - prevValue;
        } else {
            nextValue = lastSeqValue + prevValue;
        }
        prevValue = nextValue;
    } 
    return prevValue;
}

function puzzle1(lines) {
    const data = parseData(lines);
    let result = 0;
    for (const line of data) {
        result += getSeqNextValue(line);
    }
    return result;
}

function puzzle2(lines) {
    const data = parseData(lines);
    let result = 0;
    for (const line of data) {
        result += getSeqNextValue(line, true);
    }
    return result;
}
