const configure = require('@randall-reilly/package-global/config/omeda-identity-x');
const omedaConfig = require('@randall-reilly/package-overdrive/config/omeda');
const idxConfig = require('@randall-reilly/package-overdrive/config/identity-x');

module.exports = configure({
  omedaConfig,
  idxConfig,
  rapidIdentProductId: 19,
  websiteBehaviorAttributeId: 669636,
});
