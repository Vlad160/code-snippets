const fs = require("fs");
const text = fs.readFileSync("./data.txt", { encoding: "utf-8" });
const lines = text.split("\n").map((l) => l.trim());

function parseData(lines) {
    const directions = lines[0];
    const mapping = {};
    for (let i = 2; i < lines.length; i++) {
        const [point, rotations] = lines[i].split(" = ");
        const rotationsSplit = rotations.split(",");
        mapping[point] = {
            L: rotationsSplit[0].slice(1),
            R: rotationsSplit[1].slice(1, -1),
        };
    }
    return {
        directions: directions,
        mapping: mapping,
    };
}

function navigate(data) {
    let step = 0;
    let rotationIndex = 0;
    let currentPoint = "AAA";
    const { directions, mapping } = data;
    const directionsLen = directions.length;
    while (currentPoint !== "ZZZ") {
        const rotation = directions[rotationIndex];
        currentPoint = mapping[currentPoint][rotation];
        rotationIndex = (rotationIndex + 1) % directionsLen;
        step++;
    }
    return step;
}

function performStep(currentPoint, mapping, rotation) {
    return mapping[currentPoint][rotation];
}

function navigateMultiple(data) {
    let step = 0;
    let rotationIndex = 0;
    const { directions, mapping } = data;
    const points = Object.keys(mapping).filter((key) => key.endsWith("A"));
    const directionsLen = directions.length;
    const pointsLen = points.length;
    while (true) {
        const rotation = directions[rotationIndex];
        let endsWithZ = 0;
        for (let i = 0; i < pointsLen; i++) {
            const newPoint = performStep(points[i], mapping, rotation);
            if (newPoint.endsWith("Z")) {
                endsWithZ++;
            }
            points[i] = newPoint;
        }
        rotationIndex = (rotationIndex + 1) % directionsLen;
        step++;
        if (endsWithZ > 2) {
            console.log(endsWithZ);
        }
        if (endsWithZ === pointsLen) {
            break;
        }
    }
    return step;
}

function navigatePoint(start, directions, mapping) {
    let step = 0;
    let rotationIndex = 0;
    let currentPoint = start;
    const directionsLen = directions.length;
    while (!currentPoint.endsWith("Z")) {
        const rotation = directions[rotationIndex];
        currentPoint = mapping[currentPoint][rotation];
        rotationIndex = (rotationIndex + 1) % directionsLen;
        step++;
    }
    return step;
}

function navigateMultiple(data) {
    const { directions, mapping } = data;
    const points = Object.keys(mapping).filter((key) => key.endsWith("A"));
    const steps = points.map((p) => navigatePoint(p, directions, mapping));
    return steps;
}

function gcd(a, b) { 
    for (let temp = b; b !== 0;) { 
        b = a % b; 
        a = temp; 
        temp = b; 
    } 
    return a; 
} 

// https://www.geeksforgeeks.org/javascript-program-to-find-lcm-of-two-numbers/
function lcmFunction(a, b) { 
    const gcdValue = gcd(a, b); 
    return (a * b) / gcdValue; 
} 


function puzzle1(lines) {
    const data = parseData(lines);
    const steps = navigate(data);
    return steps;
}

function puzzle2(lines) {
    const data = parseData(lines);
    const steps = navigateMultiple(data);
    let result = lcmFunction(steps[0], steps[1]);
    for (let i = 2; i < steps.length; i++) {
        result = lcmFunction(result, steps[i])
    }
    const value = result;
    return value;
}

