const distributorOfTheYearAward = require('../templates/static/distributor-of-the-year-award');
const sucessfulDealerAwardNomination = require('../templates/static/sucessful-dealer-award-nomination');

module.exports = (app) => {
  app.get('/distributor-of-the-year-award', (_, res) => { res.marko(distributorOfTheYearAward); });
  app.get('/successful-dealer-award-nomination', (_, res) => { res.marko(sucessfulDealerAwardNomination); });
};
