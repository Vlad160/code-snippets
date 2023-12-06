const fs = require("fs");
const text = fs.readFileSync("./data.txt", { encoding: "utf-8" });

function parseData(lines) {
    const time = lines[0]
        .split(":")[1]
        .split(" ")
        .filter(Boolean)
        .map((x) => +x);

    const distance = lines[1]
        .split(":")[1]
        .split(" ")
        .filter(Boolean)
        .map((x) => +x);

    return { time, distance };
}

function getWinPossibilities(time, distance) {
    let times = 0;
    let found = false;
    for (let i = 0; i <= time; i++) {
        const travel = i * (time - i);
        if (travel > distance) {
            found = true;
            times++;
        } else if (found) {
            break;
        }
    }
    return times;
}
const lines = text.split("\n").map((l) => l.trim());

const quadraticEquation = (a, b, c) => {
    const D = b * b - 4 * a * c;
    const sqrtDelta = Math.floor(Math.sqrt(D));
    const x1 = (-b - sqrtDelta) / (2 * a);
    const x2 = (-b + sqrtDelta) / (2 * a);

    return [x1, x2];
};

function puzzle1(lines) {
    const data = parseData(lines);
    let result = 1;
    for (let i = 0; i < data.time.length; i++) {
        result *= getWinPossibilities(data.time[i], data.distance[i]);
    }
    return result;
}

function puzzle2(lines) {
    const data = parseData(lines);
    let result = 1;
    const time = +data.time.join("");
    const distance = +data.distance.join("");
    const [x1, x2] = quadraticEquation(1, -time, distance);
    let r = Math.floor(x2) - Math.ceil(x1);
    const minDistance = x1 * (time - x1);
    if (minDistance >= distance) {
        r += 1;
    } else {
        r -= 1;
    }
    return r;
}

console.log(puzzle2(lines));
