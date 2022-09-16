const { withWebsiteSection } = require('@parameter1/base-cms-marko-web/middleware');
const queryFragment = require('@parameter1/base-cms-marko-web-theme-monorail/graphql/fragments/website-section-page');
const { newsletterState } = require('@randall-reilly/package-global/middleware/newsletter-state');
const products = require('../templates/website-section/products');
const section = require('../templates/website-section');

const directoryIndex = require('../templates/website-section/directory');
const directorySection = require('../templates/website-section/directory/_alias');

const directoryAlias = 'aftermarket-truck-parts-suppliers';

module.exports = (app) => {
  app.get(`/:alias(${directoryAlias})`, newsletterState(), withWebsiteSection({
    template: directoryIndex,
    queryFragment,
  }));
  app.get(`/:alias(${directoryAlias}/[a-z0-9-/]+)`, newsletterState(), withWebsiteSection({
    template: directorySection,
    queryFragment,
  }));

  app.get('/:alias(products)', newsletterState(), withWebsiteSection({
    template: products,
    queryFragment,
  }));
  app.get('/:alias([a-z0-9-/]+)', newsletterState(), withWebsiteSection({
    template: section,
    queryFragment,
  }));
};
