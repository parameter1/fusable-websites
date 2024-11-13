const configureNativeX = require('@randall-reilly/package-global/config/native-x');

const config = configureNativeX({ uri: 'https://delivery.mindfulcms.com/rr-talent/default/compat/native-website' });

config.enabled = true;
config.publisherId = '5fd267ec1305250001368472';
config.domainName = 'www.truckersnews.com';

config
  .setAliasPlacements('default', [
    { name: 'default', id: '670d4b6a22e180b2bbdcfe8b' },
    { name: 'partner-insights', id: '670d4b7e22e180b2bbdcfe8d' },
  ]);

module.exports = config;
