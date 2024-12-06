const withContent = require('@randall-reilly/package-global/middleware/with-content');
const contentMetering = require('@parameter1/base-cms-marko-web-theme-monorail/middleware/content-metering');
const qf = require('@parameter1/base-cms-marko-web-theme-monorail/graphql/fragments/content-page');
const contact = require('@randall-reilly/package-global/templates/content/contact');
const { newsletterState, formatContentResponse } = require('@randall-reilly/package-global/middleware/newsletter-state');
const redirectToFn = require('@randall-reilly/package-global/utils/content-redirect-to-function');
const company = require('../templates/content/company');
const product = require('../templates/content/product');
const whitepaper = require('../templates/content/whitepaper');
const content = require('../templates/content');

module.exports = (app) => {
  const { site } = app.locals;

  // base on site config||USE_LINK_INJECTED_BODY to enable bcl
  const useLinkInjectedBody = site.get('useLinkInjectedBody');
  const queryFragment = qf.factory ? qf.factory({ useLinkInjectedBody }) : qf;

  const routesList = [
    {
      regex: '/*?contact/:id(\\d{8})*',
      template: contact,
      queryFragment,
    },
    {
      regex: '/*?company/:id(\\d{8})*',
      template: company,
      queryFragment,
    },
    {
      regex: '/*?product/:id(\\d{8})*',
      template: product,
      queryFragment,
    },
    {
      regex: '/*?whitepaper/:id(\\d{8})*',
      template: whitepaper,
      queryFragment,
    },
    {
      regex: '/*?/:id(\\d{8})/*|/:id(\\d{8})(/|$)',
      template: content,
      queryFragment,
      withContentMeter: true,
    },
  ];

  const cmConfig = site.getAsObject('contentMeter');

  // determin to use newsletterstate or contentMeter middleware
  routesList.forEach((route) => {
    if (route.withContentMeter && cmConfig.enabled) {
      app.get(
        route.regex,
        newsletterState({ setCookie: false }),
        contentMetering(cmConfig),
        withContent({
          template: route.template,
          queryFragment: route.queryFragment,
          formatResponse: formatContentResponse,
          redirectToFn,
        }),
      );
    } else {
      app.get(route.regex, newsletterState({ setCookie: false }), withContent({
        template: route.template,
        queryFragment: route.queryFragment,
        formatResponse: formatContentResponse,
        redirectToFn,
      }));
    }
  });
};
