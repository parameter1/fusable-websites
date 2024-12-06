const getAdvertisingPostAsNativeStory = require('@parameter1/base-cms-mindful/marko-web/middleware/get-advertising-post-as-native-story');
const advertisingPostTemplate = require('../templates/content/advertising-post');
const { newsletterState } = require('../middleware/newsletter-state');
const partnerInsights = require('../templates/partner-insights');

module.exports = (app) => {
  // Mindful|NativeX (Story rendering)
  getAdvertisingPostAsNativeStory(app, {
    route: '/sponsored/:section/:slug/:id',
    tenant: 'randallreilly',
    template: advertisingPostTemplate,
  });
  app.get('/partner-insights', newsletterState(), (_, res) => {
    res.marko(partnerInsights, {
      name: 'Partner Insights',
      alias: 'partner-insights',
    });
  });
};
