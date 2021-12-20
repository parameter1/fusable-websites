const { withWebsiteSection } = require('@parameter1/base-cms-marko-web/middleware');
const queryFragment = require('@randall-reilly/package-theme-monorail/graphql/fragments/website-section-page');
const config = require('../../config/top250');
const template = require('../templates/website-section/top250');
const guide = require('../templates/website-section/top250/guide');

module.exports = (app) => {
  const { rootAlias = 'ccj-top-250' } = config;
  app.get(`/:alias(${rootAlias})`, withWebsiteSection({ template, queryFragment }));

  Object.keys(config.guides).forEach((guideAlias) => {
    app.get(`/:alias(${rootAlias})/${guideAlias}`, withWebsiteSection({
      template: guide,
      queryFragment,
      redirectOnPathMismatch: false,
    }));
  });
};
