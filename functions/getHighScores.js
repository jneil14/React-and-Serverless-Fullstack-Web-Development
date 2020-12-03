const { table, getHighScores } = require("./utils/airtable");

exports.handler = async event => {
  try {
    const records = await getHighScores(true);
    console.log(records);
    return {
      statusCode: 200,
      body: JSON.stringify(records),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        err: "Failed to query from Airtable."
      })
    };
  }
};
