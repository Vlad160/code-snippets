const fs = require("fs");
const text = fs.readFileSync("./data.txt", { encoding: "utf-8" });

function parseData(lines) {
    const chunks = [];
    for (const line of lines) {
        const [hand, bid] = line.split(" ");
        chunks.push({
            hand: hand,
            bid: +bid,
        });
    }
    return chunks;
}

const CARD_TO_VALUE = {
    2: 0,
    3: 1,
    4: 2,
    5: 3,
    6: 4,
    7: 5,
    8: 6,
    9: 7,
    T: 8,
    J: 9,
    Q: 10,
    K: 11,
    A: 12,
};

function getTypes(games, withJokers = false) {
    for (const game of games) {
        const uniqueCards = {};
        for (let i = 0; i < game.hand.length; i++) {
            const card = game.hand[i];
            const current = uniqueCards[card] || 0;
            uniqueCards[card] = current + 1;
        }
        let jokers = 0;
        if (withJokers) {
            jokers = uniqueCards["J"] || 0;
            delete uniqueCards["J"];
        }
        const keys = Object.keys(uniqueCards);
        let type = 0;
        const cardsAmount = keys.length;
        if (cardsAmount === 1 || cardsAmount === 0) {
            type = 6;
        } else if (cardsAmount === 2) {
            const maxSameCards =
                Math.max(uniqueCards[keys[0]], uniqueCards[keys[1]]) + jokers;
            type = maxSameCards === 4 ? 5 : 4;
        } else if (cardsAmount === 3) {
            const maxSameCards =
                Math.max(
                    uniqueCards[keys[0]],
                    uniqueCards[keys[1]],
                    uniqueCards[keys[2]],
                ) + jokers;
            type = maxSameCards === 3 ? 3 : 2;
        } else if (cardsAmount === 4) {
            type = 1;
        }
        game.type = type;
    }
}

function getHandsComparator(map) {
    return function compareHands(a, b) {
        if (a.type !== b.type) {
            return a.type - b.type;
        }
        for (let i = 0; i < a.hand.length; i++) {
            const aValue = map[a.hand[i]];
            const bValue = map[b.hand[i]];
            if (aValue !== bValue) {
                return aValue - bValue;
            }
        }
        return 0;
    };
}

const lines = text.split("\n").map((l) => l.trim());

function puzzle1(lines) {
    const data = parseData(lines);
    getTypes(data);
    data.sort(getHandsComparator({ ...CARD_TO_VALUE }));
    const sum = data.reduce((acc, game, i) => acc + (i + 1) * game.bid, 0);
    return sum;
}

function puzzle2(lines) {
    const data = parseData(lines);
    getTypes(data, true);
    data.sort(getHandsComparator({ ...CARD_TO_VALUE, J: -1 }));
    const sum = data.reduce((acc, game, i) => acc + (i + 1) * game.bid, 0);
    return sum;
}


