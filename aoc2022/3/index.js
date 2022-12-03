const fs = require("fs");

function solve() {
    const content = fs.readFileSync("./data.txt", {
        encoding: "utf-8",
    });
    const data = content.split("\r\n");
    let score = 0;
    for (let i = 0; i < data.length; i++) {
        const chunk = data[i].trim();
        const first = chunk.slice(0, chunk.length / 2);
        const second = chunk.slice(chunk.length / 2);
        console.assert(first.length === second.length);
        const firstUnique = new Set([...first]);
        const common = [...second].find((l) => firstUnique.has(l));
        score += getScore(common);
    }
    return score;
}

function solve2() {
    const content = fs.readFileSync("./data.txt", {
        encoding: "utf-8",
    });
    const data = content.split("\r\n");
    let score = 0;
    for (let i = 0; i < data.length - 2; i += 3) {
        const group = [data[i], data[i + 1], data[i + 2]];
        const badge = badgeForGroup(group);
        score += getScore(badge);
    }
    return score;
}

function getScore(letter) {
    const code = letter.charCodeAt(0);
    if (code >= 97 && code <= 122) {
        return code - 96;
    } else {
        return code - 64 + 26;
    }
}

function badgeForGroup(group) {
    const firstUnique = new Set([...group[0]]);
    const candidates = [...group[1]].filter((l) => firstUnique.has(l));
    const candidatesUnique = new Set([...candidates]);
    return [...group[2]].find((l) => candidatesUnique.has(l));
}

console.log(solve2());
// a - 97 z- 122
// A - 65 - 90