const fs = require("fs");
const os = require("os");

/**
 *
 * @param {string} line
 * @returns
 */
function isCommand(line) {
    return line.startsWith("$");
}

function getDirSize(node) {
    return node.children.reduce((acc, node) => {
        if (node.type === "file") {
            acc += node.size;
        } else if (node.type === "dir") {
            acc += getDirSize(node);
        }
        return acc;
    }, 0);
}

// NOT OPTIMAL. Cache calculations, include subdirs if dir is < maxSize. Just lazy
function solve() {
    const maxSize = 100000;
    const content = fs.readFileSync("./data.txt", { encoding: "utf-8" });
    const lines = content.split(os.EOL);
    const tree = { name: "/", parent: null, children: [] };
    let currentNode = tree;
    currentNode.parent = tree;
    let index = 0;
    while (index < lines.length) {
        let line = lines[index];
        if (line.startsWith("$ cd")) {
            const path = line.substring(5);
            if (path === "..") {
                currentNode = currentNode.parent;
            } else if (path === "/") {
                currentNode = tree;
            } else {
                const node = {
                    name: path,
                    type: "dir",
                    children: [],
                    parent: currentNode,
                };
                currentNode.children.push(node);
                currentNode = node;
            }
            index++;
        } else if (line.startsWith("$ ls")) {
            index++;
            line = lines[index];
            while (line && !line.startsWith("$")) {
                const [first, second] = line.split(" ");
                if (first === "dir") {
                    currentNode.children.push({
                        name: second,
                        type: "dir",
                        children: [],
                        parent: currentNode,
                    });
                } else {
                    currentNode.children.push({
                        name: second,
                        type: "file",
                        size: Number(first),
                    });
                }
                index++;
                line = lines[index];
            }
        } else {
            throw new Error("Unknown command " + line);
        }
    }
    const stack = [tree];
    let total = 0;
    while (stack.length !== 0) {
        const node = stack.pop();
        const size = getDirSize(node);
        if (size <= maxSize) {
            total += size;
        }
        node.children.forEach((child) => {
            if (child.type === "dir") {
                stack.push(child);
            }
        });
    }
    return total;
}


function solve2() {
    const deviceSize = 70000000;
    const sizeRequired = 30000000;
    const content = fs.readFileSync("./data.txt", { encoding: "utf-8" });
    const lines = content.split(os.EOL);
    const tree = { name: "/", parent: null, children: [] };
    let currentNode = tree;
    currentNode.parent = tree;
    let index = 0;
    while (index < lines.length) {
        let line = lines[index];
        if (line.startsWith("$ cd")) {
            const path = line.substring(5);
            if (path === "..") {
                currentNode = currentNode.parent;
            } else if (path === "/") {
                currentNode = tree;
            } else {
                const node = {
                    name: path,
                    type: "dir",
                    children: [],
                    parent: currentNode,
                };
                currentNode.children.push(node);
                currentNode = node;
            }
            index++;
        } else if (line.startsWith("$ ls")) {
            index++;
            line = lines[index];
            while (line && !line.startsWith("$")) {
                const [first, second] = line.split(" ");
                if (first === "dir") {
                    currentNode.children.push({
                        name: second,
                        type: "dir",
                        children: [],
                        parent: currentNode,
                    });
                } else {
                    currentNode.children.push({
                        name: second,
                        type: "file",
                        size: Number(first),
                    });
                }
                index++;
                line = lines[index];
            }
        } else {
            throw new Error("Unknown command " + line);
        }
    }
    const stack = [tree];
    const total = getDirSize(tree);
    const unused = deviceSize - total;
    const toFree = sizeRequired - unused;
    let currentCandidateForDeletion = total;
    while (stack.length !== 0) {
        const node = stack.pop();
        const size = getDirSize(node);
        if (size >= toFree && size < currentCandidateForDeletion) {
            currentCandidateForDeletion = size;
        }
        node.children.forEach((child) => {
            if (child.type === "dir") {
                stack.push(child);
            }
        });
    }
    return currentCandidateForDeletion;
}


console.log(solve2());
