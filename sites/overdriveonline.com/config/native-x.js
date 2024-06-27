const configureNativeX = require('@randall-reilly/package-global/config/native-x');

const config = configureNativeX();

config.enabled = true;
config.publisherId = '5fc6b74897841c0001d5a007';
config.domainName = 'www.overdriveonline.com';

config
  .setAliasPlacements('default', [
    { name: 'featured-sponsored', id: '64ee5af06b776a0001dc5a75' },
    { name: 'partner-insights', id: '61f5aefe8ec1b500012be0f6' },
  ]);

module.exports = config;
