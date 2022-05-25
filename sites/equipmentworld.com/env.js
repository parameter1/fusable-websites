const { envalid, nonemptystr, configs } = require('@randall-reilly/package-global/env');

const { url, cleanEnv, port } = envalid;

const env = cleanEnv(process.env, {
  // Spread global configs
  ...configs,

  // override with site customizations
  PORT: port({ desc: 'The internal port to run on.', default: 9901 }),
  EXPOSED_PORT: port({ desc: 'The external port to run on.', default: 9901 }),
  LIVERELOAD_PORT: port({ desc: 'The external live-reload port.', default: 19901 }),
  HOST: nonemptystr({ desc: 'The external hostname to use.', default: 'www-rr-eqw.dev.parameter1.com' }),
  SITE_ID: nonemptystr({ desc: 'The website identifier.', default: '5fce562fd28860bc33b826d6' }),
  EQUIPMENT_EXPERTS_GRAPHQL_URI: url({ desc: 'The Equipment Experts service URL.', default: 'https://equipment-experts.virgon.base.parameter1.com/graphql' }),
}, { strict: true });

// Set directly rather than bringing in dotenv library.
Object.keys(env).forEach((key) => { process.env[key] = env[key]; });

module.exports = env;
