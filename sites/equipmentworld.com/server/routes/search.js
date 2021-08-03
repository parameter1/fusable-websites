const middleware = require('@parameter1/base-cms-marko-web-search/middleware');
const template = require('@randall-reilly/package-global/templates/search');
const search = require('@randall-reilly/package-global/templates/search-new');
const config = require('../../config/search');

module.exports = (app) => {
  app.get('/search', (_, res) => { res.marko(template); });
  app.get('/new-search', middleware({ config, template: search }));
};
