const configureNativeX = require('@randall-reilly/package-global/config/native-x');

const config = configureNativeX();

config.enabled = true;

config
  .setAliasPlacements('default', [
    { name: 'default', id: '6000b714140b3d000104072b' },
    { name: 'partner-insights', id: '62c467631a8b460001156531' },
    { name: 'native', id: '64ee5a49a369f10001f139da' },
  ]);

module.exports = config;
