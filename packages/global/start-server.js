const newrelic = require('newrelic');
const { startServer } = require('@parameter1/base-cms-marko-web');
const { set, get } = require('@parameter1/base-cms-object-path');
const baseBrowse = require('@randall-reilly/base-browse/middleware');
const omedaGraphQL = require('@parameter1/omeda-graphql-client-express');
const htmlSitemapPagination = require('@parameter1/base-cms-marko-web-html-sitemap/middleware/paginated');

const pkg = require('./package.json');
const document = require('./components/document');
const components = require('./components');
const fragments = require('./fragments');
const sharedRoutes = require('./routes');
const paginated = require('./middleware/paginated');
const newsletterState = require('./middleware/newsletter-state');
const algolia = require('./middleware/algolia');
const redirectHandler = require('./redirect-handler');
const oembedHandler = require('./oembed-handler');
const omedaConfig = require('./config/omeda');

const { env } = process;

const routes = siteRoutes => (app) => {
  // Shared/global routes (all sites)
  sharedRoutes(app);
  // Load site routes
  siteRoutes(app);
};

module.exports = (options = {}) => {
  const { onStart } = options;
  const googleNewsInput = {
    days: 7,
    includeContentTypes: ['Article'],
    excludeLabels: ['Sponsored', 'Sponsored by RoadPro'],
    ...options.googleNewsInput,
  };
  return startServer({
    ...options,
    routes: routes(options.routes),
    document: options.document || document,
    components: options.components || components,
    fragments: options.fragments || fragments,
    sitemapsHeaders: {
      'x-google-news-input': JSON.stringify(googleNewsInput),
      ...(options.googleNewsPublicationName, { 'x-google-news-publication-name': options.googleNewsPublicationName }),
    },
    onStart: async (app) => {
      if (typeof onStart === 'function') await onStart(app);
      app.set('trust proxy', 'loopback, linklocal, uniquelocal');

      // Use Algolia client/index middleware
      // Will be available on `req.$algolia` and `res.locals.$algolia`
      app.use(algolia({
        appId: env.ALGOLIA_APP_ID,
        apiKey: env.ALGOLIA_API_KEY,
        defaultIndex: env.ALGOLIA_DEFAULT_INDEX,
      }));

      // Use "Base Browse" GraphQL middleware
      // Will be available on `req.$baseBrowse` and `res.locals.$baseBrowse`
      app.use(baseBrowse({
        uri: env.BASE_BROWSE_GRAPHQL_URI,
        tenantKey: env.TENANT_KEY,
        config: { name: pkg.name, version: pkg.version },
      }));

      // Use paginated middleware
      app.use(paginated());

      // Use paginated middleware
      app.use(htmlSitemapPagination());

      // Use newsletterState middleware
      app.use(newsletterState());

      // Use Omeda middleware
      app.use(omedaGraphQL({
        uri: 'https://graphql.omeda.parameter1.com/',
        brandKey: omedaConfig.brandKey,
        appId: omedaConfig.appId,
        inputId: omedaConfig.inputId,
      }));

      // Setup GAM.
      const gamConfig = get(options, 'siteConfig.gam');
      set(app.locals, 'GAM', gamConfig);

      // Setup NativeX.
      const nativeXConfig = get(options, 'siteConfig.nativeX');
      set(app.locals, 'nativeX', nativeXConfig);

      // Setup IdentityX.
      const identityXConfig = get(options, 'siteConfig.identityX');
      set(app.locals, 'identityX', identityXConfig);
    },
    onAsyncBlockError: e => newrelic.noticeError(e),

    redirectHandler,

    embeddedMediaHandlers: {
      oembed: oembedHandler,
    },
  });
};
