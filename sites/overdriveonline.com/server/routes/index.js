const rigdig = require('@randall-reilly/package-rigdig');
const home = require('./home');
const content = require('./content');
const loadAnalyzer = require('./load-analyzer');
const websiteSections = require('./website-section');

module.exports = (app) => {
  // RigDig
  rigdig(app);

  // loadAnalyzer
  loadAnalyzer(app);

  // Homepage
  home(app);

  // Content Pages
  content(app);

  // loadAnalyzer
  loadAnalyzer(app);

  // Website Sections
  websiteSections(app);
};
