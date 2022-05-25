const { envalid, nonemptystr, configs } = require('@randall-reilly/package-global/env');

const { cleanEnv, port } = envalid;

const env = cleanEnv(process.env, {
  // Spread global configs
  ...configs,

  // override with site customizations
  PORT: port({ desc: 'The internal port to run on.', default: 9905 }),
  EXPOSED_PORT: port({ desc: 'The external port to run on.', default: 9905 }),
  LIVERELOAD_PORT: port({ desc: 'The external live-reload port.', default: 19905 }),
  HOST: nonemptystr({ desc: 'The external hostname to use.', default: 'www-rr-hwt.dev.parameter1.com' }),
  SITE_ID: nonemptystr({ desc: 'The website identifier.', default: '5fce557bd28860bc33b8140d' }),
}, { strict: true });

// Set directly rather than bringing in dotenv library.
Object.keys(env).forEach((key) => { process.env[key] = env[key]; });

module.exports = env;
