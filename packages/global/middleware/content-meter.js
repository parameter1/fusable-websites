const { get } = require('@parameter1/base-cms-object-path');
const { asyncRoute } = require('@parameter1/base-cms-utils');

const cookieName = 'contentMeter';
const now = new Date().getTime();
const config = require('../config/content-meter');

module.exports = () => asyncRoute(async (req, res, next) => {
  const { id } = req.params;

  const hasCookie = Boolean(get(req, `cookies.${cookieName}`));

  const value = (hasCookie) ? JSON.parse(get(req, `cookies.${cookieName}`)) : [];
  let valid = value.filter(pageView => pageView.viewed > now - config.timeframe);

  if (valid.find(v => v.id === id)) {
    valid = valid.map((pageview) => {
      const { id: viewId } = pageview;
      if (viewId === id) return { id, viewed: now };
      return pageview;
    });
  } else if (valid.length < config.viewLimit) {
    valid.push({ id, viewed: now });
  }

  const displayGate = (valid.length === config.viewLimit && !valid.find(v => v.id === id));

  res.locals.contentMeterState = {
    views: valid.length,
    viewLimit: config.viewLimit,
    displayGate,
  };
  res.cookie(cookieName, JSON.stringify(valid), { maxAge: config.timeframe });
  next();
});
