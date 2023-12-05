const fs = require("fs");
const text = fs.readFileSync("./data.txt", { encoding: "utf-8" });

function parseData(lines) {
    const seeds = lines[0]
        .split(":")[1]
        .split(" ")
        .map((s) => +s)
        .slice(1);

    const ranges = [];

    let index = 3;

    let currentMap = [];

    while (index < lines.length) {
        let line = lines[index];
        const dataLine = line.split(" ").map((l) => +l);

        // destStart, sourceStart, len
        currentMap.push([dataLine[0], dataLine[1], dataLine[2]]);

        index++;

        line = lines[index]?.trim() || "";
        if (line === "") {
            ranges.push(currentMap);
            currentMap = [];
            index += 2;
        }
    }

    return { seeds, ranges };
}

const lines = text.split("\n").map((l) => l.trim());

function getMappings(data) {
    const { seeds, ranges } = data;
    const mappings = [];
    for (const seed of seeds) {
        let currentMapping = [];
        currentMapping.push(seed);
        let target = seed;
        for (const map of ranges) {
            for (const range of map) {
                if (target >= range[1] && target <= range[1] + range[2]) {
                    const m = range[0] + target - range[1];
                    target = m;
                    break;
                }
            }
            currentMapping.push(target);
        }
        mappings.push(currentMapping);
    }
    return mappings;
}

function shrinkRange(fromRange, toRange) {
    const [fs, fl] = fromRange;
    const [ts, tl] = toRange;

    if (fs > ts + tl || fs + fl < ts) {
        return [[], [fs, fl]];
    }


    const start = Math.max(fs, ts);

    const len = Math.min((fl - start - fs), (tl - start - ts));

    return [[start, len], []]
}

function puzzle1() {
    const data = parseData(lines);
    const mappings = getMappings(data);
    let lowest = mappings[0].at(-1);
    for (let i = 1; i < mappings.length; i++) {
        const value = mappings[i].at(-1);
        if (value < lowest) {
            lowest = value;
        }
    }
    return lowest;
}

function puzzle2() {
    const data = parseData(lines);
    return mappingsForSeedsRange(data);
}
// Betters structures should be used. tree???
console.log(puzzle2());
