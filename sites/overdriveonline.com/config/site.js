const site = require('@randall-reilly/package-overdrive/config/site');

module.exports = {
  ...site,
  showInbodyTHRPromo: process.env.SHOW_INBODY_THR_PROMO || false,
};
