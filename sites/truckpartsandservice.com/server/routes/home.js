const { withWebsiteSection } = require('@parameter1/base-cms-marko-web/middleware');
const queryFragment = require('@randall-reilly/package-global/graphql/fragments/website-section-page');
const postIdHandler = require('@randall-reilly/package-global/middleware/post-id-handler');
const home = require('../templates/index');

module.exports = (app) => {
  app.get('/', postIdHandler({ sitePostDomain: 'wordpress.truckpartsandservice.posts' }), withWebsiteSection({
    aliasResolver: () => 'home',
    template: home,
    queryFragment,
  }));
};
