import fs from "fs";
import XmlStream from "xml-stream";
import { format as csvFormat } from "fast-csv";

const inputPath = "./large-data.xml";
const outputPath = "./filtered-data.csv";

const readStream = fs.createReadStream(inputPath);
const xml = new XmlStream(readStream);
const writeStream = fs.createWriteStream(outputPath);

const csvStream = csvFormat({ headers: true });
csvStream.pipe(writeStream);

let count = 0;

xml.on("endElement: record", (node) => {
  const date = node.date;
  if (new Date(date) >= new Date("2025-01-01")) {
    csvStream.write({
      ID: node.id,
      Name: node.name,
      Date: node.date,
    });
    count++;
  }

  if (count % 1000 === 0 && count > 0) {
    console.log(`Processed ${count} records so far...`);
  }
});

xml.on("end", () => {
  csvStream.end();
  console.log(`✅ Parsing complete. ${count} records written to ${outputPath}`);
});

xml.on("error", (err) => {
  console.error("❌ Error while parsing XML:", err);
});
