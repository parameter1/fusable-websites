const loadCalculator = require('@randall-reilly/package-global/templates/static/load-calculator/index');
const loadAnalyzer = require('@randall-reilly/package-global/templates/static/load-calculator/load-analyzer');

const { get } = require('@parameter1/base-cms-object-path');

module.exports = (app) => {
  app.get('/load-calculator', (_, res) => {
    res.marko(loadCalculator);
  });
  app.get('/load-calculator/submit', (req, res) => {
    const hasCookie = Boolean(get(req, 'cookies.loadCalculator'));
    const { payload } = hasCookie ? JSON.parse(get(req, 'cookies.loadCalculator')) : { payload: {} };
    res.marko(loadAnalyzer,
      payload,
    );
  });
};
