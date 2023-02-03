const oneTrustTemplate = require('../templates/static/one-trust');

module.exports = (app) => {
  const oneTrust = app.locals.site.getAsArray('oneTrust');

  oneTrust.forEach((item) => {
    if (item.path && item.oneTrustIds) {
      app.get(item.path, (_, res) => {
        res.marko(oneTrustTemplate, { oneTrustIds: item.oneTrustIds });
      });
    }
  });
};
