const configureNativeX = require('@randall-reilly/package-global/config/native-x');

const config = configureNativeX();

config.enabled = true;

config.publisherId = '5fc6b74897841c0001d5a007';

config
  .setAliasPlacements('default', [
    { name: 'default', id: '5ff3320140cc3e000117533e' },
    { name: 'partner-insights', id: '62c467871e84bc00016036b7' },
  ]);

module.exports = config;
