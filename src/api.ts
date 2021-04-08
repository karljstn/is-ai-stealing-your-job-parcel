const { SiteClient } = require("datocms-client");
const client = new SiteClient("60b0b1619a87e99a0280ed9a2c7c9a");

export async function getRecords() {
  const records = await client.items.all();
  console.log(records);
}

export async function createRecord() {
  const record = await client.items.create({
    itemType: "655772", // model ID
    average: "1.0",
  });
  console.log(record);
}
