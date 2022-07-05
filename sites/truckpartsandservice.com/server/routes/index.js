const home = require('./home');
const content = require('./content');
const dynamicPages = require('./dynamic-page');
const websiteSections = require('./website-section');
// const staticPages = require('./static');

module.exports = (app) => {
  // Homepage
  home(app);

  // Dynamic Pages
  dynamicPages(app);

  // Content Pages
  content(app);

  // Static Pages
  // staticPages(app);

  // Website Sections
  websiteSections(app);
};
