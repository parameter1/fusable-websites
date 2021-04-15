const IdentityXConfiguration = require('@parameter1/base-cms-marko-web-identity-x/config');
const rapidOmedaIdentityX = require('@parameter1/base-cms-marko-web-omeda-identity-x/rapid-identify');
const { get } = require('@parameter1/base-cms-object-path');
const newrelic = require('newrelic');

const omedaConfig = require('./omeda');

module.exports = ({
  appId,
  apiToken = process.env.IDENTITYX_API_TOKEN,
  requiredServerFields,
} = {}) => {
  const config = new IdentityXConfiguration({
    appId,
    apiToken,
    requiredServerFields,
    onHookError: newrelic.noticeError.bind(newrelic),
  });
  config.addHook({
    name: 'onUserProfileUpdate',
    shouldAwait: false,
    fn: async ({ user, service, req }) => rapidOmedaIdentityX({
      brandKey: omedaConfig.brandKey,
      productId: get(omedaConfig, 'rapidIdentification.productId'),
      appUser: user,
      identityX: service,
      omedaGraphQL: req.$omeda,
    }),
  });
  return config;
};
