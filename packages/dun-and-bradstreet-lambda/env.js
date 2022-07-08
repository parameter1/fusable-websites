const { cleanEnv, str } = require('envalid');

module.exports = cleanEnv(process.env, {
  // when executing in lambda, these values will be provided at runtime
  AWS_ACCESS_KEY_ID: str({ desc: 'This will be provided by the lambda runtime.' }),
  AWS_EXECUTION_ENV: str({ desc: 'This will be provided by the lambda runtime.', default: '' }),
  AWS_REGION: str({ desc: 'The AWS region. This will be provided by the lambda runtime.', default: 'us-east-2' }),
  AWS_SECRET_ACCESS_KEY: str({ desc: 'This will be provided by the lambda runtime.' }),
});
