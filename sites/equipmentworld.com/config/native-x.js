const configureNativeX = require('@randall-reilly/package-global/config/native-x');

const config = configureNativeX();

config.enabled = true;
config.publisherId = '5fd266f81305250001368440';
config.domainName = 'www.equipmentworld.com';

config
  .setAliasPlacements('default', [
    { name: 'default', id: '6000b672140b3d0001040608' },
    { name: 'partner-insights', id: '62bc4e2f1e84bc000139728d' },
    { name: 'native', id: '64ee59704520d80001c1e00a' },
  ]);

module.exports = config;
