import fs from "fs";

const filePath = "./large-data.xml";
const recordCount = 1000;

const stream = fs.createWriteStream(filePath);
stream.write("<data>\n");

for (let i = 1; i <= recordCount; i++) {
  const name = `User_${i}`;
  const email = `user${i}@example.com`;
  const date = i % 2 === 0 ? `2025-0${(i % 9) + 1}-15` : `2024-0${(i % 9) + 1}-20`;
  const amount = (Math.random() * 1000).toFixed(2);

  stream.write(
    `  <record>
    <id>${i}</id>
    <name>${name}</name>
    <email>${email}</email>
    <date>${date}</date>
    <amount>${amount}</amount>
  </record>\n`
  );
}

stream.write("</data>");
stream.end();

console.log(`✅ Generated ${recordCount} records in ${filePath}`);
