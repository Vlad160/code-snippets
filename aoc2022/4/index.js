const fs = require("fs");
function solve() {
    const content = fs.readFileSync("./data.txt", { encoding: "utf-8" });
    const data = content.split("\r\n").filter((item) => {
        const [p1, p2] = item.split(",");
        const first = parsePiece(p1);
        const second = parsePiece(p2);
        return (
            (first.start <= second.start && first.end >= second.end) ||
            (second.start <= first.start && second.end >= first.end)
        );
    });
    console.log(data);
    return data.length;
}

function solve2() {
    const content = fs.readFileSync("./data.txt", { encoding: "utf-8" });
    const data = content.split("\r\n").filter((item) => {
        const [p1, p2] = item.split(",");
        const first = parsePiece(p1);
        const second = parsePiece(p2);
        return (
            (first.start <= second.start && first.end >= second.start) ||
            (second.start <= first.start && second.end >= first.start)
        );
    });
    console.log(data);
    return data.length;
}

function parsePiece(piece) {
    const [rangeStart, rangeEnd] = piece.split("-");
    return {
        start: Number(rangeStart),
        end: Number(rangeEnd),
    };
}

console.log(solve2());
