const rigdig = require('@randall-reilly/package-rigdig');
const home = require('./home');

module.exports = (app) => {
  // RigDig
  rigdig(app);

  // Homepage
  home(app);
};
