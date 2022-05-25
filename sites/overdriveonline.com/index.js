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
    // Automatically opt-in unverified users to OVD newsletter when inputting email address
    const deploymentTypeIds = [33];
    identityX.addHook({
      name: 'onLoginLinkSent',
      fn: ({ req, user }) => req.$omedaRapidIdentify({ email: user.email, deploymentTypeIds }),
    });
  },
}).then(() => log('Website started!')).catch(e => setImmediate(() => { throw e; }));
