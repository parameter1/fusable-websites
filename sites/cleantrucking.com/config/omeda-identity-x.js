const configure = require('@randall-reilly/package-global/config/omeda-identity-x');
const omedaConfig = require('./omeda');
const idxConfig = require('./identity-x');

module.exports = configure({
  omedaConfig,
  idxConfig,
  // this is the generic "Randall Reilly - Parameter 1", version
  // should get update to site specific one when omeda creates it.
  rapidIdentProductId: 130,
  websiteBehaviorAttributeId: 669712,
});
