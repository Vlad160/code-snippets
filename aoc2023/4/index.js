const fs = require("fs");
const text = fs.readFileSync("./data.txt", { encoding: "utf-8" });

function parseData(lines) {
    const cards = [];
    for (const line of lines) {
        const colonIndex = line.indexOf(":");
        let index = colonIndex + 1;
        let char = line[index];
        const winningNumbers = new Set();
        while (char !== "|") {
            index = skipSpace(line, index);
            char = line[index];
            if (char === "|") {
                index++;
                break;
            }
            const { value, index: newIndex } = readNumber(line, index);
            if (value === null) {
                throw new Error(`Error occurred while reading winning numbers`);
            }
            index = newIndex;
            char = line[index];
            winningNumbers.add(value);
        }
        const myNumbers = new Set();
        while (index < line.length) {
            index = skipSpace(line, index);
            const { value, index: newIndex } = readNumber(line, index);
            if (value === null) {
                throw new Error(`Error occurred while reading winning numbers`);
            }
            index = newIndex;
            myNumbers.add(value);
        }
        cards.push({ winning: winningNumbers, own: myNumbers });
    }
    return cards;
}

function calculateWinnings(cards) {
    let sum = 0;
    for (const card of cards) {
        let winningNumbersCount = 0;
        for (const winningNumber of card.winning) {
            if (card.own.has(winningNumber)) {
                winningNumbersCount++;
            }
        }
        sum +=
            winningNumbersCount === 0
                ? 0
                : Math.pow(2, winningNumbersCount - 1);
    }
    return sum;
}

function isDigit(str) {
    const charCode = str.charCodeAt(0);
    return charCode >= 48 && charCode <= 57;
}

function readNumber(line, index) {
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
    return {
        index: index,
        value: number.length === 0 ? null : +number.join(""),
    };
}

function skipSpace(line, index) {
    let char = line[index];
    while (index < line.length && char === " ") {
        index++;
        char = line[index];
    }
    return index;
}

function puzzle1() {
    const cards = parseData(text.split("\n").map((l) => l.trim()));
    const result = calculateWinnings(cards);
    return result;
}

function calculateCardWinnings(card) {
    let winningNumbersCount = 0;
    for (const winningNumber of card.winning) {
        if (card.own.has(winningNumber)) {
            winningNumbersCount++;
        }
    }
    return winningNumbersCount;
}

function sum(numbers) {
    return numbers.reduce((acc, value) => acc + value, 0);
}

function calculateCards(cards) {
    const copies = { 0: 1 };
    for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        if (copies[i] === undefined) {
            copies[i] = 1;
        }
        const winnings = calculateCardWinnings(card);
        for (let j = 0; j < winnings; j++) {
            const index = j + i + 1;
            const currentCopies = copies[index] || 1;
            copies[index] = copies[i] + (currentCopies);
        }
    }
    return sum(Object.values(copies))
}


function puzzle1() {
    const cards = parseData(text.split("\n").map((l) => l.trim()));
    return calculateWinnings(cards);
}


function puzzle2() {
    const cards = parseData(text.split("\n").map((l) => l.trim()));
    return calculateCards(cards);
}
