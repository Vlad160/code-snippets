const fs = require("fs");

function solve() {
    const data = fs.readFileSync("./data.txt", { encoding: "utf-8" });
    const stack = [];
    let index = 0;
    while (index !== data.length - 1) {
        const char = data[index];
        const stackIdx = stack.indexOf(char);
        if (stackIdx !== -1) {
            const drop = index - stackIdx;
            for (let i = 0; i < drop; i++) {
                stack.shift();
            }
            stack.push(char);
        } else if (stack.length === 3) {
            return index;
        } else {
            stack.push(char);
        }
        index++;
    }
    return index;
}


function solve2() {
    const data = fs.readFileSync("./data.txt", { encoding: "utf-8" });
    const stack = [];
    let index = 0;
    while (index !== data.length - 1) {
        const char = data[index];
        const stackIdx = stack.indexOf(char);
        if (stackIdx !== -1) {
            const drop = index - stackIdx;
            for (let i = 0; i < drop; i++) {
                stack.shift();
            }
            stack.push(char);
        } else if (stack.length === 13) {
            return index;
        } else {
            stack.push(char);
        }
        index++;
    }
    return index;
}

console.log(solve2());
