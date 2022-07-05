const configureNativeX = require('@randall-reilly/package-global/config/native-x');

const config = configureNativeX();

config.enabled = true;

config
  .setAliasPlacements('default', [
    { name: 'default', id: '6000b7460ea4830001340b96' },
    { name: 'partner-insights', id: '62c467cc1a8b460001156843' },
  ]);

module.exports = config;
