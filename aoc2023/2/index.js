const fs = require("fs");
const text = fs.readFileSync("./data.txt", { encoding: "utf-8" });

const COLORS = ["green", "red", "blue"];

function parseData(text) {
    const lines = text.split("\n");
    const games = [];
    for (const line of lines) {
        const game = line.trim();
        const gameIdEndIndex = game.indexOf(":");
        const gameNo = +game.slice(5, gameIdEndIndex);
        const rounds = game.slice(gameIdEndIndex + 1).split(";");
        const cubes = [];
        for (const round of rounds) {
            const parsedCubes = round.split(",").map((line) => {
                const value = readNum(line.trim(), 0);
                const color = readColor(line.trim());
                if (value === null || color === null) {
                    throw new Error(
                        "Error occured while reading dice color or value",
                    );
                }
                return {
                    value,
                    color,
                };
            });
            cubes.push(parsedCubes);
        }
        games.push({ id: gameNo, rounds: cubes });
    }
    return games;
}

function isDigit(str) {
    const charCode = str.charCodeAt(0);
    return charCode >= 48 && charCode <= 57;
}

function readNum(line, start) {
    let index = start;
    let number = [];
    while (index < line.length) {
        const char = line[index];
        if (isDigit(char)) {
            number.push(char);
            index++;
        } else {
            break;
        }
    }
    return number.length === 0 ? null : +number.join("");
}

function readColor(line) {
    return COLORS.find((color) => line.indexOf(color) !== -1) || null;
}

const CONSTRAINS = {
    red: 12,
    green: 13,
    blue: 14,
};

function puzzle1(text) {
    const data = parseData(text);
    return data.reduce((acc, game) => {
        const isPossible = game.rounds.every((round) => {
            return round.every(
                ({ color, value }) => value <= CONSTRAINS[color],
            );
        });
        if (isPossible) {
            acc += game.id;
        }
        return acc;
    }, 0);
}

function puzzle2(text) {
    const data = parseData(text);
    return data
        .map((game) => {
            const minSetOfCoubes = {
                red: 1,
                blue: 1,
                green: 1,
            };
            for (const round of game.rounds) {
                for (const play of round) {
                    const { value, color } = play;
                    minSetOfCoubes[color] = Math.max(
                        minSetOfCoubes[color],
                        value,
                    );
                }
            }
            return (
                minSetOfCoubes.red * minSetOfCoubes.blue * minSetOfCoubes.green
            );
        })
        .reduce((acc, power) => acc + power, 0);
}

// console.log(puzzle1(text));
console.log(puzzle2(text));