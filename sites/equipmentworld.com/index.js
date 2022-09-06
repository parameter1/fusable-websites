const startServer = require('@randall-reilly/package-global/start-server');
const routes = require('./server/routes');
const siteConfig = require('./config/site');
const coreConfig = require('./config/core');

const { identityX } = siteConfig;
const { log } = console;

module.exports = startServer({
  rootDir: __dirname,
  coreConfig,
  siteConfig,
  routes,
  onStart: () => {
    // Automatically opt-in unverified users to CCJ newsletter when inputting email address
    identityX.addHook({
      name: 'onLoginLinkSent',
      fn: ({ req, user }) => req.$omedaRapidIdentify({
        email: user.email,
        deploymentTypeIds: [22],
        promoCode: 'EW_registration_meter',
      }),
    });
  },
}).then(() => log('Website started!')).catch(e => setImmediate(() => { throw e; }));
