const { envalid, nonemptystr, configs } = require('@randall-reilly/package-global/env');

const { bool, cleanEnv, port } = envalid;

const env = cleanEnv(process.env, {
  // Spread global configs
  ...configs,

  // override with site customizations
  PORT: port({ desc: 'The internal port to run on.', default: 9906 }),
  EXPOSED_PORT: port({ desc: 'The external port to run on.', default: 9906 }),
  LIVERELOAD_PORT: port({ desc: 'The external live-reload port.', default: 19906 }),
  HOST: nonemptystr({ desc: 'The external hostname to use.', default: 'www-rr-ovd.dev.parameter1.com' }),
  SITE_ID: nonemptystr({ desc: 'The website identifier.', default: '5fce561dd28860bc33b823ce' }),
  ENABLE_CONTENT_METER: bool({ desc: 'If the content meter should be enabled.', default: true }),
  IDX_NAV_ENABLE: bool({ desc: 'If the IdentityX nav items should be disabled.', default: true }),
}, { strict: true });

// Set directly rather than bringing in dotenv library.
Object.keys(env).forEach((key) => { process.env[key] = env[key]; });

module.exports = env;
