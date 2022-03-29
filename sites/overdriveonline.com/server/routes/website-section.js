const { withWebsiteSection } = require('@parameter1/base-cms-marko-web/middleware');
const queryFragment = require('@randall-reilly/package-theme-monorail/graphql/fragments/website-section-page');
const newsletterState = require('@randall-reilly/package-global/middleware/newsletter-state');
const partnersInBusiness = require('../templates/website-section/partners-in-business');
const products = require('../templates/website-section/products');
const readerRigs = require('../templates/website-section/reader-rigs');
const rrSubmission = require('../templates/new-reader-rigs-submission');
const section = require('../templates/website-section');

module.exports = (app) => {
  app.get('/new-reader-rigs-submission', newsletterState(), (_, res) => { res.marko(rrSubmission); });
  app.get('/:alias(gear)', newsletterState(), withWebsiteSection({
    template: products,
    queryFragment,
  }));
  app.get('/:alias(partners-in-business)', newsletterState(), withWebsiteSection({
    template: partnersInBusiness,
    queryFragment,
  }));
  app.get('/:alias(reader-rigs)', newsletterState(), withWebsiteSection({
    template: readerRigs,
    queryFragment,
  }));
  app.get('/:alias([a-z0-9-/]+)', newsletterState(), withWebsiteSection({
    template: section,
    queryFragment,
  }));
};
