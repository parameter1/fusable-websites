const configureNativeX = require('@randall-reilly/package-global/config/native-x');

const config = configureNativeX();

config.enabled = true;
config.publisherId = '5fd4fc5eb192ef0001845442';
config.domainName = 'www.hardworkingtrucks.com';

config
  .setAliasPlacements('default', [
    { name: 'default', id: '6000b714140b3d000104072b' },
    { name: 'partner-insights', id: '62c467631a8b460001156531' },
    { name: 'native', id: '64ee5a49a369f10001f139da' },
  ]);

module.exports = config;
