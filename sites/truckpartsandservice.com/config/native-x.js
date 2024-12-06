const configureNativeX = require('@randall-reilly/package-global/config/native-x');

const config = configureNativeX();

config.enabled = true;
config.publisherId = '5fd268221305250001368485';
config.domainName = 'www.truckpartsandservice.com';

config
  .setAliasPlacements('default', [
    { name: 'default', id: '6000b769140b3d0001040760' },
    { name: 'partner-insights', id: '62c467b25be2060001803cf1' },
  ]);

module.exports = config;
