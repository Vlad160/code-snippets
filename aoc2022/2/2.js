const fs = require("fs");

const playerSigns = {
    Y: "paper",
    X: "rock",
    Z: "scissors",
};

const resultSigns = {
    Y: "draw",
    X: "lose",
    Z: "win",
};

const elfSigns = {
    B: "paper",
    A: "rock",
    C: "scissors",
};

const signValue = {
    rock: 1,
    paper: 2,
    scissors: 3,
};

function solve() {
    const content = fs.readFileSync("./data.txt", { encoding: "utf-8" });
    const data = content.split("\r\n");
    let score = 0;
    for (let i = 0; i < data.length; i++) {
        const chunk = data[i];
        const elf = chunk[0];
        const player = chunk[2];
        const elfS = elfSigns[elf];
        const playerS = playerSigns[player];

        score += signValue[playerS];

        if (elfS === playerS) {
            score += 3;
        } else if (elfS === "paper") {
            score += playerS === "rock" ? 0 : 6;
        } else if (elfS === "rock") {
            score += playerS === "scissors" ? 0 : 6;
        } else if (elfS === "scissors") {
            score += playerS === "paper" ? 0 : 6;
        }
    }
    return score;
}

function solve2() {
    const content = fs.readFileSync("./data.txt", { encoding: "utf-8" });
    const data = content.split("\r\n");
    let score = 0;
    for (let i = 0; i < data.length; i++) {
        const chunk = data[i];
        const elf = chunk[0];
        const elfS = elfSigns[elf];
        const expectedResult = chunk[2];

        const resultS = resultSigns[expectedResult];

        score += resultS === "lose" ? 0 : resultS === "win" ? 6 : 3;
        
        if (resultS === "draw") {
            score += signValue[elfS];
        } else if (elfS === "paper") {
            score +=
                resultS === "win" ? signValue["scissors"] : signValue["rock"];
        } else if (elfS === "rock") {
            score +=
                resultS === "win" ? signValue["paper"] : signValue["scissors"];
        } else if (elfS === "scissors") {
            score += resultS === "win" ? signValue["rock"] : signValue["paper"];
        }
    }
    return score;
}

console.log(solve2());
