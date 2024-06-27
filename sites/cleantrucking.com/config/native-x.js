const configureNativeX = require('@randall-reilly/package-global/config/native-x');

const config = configureNativeX();

config.enabled = true;
config.domainName = 'www.cleantrucking.com';

config
  .setAliasPlacements('default', [
    { name: 'featured-sponsored', id: '650483b4a369f10001d83979' },
    { name: 'partner-insights', id: '650483cf4520d80001a8cda8' },
  ]);

module.exports = config;
