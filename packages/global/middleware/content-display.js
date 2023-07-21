const { get } = require('@parameter1/base-cms-object-path');
const { asyncRoute } = require('@parameter1/base-cms-utils');

module.exports = () => asyncRoute(async (req, res, next) => {
  const {
    cookies,
  } = req;
  const validOpts = ['relatedContent', 'ad'];
  const contentDisplayType = get(cookies, 'contentDisplayType');
  if (!contentDisplayType && !validOpts.includes(validOpts)) {
    const display = validOpts[(Math.floor(Math.random() * validOpts.length))];
    // 30 days
    res.cookie('contentDisplayType', display, { maxAge: 30 * 24 * 60 * 60 * 1000 });
  }
  res.locals.contentDisplayType = contentDisplayType;
  next();
});
