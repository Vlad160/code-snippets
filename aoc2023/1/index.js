const fs = require("fs");
const data = fs.readFileSync("./data.txt", { encoding: "utf-8" });

function puzzle1(lines) {
    let sum = 0;
    for (const line of lines) {
        const numbers = line.split("").filter((char) => {
            const charCode = char.charCodeAt(0);
            return charCode >= 48 && charCode <= 57;
        });
        if (numbers.length === 1) {
            numbers.push(numbers[0]);
        }
        const value = +`${numbers[0]}${numbers.at(-1)}`;
        sum += value;
    }
    return sum;
}

// twone should be 21 but not 2ne
const WORD_TO_NUMBER = {
    one: "o1e",
    two: "t2o",
    three: "t3e",
    four: "f4r",
    five: "f5e",
    six: "s6x",
    seven: "s7n",
    eight: "e8t",
    nine: "n9e",
};

function puzzle2(lines) {
    const replacedLines = lines.map((line) => {
        const entries = Object.entries(WORD_TO_NUMBER);
        let replacedLine = line;
        for (const [word, replacement] of entries) {
            replacedLine = replacedLine.replaceAll(word, replacement);
        }
        return replacedLine;
    });

    return puzzle1(replacedLines);
}

// console.log(puzzle1(data.split("\r\n")));
console.log(puzzle2(data.split("\r\n")));
