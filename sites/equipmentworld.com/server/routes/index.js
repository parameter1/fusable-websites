const EERouter = require('@randall-reilly/equipment-experts');
const home = require('./home');
const content = require('./content');
const dynamicPages = require('./dynamic-page');
const search = require('./search');
const staticPages = require('./static');
const websiteSections = require('./website-section');

module.exports = (app) => {
  // Homepage
  home(app);

  // Equipment Experts API
  const { parseEmbeddedMedia } = app.locals;
  app.use('/api/marketplace-articles', EERouter({ parseEmbeddedMedia, sectionAlias: 'equipment-experts' }));

  // Dynamic Pages
  dynamicPages(app);

  // Content Pages
  content(app);

  // Static Pages
  staticPages(app);

  // Search
  search(app);

  // Website Sections
  websiteSections(app);
};
