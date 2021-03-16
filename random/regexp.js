const testStr =
  "this.readState('cool') ? this.readState('cool1') : this.readState('cool2')";
const regex = /this.readState\((.+?)\)/g;
let str = testStr;
let matches;
let output = [];
let i = 0;
while ((matches = regex.exec(testStr))) {
  console.log(matches);
  const s = testStr.slice(i, matches.index + i);
  i = matches.index + i + 16 + matches[1].length;
  console.log(s);
  const c = `data[${matches[1]}]`;
  output.push(c);
}

console.log(output);
