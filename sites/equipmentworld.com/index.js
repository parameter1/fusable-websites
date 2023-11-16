const startServer = require('@randall-reilly/package-global/start-server');
const routes = require('./server/routes');
const siteConfig = require('./config/site');
const coreConfig = require('./config/core');
const i18n = require('./config/i18n');

const { log } = console;

module.exports = startServer({
  rootDir: __dirname,
  coreConfig,
  siteConfig,
  routes,
  i18n: (v) => i18n[`${v}`.toLowerCase()] || v,
}).then(() => log('Website started!')).catch((e) => setImmediate(() => { throw e; }));
