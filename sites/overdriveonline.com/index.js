const startServer = require('@randall-reilly/package-global/start-server');
const coreConfig = require('@randall-reilly/package-overdrive/config/core');

const routes = require('./server/routes');
const siteConfig = require('./config/site');
const i18n = require('./config/i18n');

const { log } = console;

module.exports = startServer({
  rootDir: __dirname,
  coreConfig,
  siteConfig,
  routes,
  i18n: (v) => i18n[`${v}`.toLowerCase()] || v,
}).then(() => log('Website started!')).catch((e) => setImmediate(() => { throw e; }));
