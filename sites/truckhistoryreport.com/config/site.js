const site = require('@randall-reilly/package-overdrive/config/site');
const omedaIdentityX = require('./omeda-identity-x');
const navigation = require('./navigation');

module.exports = {
  ...site,
  navigation,
  omedaIdentityX,
};
