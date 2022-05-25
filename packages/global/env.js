const envalid = require('@parameter1/base-cms-env');

const { bool, str, url } = envalid;
const { validators: { nonemptystr } } = envalid;

const configs = {
  TENANT_KEY: nonemptystr({ desc: 'The BaseCMS tenant key to use.', default: 'randallreilly_all' }),

  NEW_RELIC_ENABLED: bool({ desc: 'Should the NewRelic APM instrumentation be enabled?', default: false }),
  NEW_RELIC_LICENSE_KEY: nonemptystr({ desc: 'The NewRelic APM license key', devDefault: '(unset)' }),

  // Service URLs
  GRAPHQL_URI: url({ desc: 'The BaseCMS GraphQL service URL.', default: 'https://graphql.virgon.base.parameter1.com' }),
  OEMBED_URI: url({ desc: 'The BaseCMS Oembed service URL.', default: 'https://oembed.virgon.base.parameter1.com' }),
  RSS_URI: url({ desc: 'The BaseCMS RSS service URL.', default: 'https://rss.virgon.base.parameter1.com' }),
  SITEMAPS_URI: url({ desc: 'The BaseCMS SITEMAPS service URL.', default: 'https://sitemaps.virgon.base.parameter1.com' }),
  OMEDA_GRAPHQL_URI: str({ desc: 'The P1 Omeda GraphQL service URL.', default: 'https://graphql.omeda.parameter1.com' }),
  IDENTITYX_GRAPHQL_URI: url({ desc: 'The IdentityX service URL.', default: 'https://identity-x.parameter1.com/graphql' }),
  BASE_BROWSE_GRAPHQL_URI: url({ desc: 'The Base Browse (search) service URL.', default: 'https://base-browse.virgon.base.parameter1.com/graphql' }),

  ENABLE_CONTENT_METER: bool({ desc: 'If the content meter should be enabled.', default: false }),
  IDX_NAV_ENABLE: bool({ desc: 'If the IdentityX nav items should be disabled.', default: false }),

  IDENTITYX_API_TOKEN: nonemptystr({ desc: 'The IdentityX service API key.', devDefault: '(unset)' }),
  RECAPTCHA_SITE_KEY: nonemptystr({ desc: 'An site key for sending recaptcha validation.', devDefault: '(unset)' }),
  RECAPTCHA_SECRET_KEY: nonemptystr({ desc: 'A secret key for sending recaptcha validation.', devDefault: '(unset)' }),
  RECAPTCHA_V3_SITE_KEY: nonemptystr({ desc: 'An site key for sending recaptcha validation.', devDefault: '(unset)' }),
  RECAPTCHA_V3_SECRET_KEY: nonemptystr({ desc: 'A secret key for sending recaptcha validation.', devDefault: '(unset)' }),
  SENDGRID_API_KEY: nonemptystr({ desc: 'An API key for sending inquiry notifications via SendGrid.', devDefault: '(unset)' }),

  OMEDA_CLIENT_KEY: nonemptystr({ desc: 'The Omeda client key.', devDefault: '(unset)' }),
  OMEDA_BRAND_KEY: nonemptystr({ desc: 'The Omeda brand key.', devDefault: '(unset)' }),
  OMEDA_APP_ID: nonemptystr({ desc: 'The Omeda application id.', devDefault: '(unset)' }),
  OMEDA_INPUT_ID: nonemptystr({ desc: 'The Omeda input id.', devDefault: '(unset)' }),
};

module.exports = { envalid, nonemptystr, configs };
