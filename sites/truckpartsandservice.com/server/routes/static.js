const distributorOfTheYearAward = require('../templates/static/distributor-of-the-year-award');
const sucessfulDealerAwardSubmission = require('../templates/static/sucessful-dealer-award-submission');

module.exports = (app) => {
  app.get('/distributor-of-the-year-award', (_, res) => { res.marko(distributorOfTheYearAward); });
  app.get('/successful-dealer-award-submission', (_, res) => { res.marko(sucessfulDealerAwardSubmission); });
};
