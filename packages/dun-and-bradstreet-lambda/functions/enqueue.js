const { sqs } = require('../aws');

const contentType = 'text/plain';
const badRequest = body => ({
  statusCode: 400,
  body,
  headers: { 'content-type': contentType },
});

const parse = (data) => {
  try {
    return JSON.parse(data);
  } catch (e) {
    return null;
  }
};

exports.handler = async (event = {}) => {
  const { requestContext = {}, body, headers = {} } = event;
  const { identity = {} } = requestContext;

  if (requestContext.httpMethod === 'OPTIONS') return { statusCode: 200 };
  if (!body) return badRequest('No body was provided.');
  const payload = parse(body);
  if (!payload) return badRequest('Unable to parse JSON payload from data query parameter');

  const now = Date.now();

  const message = {
    ts: now,
    ip: identity.sourceIp,
    ua: identity.userAgent,
    origin: headers.origin,
    referer: headers.referer,
    payload,
  };

  await sqs.sendMessage({
    QueueUrl: 'https://sqs.us-east-2.amazonaws.com/598984531759/dun-and-bradstreet-to-process',
    MessageBody: JSON.stringify(message),
  }).promise();

  return {
    statusCode: 200,
    body: 'OK',
    headers: { 'content-type': contentType },
  };
};
