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
    let lowest = Infinity;
    for (const seed of seeds) {
        let target = seed;
        for (const map of ranges) {
            for (const range of map) {
                if (target >= range[1] && target <= range[1] + range[2]) {
                    const m = range[0] + target - range[1];
                    target = m;
                    break;
                }
            }
        }
        lowest = Math.min(lowest, target);
    }
    return lowest;
}

function getMappings2(data) {
    const { seeds, ranges } = data;
    let lowest = Infinity;
    for (let i = 0; i < seeds.length; i += 2) {
        const seed = seeds[i];
        const seedRange = seeds[i + 1];
        for (let j = 0; j < seedRange; j++) {
            let target = seed + j;
            for (const map of ranges) {
                for (const range of map) {
                    if (target >= range[1] && target <= range[1] + range[2]) {
                        const m = range[0] + target - range[1];
                        target = m;
                        break;
                    }
                }
            }
            lowest = Math.min(lowest, target);
        }
    }

    return lowest;
}

function puzzle1() {
    const data = parseData(lines);
    return getMappings(data);
}

// Betters structures should be used. tree???

class Interval {
    constructor(start, len, transform) {
        this.start = start;
        this.len = len;
        this.end = start + len;
        this.transform = transform ?? start;
    }
    /**
     *
     * @param {Interval} interval
     */
    inersects(interval) {
        return !(this.start > interval.end || this.end < interval.start);
    }

    /**
     *
     * @param {Interval} interval
     * @returns {Interval[] | null}
     */
    intersection(interval) {
        if (!this.inersects(interval)) {
            return null;
        }
        const start = Math.max(this.start, interval.start);
        const end = Math.min(this.end, interval.end);
        let a, c;
        a = c = null;
        if (this.start < start) {
            a = new Interval(this.start, start - this.start - 1);
        }
        if (this.end > end) {
            c = new Interval(end + 1, this.end - end - 1);
        }
        return [a, new Interval(start, end - start), c];
    }
    /**
     *
     * @param {Interval} interval
     * @returns {Interval | null}
     */
    combine(interval) {
        if (!this.inersects(interval)) {
            return null;
        }
        const start = Math.min(this.start, interval.start);
        const end = Math.max(this.end, interval.end);
        return new Interval(start, end - start);
    }

    /**
     *
     * @param {Interval} interval
     */
    applyTransform(interval) {
        this.start = interval.transform + this.start - interval.start;
        this.end = this.start + this.len;
        this.transform = this.start;
    }
}

function getMappings3(data) {
    const { seeds, ranges } = data;
    const seedsRanges = [];
    for (let i = 0; i < seeds.length; i += 2) {
        seedsRanges.push(new Interval(seeds[i], seeds[i + 1]));
    }

    const rangesRanges = ranges.map((transform) =>
        transform.map((t) => new Interval(t[1], t[2], t[0])),
    );

    let lowest = Infinity;
    let toCheck = [...seedsRanges];
    while (toCheck.length !== 0) {
        let checking = toCheck.pop();
        for (let i = 0; i < rangesRanges.length; i++) {
            const mappings = rangesRanges[i];
            for (let j = 0; j < mappings.length; j++) {
                const map = mappings[j];
                if (checking.inersects(map)) {
                    if (checking.len < 1) {
                        checking.applyTransform(map);
                        if (checking.start === 1) {
                            debugger;
                        }
                        break;
                    }
                    const [a, b, c] = checking.intersection(map);
                    const total = [a, b, c]
                        .filter(Boolean)
                        .reduce((acc, x) => acc + (x.len || 1), 0);

                    if (a && a.len >= 1) {
                        toCheck.push(a);
                    }
                    if (c && c.len >= 1) {
                        toCheck.push(c);
                    }

                    b.applyTransform(map);

                    checking = b;
                }
            }
        }

        lowest = Math.min(checking.start, lowest);
    }

    return lowest;
}

function getSeedGivenLocation(step, almanac) {
    for (const almanacEntry of almanac.slice().reverse()) {
        for (const [destination, source, length] of almanacEntry) {
            if (destination <= step && destination + length > step) {
                step = source + step - destination;
                break;
            }
        }
    }

    return step;
}

const doWeHaveThatSeed = (seed, seedRanges) =>
    seedRanges.some(
        ([seedStart, length]) =>
            seedStart <= seed && seedStart + length >= seed,
    );

//https://www.reddit.com/r/adventofcode/comments/18b4b0r/comment/kc32jwd/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button
function puzzle2() {
    const data = parseData(lines);
    const seeds = [];
    for (let i = 0; i < data.seeds.length; i += 2) {
        seeds.push([data.seeds[i], data.seeds[i + 1]]);
    }

    // problem inversed, rather than enumerating on enormous amount of seeds we enumerating on
    // ascending locations and checks if we have got seed for that location 🤡
    for (let i = 0; i < 1_000_000_000; i++) {
        const seed = getSeedGivenLocation(i, data.ranges);

        if (doWeHaveThatSeed(seed, seeds)) {
            return i
        }
    }
}
console.log(puzzle2());
