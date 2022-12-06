const fs = require("fs");
const os = require("os");

function applyStep(stacks, from, to) {
    const item = stacks[from].pop();
    stacks[to].push(item);
}

function applyMove(stacks, from, to, times) {
    for (let i = 0; i < times; i++) {
        applyStep(stacks, from, to);
    }
}

function applyMove2(stacks, from, to, times) {
    const itemsToMove = stacks[from].splice(-times, times);
    stacks[to].push(...itemsToMove);
}

function solve() {
    const content = fs.readFileSync("./data.txt", { encoding: "utf-8" });
    const lines = content.split(os.EOL);
    // 3 symbols per crate...
    const stacksLen = lines[0].split(" ").length / 3;
    const stacks = new Array(stacksLen).fill(null).map(() => []);
    let line = 0;
    while (true) {
        const currentLine = lines[line];
        if (!currentLine.trim() || !currentLine.includes("[")) {
            line += 2;
            break;
        }
        for (let j = 0; j < currentLine.length; j += 4) {
            const crate = currentLine.substring(j + 1, j + 2);
            if (crate.trim()) {
                stacks[j / 4].unshift(crate);
            }
        }
        line += 1;
    }
    while (line < lines.length) {
        const command = lines[line];
        const [_, times, __, from, ___, to] = command.split(" ");
        applyMove(stacks, Number(from) - 1, Number(to) - 1, Number(times));
        line++;
    }
    const top = stacks.map((stack) => stack.pop()).join("");
    return top;
}

function solve2() {
    const content = fs.readFileSync("./data.txt", { encoding: "utf-8" });
    const lines = content.split(os.EOL);
    // 3 symbols per crate...
    const stacksLen = lines[0].split(" ").length / 3;
    const stacks = new Array(stacksLen).fill(null).map(() => []);
    let line = 0;
    while (true) {
        const currentLine = lines[line];
        if (!currentLine.trim() || !currentLine.includes("[")) {
            line += 2;
            break;
        }
        for (let j = 0; j < currentLine.length; j += 4) {
            const crate = currentLine.substring(j + 1, j + 2);
            if (crate.trim()) {
                stacks[j / 4].unshift(crate);
            }
        }
        line += 1;
    }
    while (line < lines.length) {
        const command = lines[line];
        const [_, times, __, from, ___, to] = command.split(" ");
        applyMove2(stacks, Number(from) - 1, Number(to) - 1, Number(times));
        line++;
    }
    const top = stacks.map((stack) => stack.pop()).join("");
    return top;
}

console.log(solve2());
