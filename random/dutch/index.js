const CsvReadableStream = require("csv-reader");
const fs = require("fs");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

const chapter = 9;

/**
 *
 * @param {string} line
 */
function parseTranslation(line) {
    const meanings = line.split(",");
    let lastMeaning = "";
    let reminder = "";
    const transaltions = [];
    for (const meaning of meanings) {
        const line = meaning.trim();
        if (line.match(/^\d+$/)) {
            transaltions.push({
                translation: lastMeaning,
                paragraph: parseInt(line, 10),
            });
            continue;
        }
        const match = line.match(/^([\w\s\/()]+)\s(\d+)$/i);
        if (!match) {
            reminder += `${line}, `;
            continue;
        }
        const num = Number.parseInt(match[2]);
        const translation = reminder + match[1].trim();
        lastMeaning = translation;
        reminder = "";
        transaltions.push({
            translation: translation.trim(),
            paragraph: num,
        });
    }
    return transaltions;
}

async function main() {
    const inputStream = fs.createReadStream("./csv1.csv", "utf-8");
    const words = [];
    const csvWriter = createCsvWriter({
        path: `./words-${chapter}.csv`,
        header: ["eng", "nl"],
    });

    inputStream
        .pipe(
            new CsvReadableStream({
                parseNumbers: true,
                parseBooleans: true,
                trim: true,
            }),
        )
        .on("data", function (row) {
            if (row.length !== 2) {
                console.error(`Unexpected row length ${row.length}`);
                process.exit(1);
            }
            let [dutch, eng] = row;
            const meanings = parseTranslation(eng);
            meanings.forEach((meaning) => {
                if (meaning.paragraph === chapter) {
                    words.push({
                        eng: meaning.translation,
                        nl: dutch.trim(),
                    });
                }
            });
            // for (const line of eng.split(",")) {
            //     const regex = new RegExp(
            //         `^([\\w\\s\\/()]+)\\s(${chapter})$`,
            //         "i",
            //     );
            //     const match = line.match(regex);
            //     if (!match) {
            //         continue;
            //     }
            //     const num = Number.parseInt(match[2]);
            //     if (num !== chapter) {
            //         continue;
            //     }
            //     const translation = match[1];
            //     words.push({
            //         eng: translation.trim(),
            //         nl: dutch.trim(),
            //     });
            // }
        })
        .on("end", function () {
            console.log("No more rows!");
            csvWriter.writeRecords(words);
        });
}

main();
