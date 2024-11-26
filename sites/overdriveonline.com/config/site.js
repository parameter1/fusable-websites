const site = require('@randall-reilly/package-overdrive/config/site');

module.exports = {
  ...site,
  showInbodyTHRPromo: (process.env.SHOW_INBODY_THR_PROMO === 'true') || false,
  showInbodyLAPromo: (process.env.SHOW_INBODY_LOAD_ANALYZER_PROMO === 'true') || false,
  useLinkInjectedBody: process.env.USE_LINK_INJECTED_BODY === 'true',
};
