const IdentityX = require('@parameter1/base-cms-marko-web-identity-x');
const { get } = require('@parameter1/base-cms-object-path');
const rapidIdentify = require('@parameter1/base-cms-marko-web-omeda-identity-x/routes/rapid-identify');
const stripOlyticsParam = require('@parameter1/base-cms-marko-web-omeda-identity-x/middleware/strip-olytics-param');
const omedaConfig = require('../config/omeda');
const authenticate = require('../templates/user/authenticate');
const login = require('../templates/user/login');
const logout = require('../templates/user/logout');
const register = require('../templates/user/register');
const profile = require('../templates/user/profile');

module.exports = (app, siteConfig) => {
  const { identityX: config } = siteConfig;
  IdentityX(app, config);

  app.get(config.getEndpointFor('authenticate'), (_, res) => {
    res.marko(authenticate);
  });

  app.get(config.getEndpointFor('login'), (_, res) => {
    res.marko(login);
  });

  app.get(config.getEndpointFor('logout'), (_, res) => {
    res.marko(logout);
  });

  app.get(config.getEndpointFor('register'), (_, res) => {
    res.marko(register);
  });

  app.get(config.getEndpointFor('profile'), (_, res) => {
    res.marko(profile);
  });

  // Strip `oly_enc_id` when IdentityX user is logged-in.
  app.use(stripOlyticsParam());
  app.use('/__idx/omeda-rapid-ident', rapidIdentify({
    brandKey: omedaConfig.brandKey,
    productId: get(omedaConfig, 'rapidIdentification.productId'),
  }));
};
