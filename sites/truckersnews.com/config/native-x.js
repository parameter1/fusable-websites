const configureNativeX = require('@randall-reilly/package-global/config/native-x');

const config = configureNativeX();

config.enabled = true;
config.publisherId = '5fd267ec1305250001368472';
config.domainName = 'www.truckersnews.com';

config
  .setAliasPlacements('default', [
    { name: 'default', id: process.env.NATIVEX_DEFAULT_ID || '6000b7460ea4830001340b96' },
    { name: 'partner-insights', id: process.env.NATIVEX_DEFAULT_ID || '62c467cc1a8b460001156843' },
  ]);

module.exports = config;
