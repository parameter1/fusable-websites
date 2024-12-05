const newrelic = require('newrelic');
const { asyncRoute } = require('@parameter1/base-cms-utils');
const { startServer } = require('@parameter1/base-cms-marko-web');
const { set, get, getAsObject } = require('@parameter1/base-cms-object-path');
const loadInquiry = require('@parameter1/base-cms-marko-web-inquiry');
const htmlSitemapPagination = require('@parameter1/base-cms-marko-web-html-sitemap/middleware/paginated');
const omedaIdentityX = require('@parameter1/base-cms-marko-web-omeda-identity-x');
const omedaCookie = require('@parameter1/base-cms-marko-web-omeda/olytics/customer-cookie');
const fetch = require('node-fetch');
const MindfulMarkoWebService = require('@parameter1/base-cms-mindful/marko-web/middleware/service');

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
const hwtRedirectHandler = require('./middleware/hwt-redirect-handler');

const { error } = console;

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

      const { namespace } = getAsObject(options, 'siteConfig.mindful');
      app.use(MindfulMarkoWebService({ namespace }));

      // Use HWT redirect handler
      app.use((req, res, next) => hwtRedirectHandler({ req, res, next }));

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
      const i18n = (v) => v;
      set(app.locals, 'i18n', options.i18n || i18n);

      // Recaptcha
      set(app.locals, 'recaptcha', recaptcha);

      app.use(asyncRoute(async (req, res, next) => {
        try {
          const { GAM_TRACK_API_KEY } = process.env;
          if (!GAM_TRACK_API_KEY) return next();
          const cookieId = omedaCookie.parseFrom(req);
          const incomingId = omedaCookie.clean(req.query.oly_enc_id);
          const encryptedId = incomingId || cookieId;
          if (!encryptedId) return next();
          const { brandKey } = getAsObject(options, 'siteConfig.omeda');
          if (!brandKey) return next();

          const r = await fetch('https://api.gt.parameter1.dev', {
            method: 'POST',
            headers: { 'content-type': 'application/json', 'x-api-key': GAM_TRACK_API_KEY },
            body: JSON.stringify({
              action: 'encrypt',
              params: {
                identities: [{
                  provider: 'omeda',
                  tenant: brandKey,
                  entityType: 'customer',
                  id: encryptedId,
                  idType: 'encrypted',
                }],
              },
            }),
          });
          if (!r.ok) throw new Error('Bad fetch response');
          const { data } = await r.json();
          set(res.locals, 'gamTrackTargeting', data);
          return next();
        } catch (e) {
          // @todo log this, don't break the request.
          error('GAM TRACKER ERROR!', e);
          return next();
        }
      }));
    },
    onAsyncBlockError: (e) => newrelic.noticeError(e),

    redirectHandler,

    embeddedMediaHandlers: {
      oembed: oembedHandler,
    },
  });
};
