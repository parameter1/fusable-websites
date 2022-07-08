const AWS = require('aws-sdk'); // eslint-disable-line
const {
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  AWS_REGION,
  AWS_EXECUTION_ENV,
} = require('./env');

const kinesis = AWS_EXECUTION_ENV ? new AWS.Kinesis({ apiVersion: '2013-12-02' }) : new AWS.Kinesis({
  apiVersion: '2013-12-02',
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  region: AWS_REGION,
});

const lambda = AWS_EXECUTION_ENV ? new AWS.Lambda({ apiVersion: '2015-03-31' }) : new AWS.Lambda({
  apiVersion: '2015-03-31',
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  region: AWS_REGION,
});

const s3 = AWS_EXECUTION_ENV ? new AWS.S3({ apiVersion: '2006-03-01' }) : new AWS.S3({
  apiVersion: '2006-03-01',
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  region: AWS_REGION,
});

const sqs = AWS_EXECUTION_ENV ? new AWS.SQS({ apiVersion: '2012-11-05' }) : new AWS.SQS({
  apiVersion: '2012-11-05',
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  region: AWS_REGION,
});

module.exports = {
  kinesis,
  lambda,
  s3,
  sqs,
  AWS_EXECUTION_ENV,
};
