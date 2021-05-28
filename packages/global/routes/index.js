const htmlSitemap = require('@parameter1/base-cms-marko-web-html-sitemap/routes');
const feed = require('./feed');
const identityX = require('./identity-x');
const nativeX = require('./native-x');
const printContent = require('./print-content');
const publicFiles = require('./public-files');
const redirects = require('./redirects');
const renderBlock = require('./render-block');
const staticPage = require('./static-page');
const taxonomy = require('./taxonomy');

module.exports = (app) => {
  // Feed
  feed(app);

  // IdentityX (user routing and app context)
  identityX(app);

  // NativeX (Story rendering)
  nativeX(app);

  // Shared Print Content
  printContent(app);

  // Shared Public Files (e.g. ads.txt)
  publicFiles(app);

  // Redirects
  redirects(app);

  // Remote component/block loader
  renderBlock(app);

  // Taxonomy pages (for handling redirects from old WP sites)
  taxonomy(app);

  // Static pages
  staticPage(app);

  // HTML Sitemap
  htmlSitemap(app);
};
