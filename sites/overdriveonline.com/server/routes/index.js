const rigdig = require('@randall-reilly/package-rigdig');
const home = require('./home');
const content = require('./content');
const websiteSections = require('./website-section');
const loadCalculator = require('./load-calculator');

module.exports = (app) => {
  // RigDig
  rigdig(app);

  // LoadCalculator
  loadCalculator(app)

  // Homepage
  home(app);

  // Content Pages
  content(app);

  // Website Sections
  websiteSections(app);
};
