const { getAsObject } = require('@parameter1/base-cms-object-path');
const MarkoWebSearchConfig = require('@parameter1/base-cms-marko-web-search/config');
const middleware = require('@parameter1/base-cms-marko-web-search/middleware');
const newTemplate = require('../templates/search-new');
const template = require('../templates/search');

module.exports = (app, siteConfig) => {
  const {
    contentTypes = ['Article', 'Blog', 'Company', 'Podcast', 'Product', 'Video', 'Whitepaper'],
    assignedToWebsiteSectionIds,
  } = getAsObject(siteConfig, 'search');
  const config = new MarkoWebSearchConfig({
    resultsPerPage: { default: 18 },
    contentTypes,
    assignedToWebsiteSectionIds,
  });
  app.get('/search-new', middleware({ config, template: newTemplate }));
  app.get('/search', (_, res) => { res.marko(template); });
};
