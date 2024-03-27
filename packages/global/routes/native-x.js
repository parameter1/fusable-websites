const withNativeXStory = require('@parameter1/base-cms-marko-web-native-x/middleware/with-story');
const { getAsObject } = require('@parameter1/base-cms-object-path');
const queryFragment = require('@parameter1/base-cms-marko-web-theme-monorail/graphql/fragments/native-x-story');
const { newsletterState } = require('../middleware/newsletter-state');
const template = require('../templates/content/native-x-story');
const partnerInsights = require('../templates/partner-insights');

module.exports = (app) => {
  const config = getAsObject(app, 'locals.nativeX');
  app.get('/sponsored/:section/:slug/:id', withNativeXStory({ config, template, queryFragment }));
  app.get('/partner-insights', newsletterState(), (_, res) => {
    res.marko(partnerInsights, {
      name: 'Partner Insights',
      alias: 'partner-insights',
    });
  });
};
