const IdentityXConfiguration = require('@parameter1/base-cms-marko-web-identity-x/config');

module.exports = ({
  appId,
  apiToken = process.env.IDENTITYX_API_TOKEN,
  requiredServerFields,
} = {}) => new IdentityXConfiguration({
  appId,
  apiToken,
  requiredServerFields,
});
