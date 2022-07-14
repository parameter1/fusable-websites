const configureNativeX = require('@randall-reilly/package-global/config/native-x');

const config = configureNativeX();

config.enabled = true;
config.publisherId = '5fd4fc5eb192ef0001845442';

config
  .setAliasPlacements('default', [
    { name: 'default', id: '6000b714140b3d000104072b' },
    { name: 'partner-insights', id: '62c467631a8b460001156531' },
  ]);

module.exports = config;
