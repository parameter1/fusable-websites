const configureNativeX = require('@randall-reilly/package-global/config/native-x');

const config = configureNativeX();

config.enabled = true;
config.domainName = 'www.cleantrucking.com';

config
  .setAliasPlacements('default', [
    { name: 'default', id: '650483b4a369f10001d83979' },
    { name: 'partner-insights', id: '650483cf4520d80001a8cda8' },
    { name: 'native', id: '650483db4520d80001a8cf07' },
  ]);

module.exports = config;
