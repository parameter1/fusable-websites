module.exports = (app) => {
  app.get('/:alias(default.asp)', (req, res) => {
    const { magid } = req.query;
    if (parseInt(magid, 10) === 28) res.redirect(301, '/');
    res.redirect(301, '/');
  });
  app.get('/:alias(/apps/news/articleeqw.asp)', (req, res) => {
    const { id } = req.query;
    if (parseInt(id, 10) === 55641) res.redirect(301, '/');
    if (parseInt(id, 10) === 62860) res.redirect(301, '/workforce/safety');
    res.redirect(301, '/');
  });
  app.get('/:alias(/index.php)', (req, res) => {
    const { s } = req.query;
    if (s === 'JLG') res.redirect(301, '/14972756');
    if (s === 'AGC') res.redirect(301, '/14972658');
    if (s === 'trench+collapse') res.redirect(301, '/workforce/safety');
    if (s === 'rental') res.redirect(301, '/');
    res.redirect(301, '/');
  });
};
