const configureNativeX = require('@randall-reilly/package-global/config/native-x');

const config = configureNativeX();

config.enabled = true;

config
  .setAliasPlacements('default', [
    { name: 'default', id: '6000b672140b3d0001040608' },
    { name: 'partner-insights', id: '62bc4e2f1e84bc000139728d' },
  ]);

module.exports = config;
