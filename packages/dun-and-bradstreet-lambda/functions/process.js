const { cleanEnv, str } = require('envalid');
const { createGunzip } = require('zlib');
const split2 = require('split2');
const each = require('async/each');
const MongoDBClient = require('@parameter1/mongodb/client');
const { filterUri } = require('@parameter1/mongodb/utils');
const { s3, AWS_EXECUTION_ENV } = require('../aws');

const { MONGO_URL } = cleanEnv(process.env, {
  MONGO_URL: str({ desc: 'This MongoDB URL to connect to.' }),
});

const mongodb = new MongoDBClient({ url: MONGO_URL });

const { log } = console;

const getProfileMS = (start) => {
  const [secs, ns] = process.hrtime(start);
  return (secs * 1000) + (ns / 1000000);
};

exports.handler = async (event = {}, context = {}) => {
  context.callbackWaitsForEmptyEventLoop = false; // eslint-disable-line
  log('Connecting to MongoDB...');
  const conn = await mongodb.connect();
  log(`MongoDB connected: ${filterUri(conn)}`);

  const records = event.Records || [];
  log(`Processing ${records.length} event files(s)...`);

  // load file streams from S3
  const streams = await Promise.all(records.map(async (record) => {
    const { name: bucket } = record.s3.bucket;
    const { key, size } = record.s3.object;
    log(`Loading ${(new Intl.NumberFormat('en-US')).format(size)} byte file stream for ${bucket}/${key}`);
    return s3.getObject({ Bucket: bucket, Key: key }).createReadStream();
  }));

  const streamStart = process.hrtime();
  log('Processing JSON lines from file...');
  const ops = [];
  await each(streams, async (stream) => {
    await new Promise((resolve, reject) => {
      stream.pipe(createGunzip()).pipe(split2(JSON.parse))
        .on('end', resolve)
        .on('error', reject)
        .on('data', (doc) => {
          const date = new Date(doc.ts);
          ops.push({ insertOne: { document: { ...doc, date } } });
        });
    });
  });
  log(`File processing complete in ${getProfileMS(streamStart)}ms`);
  if (!ops.length) throw new Error('Unable to find any records in the file.');

  log('Writing bulk data to database...');
  const collection = await mongodb.collection({ dbName: 'dun-and-brandstreet', name: 'events' });
  await collection.bulkWrite(ops);
  log('Bulk write complete.');
  if (!AWS_EXECUTION_ENV) await mongodb.close();
};
