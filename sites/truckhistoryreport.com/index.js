const startServer = require('@randall-reilly/package-global/start-server');
const coreConfig = require('@randall-reilly/package-overdrive/config/core');

const routes = require('./server/routes');
const siteConfig = require('./config/site');

const { log } = console;

module.exports = startServer({
  rootDir: __dirname,
  coreConfig,
  siteConfig,
  routes,
}).then(() => log('Website started!')).catch((e) => setImmediate(() => { throw e; }));
