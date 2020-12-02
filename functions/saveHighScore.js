
require("dotenv").config();

const Airtable = require("airtable");

Airtable.configure({
  apiKey: process.env.AIRTABLE_API_KEY
});

const base = Airtable.base(process.env.AIRTABLE_BASE);
const table = base.table(process.env.AIRTABLE_TABLE);

exports.handler = async event => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({
        err: "That method is not allowed"
      })
    };
  }

  const { score, name } = JSON.parse(event.body);

  if (typeof score === "undefined" || !name) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        err: "Bad request"
      })
    };
  }

  try {
    const records = await table
      .select({
        sort: [{ field: "score", direction: "desc" }]
      })
      .firstPage();
    const formattedRecords = records.map(record => ({
      id: record.id,
      fields: record.fields
    }));

    const lowestRecord = formattedRecords[9];
    console.log(lowestRecord);
    if (
      typeof lowestRecord.fields.score === "undefined" ||
      score > lowestRecord.fields.score
    ) {
      const updatedRecord = {
        id: lowestRecord.id,
        fields: { name, score }
      };
      await table.update([updatedRecord]);
      console.log(updatedRecord);
      return {
        statusCode: 200,
        body: JSON.stringify(updatedRecord)
      };
    } else {
      return {
        statusCode: 200,
        body: JSON.stringify({})
      };
    }
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        err: "Failed to save in Airtable."
      })
    };
  }
};
