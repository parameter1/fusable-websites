const { withWebsiteSection } = require('@parameter1/base-cms-marko-web/middleware');
const queryFragment = require('@randall-reilly/package-global/graphql/fragments/website-section-page');
const customRigs = require('../templates/website-section/custom-rigs');
const life = require('../templates/website-section/life');
const partnersInBusiness = require('../templates/website-section/partners-in-business');
const products = require('../templates/website-section/products');
const readerRigs = require('../templates/website-section/reader-rigs');
const rrSubmission = require('../templates/new-reader-rigs-submission');
const section = require('../templates/website-section');

module.exports = (app) => {
  app.get('/new-reader-rigs-submission', (_, res) => { res.marko(rrSubmission); });
  app.get('/:alias(gear)', withWebsiteSection({
    template: products,
    queryFragment,
  }));
  app.get('/:alias(partners-in-business)', withWebsiteSection({
    template: partnersInBusiness,
    queryFragment,
  }));
  app.get('/:alias(reader-rigs)', withWebsiteSection({
    template: readerRigs,
    queryFragment,
  }));
  app.get('/:alias(life)', withWebsiteSection({
    template: life,
    queryFragment,
  }));
  app.get('/:alias(custom-rigs)', withWebsiteSection({
    template: customRigs,
    queryFragment,
  }));
  app.get('/:alias([a-z0-9-/]+)', withWebsiteSection({
    template: section,
    queryFragment,
  }));
};
