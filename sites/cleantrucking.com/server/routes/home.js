const { withWebsiteSection } = require('@parameter1/base-cms-marko-web/middleware');
const queryFragment = require('@parameter1/base-cms-marko-web-theme-monorail/graphql/fragments/website-section-page');
const postIdHandler = require('@randall-reilly/package-global/middleware/post-id-handler');
const { newsletterState } = require('@randall-reilly/package-global/middleware/newsletter-state');
const home = require('../templates/index');

module.exports = (app) => {
  app.get('/', postIdHandler(), newsletterState(), withWebsiteSection({
    aliasResolver: () => 'home',
    template: home,
    queryFragment,
  }));
};
