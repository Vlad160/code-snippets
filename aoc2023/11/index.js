const fs = require("fs");
const text = fs.readFileSync("./data.txt", { encoding: "utf-8" });
const lines = text.split("\n").map((l) => l.trim());

function parseData(lines) {
    const galaxies = [];
    const emptyRows = new Set();
    const emptyCols = new Set();
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        let isEmpty = true;
        for (let j = 0; j < line.length; j++) {
            const char = line[j];
            if (char === "#") {
                isEmpty = false;
                galaxies.push([i, j]);
            }
        }
        if (isEmpty) {
            emptyRows.add(i);
        }
    }
    const cols = new Array(lines.length).fill(true);
    for (const galaxy of galaxies) {
        cols[galaxy[1]] = false;
    }

    cols.forEach((c, index) => {
        if (c) {
            emptyCols.add(index);
        }
    });

    return {
        galaxies,
        emptyRows,
        emptyCols,
    };
}

function getPaths(data, rowExpandCoefficient = 1, colExpandCoefficient = 1) {
    const { galaxies, emptyRows, emptyCols } = data;
    const paths = [];
    for (let i = 0; i < galaxies.length; i++) {
        const currentGalaxy = galaxies[i];
        for (let j = i + 1; j < galaxies.length; j++) {
            const nextGalaxy = galaxies[j];
            const dist = calcDist(
                currentGalaxy,
                nextGalaxy,
                emptyRows,
                emptyCols,
                rowExpandCoefficient,
                colExpandCoefficient,
            );
            paths.push({
                from: currentGalaxy,
                to: nextGalaxy,
                dist: dist,
            });
        }
    }
    return paths;
}

function calcDist(
    from,
    to,
    emptyRows,
    emptyCols,
    rowExpandCoefficient = 1,
    colExpandCoefficient = 1,
) {
    // manhattan distance
    const dist = Math.abs(from[0] - to[0]) + Math.abs(from[1] - to[1]);
    let result = 0;
    let rowAdd = from[0] > to[0] ? -1 : 1;
    const rowExpand = Math.max(1, rowExpandCoefficient - 1);
    let i = from[0];
    while (i !== to[0]) {
        if (emptyRows.has(i)) {
            result += rowExpand;
        }
        i += rowAdd;
    }
    rowAdd = from[1] > to[1] ? -1 : 1;

    i = from[1];
    const colExpand = Math.max(1, colExpandCoefficient - 1);

    while (i !== to[1]) {
        if (emptyCols.has(i)) {
            result += colExpand;
        }
        i += rowAdd;
    }

    return dist + result;
}

function puzzle1(lines) {
    const data = parseData(lines);
    const paths = getPaths(data);
    const result = paths.reduce((acc, p) => p.dist + acc, 0);
    return result;
}

function puzzle2(lines) {
    const data = parseData(lines);
    const paths = getPaths(data, 1000000, 1000000);
    const result = paths.reduce((acc, p) => p.dist + acc, 0);
    return result;
}
