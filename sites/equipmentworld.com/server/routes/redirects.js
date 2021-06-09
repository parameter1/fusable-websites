module.exports = (app) => {
  app.get('/:alias(default.asp)', (req, res) => {
    const { magid } = req.query;
    if (magid === '28') return res.redirect(301, '/');
    return res.redirect(301, '/');
  });
  app.get('/:alias(apps/news/articleeqw.asp)', (req, res) => {
    const { id } = req.query;
    if (id === '55641') return res.redirect(301, '/');
    if (id === '62860') return res.redirect(301, '/workforce/safety');
    return res.redirect(301, '/');
  });
  app.get('/:alias(index.php)', (req, res) => {
    const { s } = req.query;
    if (s === 'trench+collapse') res.redirect(301, '/workforce/safety');
    if (s === 'JLG') return res.redirect(301, '/14972756');
    if (s === 'AGC') return res.redirect(301, '/14972658');
    if (s === 'rental') return res.redirect(301, '/');
    return res.redirect(301, '/');
  });
};
