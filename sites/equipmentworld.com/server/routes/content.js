const withContent = require('@randall-reilly/package-global/middleware/with-content');
const contentMeter = require('@randall-reilly/package-global/middleware/content-meter');
const queryFragment = require('@parameter1/base-cms-marko-web-theme-monorail/graphql/fragments/content-page');
const contact = require('@randall-reilly/package-global/templates/content/contact');
const newsletterState = require('@randall-reilly/package-global/middleware/newsletter-state');
const company = require('../templates/content/company');
const deathByTrench = require('../templates/content/death-by-trench');
const product = require('../templates/content/product');
const whitepaper = require('../templates/content/whitepaper');
const content = require('../templates/content');

module.exports = (app) => {
  app.get('/death-by-trench/*?:id(\\d{8})*', newsletterState(), withContent({
    template: deathByTrench,
    queryFragment,
  }));

  app.get('/*?contact/:id(\\d{8})*', newsletterState(), withContent({
    template: contact,
    queryFragment,
  }));

  app.get('/*?company/:id(\\d{8})*', newsletterState(), withContent({
    template: company,
    queryFragment,
  }));

  app.get('/*?product/:id(\\d{8})*', newsletterState(), withContent({
    template: product,
    queryFragment,
  }));

  app.get('/*?whitepaper/:id(\\d{8})*', newsletterState(), withContent({
    template: whitepaper,
    queryFragment,
  }));

  app.get('/*?/:id(\\d{8})/*|/:id(\\d{8})(/|$)', newsletterState(), contentMeter(), withContent({
    template: content,
    queryFragment,
  }));
};
