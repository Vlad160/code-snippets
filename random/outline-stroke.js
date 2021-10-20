const fs = require("fs");
const outlineStroke = require("svg-outline-stroke");

const files = ["speaker-on", "spekear-off"];

files.forEach((file) =>
  fs.readFile(`./${file}.svg`, (err, data) => {
    if (err) throw err;
    outlineStroke(data).then((outlined) => {
      fs.writeFile(`./oultined-${file}.svg`, outlined, (err) => {
        if (err) throw err;
        console.log("yup, outlined!");
      });
    });
  })
);
