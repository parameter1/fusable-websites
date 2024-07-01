const configureNativeX = require('@randall-reilly/package-global/config/native-x');

const config = configureNativeX();

config.enabled = true;
config.domainName = 'www.cleantrucking.com';

config
  .setAliasPlacements('default', [
    { name: 'default', id: '5ff3320140cc3e000117533e' },
    { name: 'partner-insights', id: '650483cf4520d80001a8cda8' },
  ]);

module.exports = config;
