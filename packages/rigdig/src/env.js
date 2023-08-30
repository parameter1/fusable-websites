const { cleanEnv, str } = require('envalid');

module.exports = cleanEnv(process.env, {
  RIGDIG_PASSWORD: str({ desc: 'The RigDigBI service account password.' }),
  RIGDIG_USERNAME: str({ desc: 'The RigDigBI service account username.' }),
  SENDGRID_API_KEY: str({ desc: 'An API key for sending inquiry notifications via SendGrid.' }),
  SENDGRID_DEV_TO: str({ desc: 'An email address to send development submissions to.', default: 'support@parameter1.com' }),
});
