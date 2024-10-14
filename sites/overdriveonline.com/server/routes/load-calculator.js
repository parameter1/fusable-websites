const loadCalculator = require('@randall-reilly/package-global/templates/static/load-calculator/index');
const loadAnalyzer = require('@randall-reilly/package-global/templates/static/load-calculator/load-analyzer');

const { get } = require('@parameter1/base-cms-object-path');

module.exports = (app) => {
  app.get('/load-calculator/submit', (req, res) => {
    const hasCookie = Boolean(get(req, 'cookies.loadCalculator'));
    const { payload } = hasCookie ? JSON.parse(get(req, 'cookies.loadCalculator')) : { payload: {} };
    res.marko(
      loadAnalyzer,
      payload,
    );
  });

  app.get('/load-calculator', (req, res) => {
    // if reset present clear load cookie
    if (req.query && Boolean(req.query.reset) === true) {
      res.clearCookie('loadCalculator', 0);
    }
    res.marko(loadCalculator);
  });
};
