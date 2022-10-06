const newrelic = require('newrelic');
const { startServer } = require('@parameter1/base-cms-marko-web');
const { set, get, getAsObject } = require('@parameter1/base-cms-object-path');
const loadInquiry = require('@parameter1/base-cms-marko-web-inquiry');
const htmlSitemapPagination = require('@parameter1/base-cms-marko-web-html-sitemap/middleware/paginated');
const omedaIdentityX = require('@parameter1/base-cms-marko-web-omeda-identity-x');
const { getOmedaCustomerRecord } = require('@parameter1/base-cms-marko-web-omeda-identity-x/omeda-data');

const document = require('./components/document');
const components = require('./components');
const fragments = require('./fragments');
const sharedRoutes = require('./routes');
const paginated = require('./middleware/paginated');
const redirectHandler = require('./redirect-handler');
const oembedHandler = require('./oembed-handler');
const idxRouteTemplates = require('./templates/user');
const recaptcha = require('./config/recaptcha');
const idxNavItems = require('./config/identity-x-nav');

const routes = (siteRoutes, siteConfig) => (app) => {
  // Handle submissions on /__inquiry
  loadInquiry(app);
  // Shared/global routes (all sites)
  sharedRoutes(app, siteConfig);
  // Load site routes
  siteRoutes(app);
};

module.exports = (options = {}) => {
  const { onStart } = options;
  const googleNewsInput = {
    days: 7,
    includeContentTypes: ['Article'],
    excludeLabels: ['Sponsored', 'Sponsored by RoadPro'],
  };
  return startServer({
    ...options,
    routes: routes(options.routes, options.siteConfig),
    document: options.document || document,
    components: options.components || components,
    fragments: options.fragments || fragments,
    sitemapsHeaders: {
      'x-google-news-input': JSON.stringify(googleNewsInput),
    },
    onStart: async (app) => {
      if (typeof onStart === 'function') await onStart(app);
      app.set('trust proxy', 'loopback, linklocal, uniquelocal');

      // Use paginated middleware
      app.use(paginated());

      // Use paginated middleware
      app.use(htmlSitemapPagination());

      // Setup IdentityX + Omeda
      const omedaIdentityXConfig = getAsObject(options, 'siteConfig.omedaIdentityX');
      omedaIdentityX(app, { ...omedaIdentityXConfig, idxRouteTemplates });
      idxNavItems({ site: app.locals.site });

      // Setup GAM.
      const gamConfig = get(options, 'siteConfig.gam');
      set(app.locals, 'GAM', gamConfig);

      // Setup NativeX.
      const nativeXConfig = get(options, 'siteConfig.nativeX');
      set(app.locals, 'nativeX', nativeXConfig);

      // i18n
      const i18n = v => v;
      set(app.locals, 'i18n', options.i18n || i18n);

      // Recaptcha
      set(app.locals, 'recaptcha', recaptcha);

      const { identityXOptinHooks } = options.siteConfig;
      if (identityXOptinHooks) {
        const { identityX, omeda } = options.siteConfig;
        Object.entries(identityXOptinHooks).forEach(([name, obj]) => {
          const { productIds, promoCode } = obj;
          // Automatically opt-in unsubscribed users to a given array of products on given idXHooks
          if (identityX && productIds && productIds.length) {
            identityX.addHook({
              name,
              fn: async ({ req, user }) => {
                // Get the encriptedCustomerId that matches the omeda brandKey
                const encryptedCustomerId = user.externalIds.filter(({
                  identifier,
                  namespace,
                }) => identifier.type === 'encrypted'
                && namespace.provider === 'omeda'
                && namespace.tenant === omeda.brandKey)[0].identifier.value;
                // Retrive the omeda customer
                const omedaCustomer = await getOmedaCustomerRecord({
                  omedaGraphQLClient: req.$omedaGraphQLClient,
                  encryptedCustomerId,
                });
                // Get the current user subscriptions
                const { subscriptions } = omedaCustomer;
                // For each autoOptinProduct check if they have a subscription.
                // Sign the user up if they do not
                const newSubscriptions = productIds.filter(
                  id => subscriptions.some(({ product }) => product.deploymentTypeId === id)
                );
                if (newSubscriptions.length) {
                  req.$omedaRapidIdentify({
                    email: user.email,
                    deploymentTypeIds: newSubscriptions,
                    promoCode,
                  });
                }
              },
            });
          }
        });
      }
    },
    onAsyncBlockError: e => newrelic.noticeError(e),

    redirectHandler,

    embeddedMediaHandlers: {
      oembed: oembedHandler,
    },
  });
};
