const newrelic = require('newrelic');
const { startServer } = require('@parameter1/base-cms-marko-web');
const { set, get, getAsObject } = require('@parameter1/base-cms-object-path');
const loadInquiry = require('@parameter1/base-cms-marko-web-inquiry');
const htmlSitemapPagination = require('@parameter1/base-cms-marko-web-html-sitemap/middleware/paginated');
const omedaIdentityX = require('@parameter1/base-cms-marko-web-omeda-identity-x');
const odentityCustomerUpsert = require('@parameter1/base-cms-marko-web-omeda/odentity/upsert-customer');

const document = require('./components/document');
const components = require('./components');
const fragments = require('./fragments');
const sharedRoutes = require('./routes');
const paginated = require('./middleware/paginated');
const newsletterState = require('./middleware/newsletter-state');
const redirectHandler = require('./redirect-handler');
const oembedHandler = require('./oembed-handler');
const omedaConfig = require('./config/omeda');
const idxRouteTemplates = require('./templates/user');
const recaptcha = require('./config/recaptcha');
const idxNavItems = require('./config/identity-x-nav');

let disableNewsletterInitiallyExpanded = false;
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

      // set exclusion for newsletter pushdown cookie logic and setting of pushdown being disabled.
      app.use((req, res, next) => {
        const excludedStartsWith = ['/__', '/user'];
        const exclusions = excludedStartsWith.filter(match => req.path.startsWith(match));
        if (exclusions.length) {
          disableNewsletterInitiallyExpanded = true;
          res.locals.disableNewsletterInitiallyExpanded = disableNewsletterInitiallyExpanded;
        }
        next();
      });

      if (!disableNewsletterInitiallyExpanded) {
        // Use newsletterState middleware
        app.use(newsletterState());
      }

      // Setup IdentityX + Omeda
      const idxConfig = getAsObject(options, 'siteConfig.identityX');
      omedaIdentityX(app, {
        brandKey: omedaConfig.brandKey,
        clientKey: omedaConfig.clientKey,
        appId: omedaConfig.appId,
        inputId: omedaConfig.inputId,
        rapidIdentProductId: get(omedaConfig, 'rapidIdentification.productId'),
        idxConfig,
        idxRouteTemplates,
      });
      idxNavItems({ site: app.locals.site });

      // Setup GAM.
      const gamConfig = get(options, 'siteConfig.gam');
      set(app.locals, 'GAM', gamConfig);

      // Setup NativeX.
      const nativeXConfig = get(options, 'siteConfig.nativeX');
      set(app.locals, 'nativeX', nativeXConfig);

      // Recaptcha
      set(app.locals, 'recaptcha', recaptcha);

      // Omeda customer upsert
      app.use(odentityCustomerUpsert({
        brandKey: omedaConfig.brandKey,
        onError: newrelic.noticeError.bind(newrelic),
      }));
    },
    onAsyncBlockError: e => newrelic.noticeError(e),

    redirectHandler,

    embeddedMediaHandlers: {
      oembed: oembedHandler,
    },
  });
};
