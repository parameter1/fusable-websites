const { get } = require('@parameter1/base-cms-object-path');
const site = require('@randall-reilly/package-overdrive/config/site');
const omedaIdentityX = require('./omeda-identity-x');
const navigation = require('./navigation');

const config = {
  ...site,
  navigation,
  omedaIdentityX,
};
// disable newsletter pushdown in header.
if (get(config, 'newsletter.pushdown')) {
  config.newsletter.pushdown.disabled = true;
}

module.exports = config;
