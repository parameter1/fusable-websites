const { withWebsiteSection } = require('@parameter1/base-cms-marko-web/middleware');
const queryFragment = require('@randall-reilly/package-theme-monorail/graphql/fragments/website-section-page');
const newsletterState = require('@randall-reilly/package-global/middleware/newsletter-state');
const products = require('../templates/website-section/products');
const deathByTrench = require('../templates/website-section/death-by-trench');
const safetyWatch = require('../templates/website-section/safety-watch');
const section = require('../templates/website-section');

const cotyIndex = require('../templates/website-section/contractor-of-the-year');
const cotyNominate = require('../templates/website-section/contractor-of-the-year/nominate-a-contractor');
const cotyGallery = require('../templates/website-section/contractor-of-the-year/photo-gallery');
const cotyStories = require('../templates/website-section/contractor-of-the-year/success-stories');

const coty = [
  { alias: 'contractor-of-the-year', template: cotyIndex },
  {
    alias: 'contractor-of-the-year/nominate-a-contractor',
    template: cotyNominate,
    aliasResolver: () => 'contractor-of-the-year',
    redirectOnPathMismatch: false,
  },
  {
    alias: 'contractor-of-the-year/photo-gallery',
    template: cotyGallery,
    aliasResolver: () => 'contractor-of-the-year',
    redirectOnPathMismatch: false,
  },
  { alias: 'contractor-of-the-year/success-stories', template: cotyStories },
];

module.exports = (app) => {
  coty.forEach(({ alias, template, ...rest }) => {
    app.get(`/:alias(${alias})`, newsletterState(), withWebsiteSection({
      template,
      queryFragment,
      ...rest,
    }));
  });

  app.get('/:alias(death-by-trench)', newsletterState(), withWebsiteSection({
    template: deathByTrench,
    queryFragment,
  }));
  app.get('/:alias(products)', newsletterState(), withWebsiteSection({
    template: products,
    queryFragment,
  }));
  app.get('/:alias(safety-watch)', newsletterState(), withWebsiteSection({
    template: safetyWatch,
    queryFragment,
  }));
  app.get('/:alias(safety-watch/[a-z0-9-/]+)', newsletterState(), withWebsiteSection({
    template: safetyWatch,
    queryFragment,
  }));
  app.get('/:alias([a-z0-9-/]+)', newsletterState(), withWebsiteSection({
    template: section,
    queryFragment,
  }));
};
