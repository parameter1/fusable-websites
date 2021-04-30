const costCalculator = require('../templates/cost-calculator');

module.exports = (app) => {
  app.get('/cost-calculator', (_, res) => { res.marko(costCalculator); });
};
