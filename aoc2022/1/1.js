const fs = require("fs");

async function solve() {
    const data = await fs.promises.readFile("./data.txt", {
        encoding: "utf-8",
    });

    let maxCallories = 0;

    let currentCallories = 0;

    const chunks = data.split("\r\n");

    for (let i = 0; i < chunks.length; i++) {
        const chunk = chunks[i].trim();
        if (chunk === "") {
            if (currentCallories > maxCallories) {
                maxCallories = currentCallories;
            }
            currentCallories = 0;
        }
        currentCallories += Number(chunk);
    }
    return { maxCallories };
}

async function solve2() {
    const data = await fs.promises.readFile("./data.txt", {
        encoding: "utf-8",
    });

    const topThreeCallories = [0, 0, 0];

    let currentCallories = 0;

    const chunks = data.split("\r\n");

    for (let i = 0; i < chunks.length; i++) {
        const chunk = chunks[i].trim();
        if (chunk === "") {
            if (currentCallories > topThreeCallories[2]) {
                topThreeCallories[2] = currentCallories;
                topThreeCallories.sort((a, b) => b - a);
            }
            currentCallories = 0;
        }
        currentCallories += Number(chunk);
    }
    return { total: topThreeCallories.reduce((acc, v) => (acc + v)) };
}

solve2().then((result) => console.log(result));
