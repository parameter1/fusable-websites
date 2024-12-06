const distributorOfTheYearAward = require('../templates/static/distributor-of-the-year-award');
// const successfulDealerAward = require('../templates/static/successful-dealer-award-nomination');

module.exports = (app) => {
  app.get('/distributor-of-the-year-information', (_, res) => { res.marko(distributorOfTheYearAward); });
  app.get('/distributor-of-the-year', (_, res) => { res.redirect(301, '/distributor-of-the-year-archive'); });
  app.get('/successful-dealer-award', (_, res) => { res.redirect(301, '/successful-dealer-award-archive'); /* res.marko(successfulDealerAward); */ });
};
