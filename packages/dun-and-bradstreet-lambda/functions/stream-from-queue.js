const { kinesis } = require('../aws');

const { log } = console;

exports.handler = async (event = {}) => {
  const records = event.Records || [];
  log(`Streaming ${records.length} event message(s)...`);

  const { FailedRecordCount, Records } = await kinesis.putRecords({
    StreamName: 'dun-and-bradstreet',
    Records: records.map((record, index) => {
      const doc = JSON.parse(record.body);
      const message = { ...doc, tsNoMS: Math.floor(doc.ts / 1000) };
      return {
        Data: JSON.stringify(message),
        PartitionKey: `partitionKey${index}`,
      };
    }),
  }).promise();

  if (FailedRecordCount) {
    log(Records);
    throw new Error('Encountered errors while streaming events.');
  }
};
