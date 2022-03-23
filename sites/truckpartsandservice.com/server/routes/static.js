const distributorOfTheYearAward = require('../templates/static/distributor-of-the-year-award');
const successfulDealerAwardNomination = require('../templates/static/successful-dealer-award-nomination');

module.exports = (app) => {
  app.get('/distributor-of-the-year', (_, res) => { res.marko(distributorOfTheYearAward); });
  app.get('/successful-dealer-award', (_, res) => { res.marko(successfulDealerAwardNomination); });
};
