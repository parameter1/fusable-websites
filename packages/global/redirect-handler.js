const slug = require('slug');

const getSizedImageRedirect = ({ from }) => {
  const matches = /^\/wp-content\/uploads\/.+(-([0-9]+)x([0-9]+))\.[a-z]+$/i.exec(from);
  if (matches && matches[1]) {
    const w = matches[2];
    const h = matches[3];
    const to = `${from.replace(matches[1], '')}?w=${w}&h=${h}&fit=crop&auto=format`;
    return { to };
  }
  return null;
};

const getFileRedirect = ({ from, app }) => {
  const { config, tenantKey } = app.locals;
  const matches = /^\/wp-content\/uploads\/sites\/\d+\/(.+)/.exec(from);
  if (!matches || !matches[1]) return null;

  // extract `2019/11/TLC_Attachments_combined3.pdf`
  // from `/wp-content/uploads/sites/5/2019/11/TLC_Attachments_combined3.pdf`
  // and convert to the migrated files folder for the current site
  const assetHost = config.website('assetHost');
  const siteKey = slug(config.website('shortName', config.website('name')));
  const [account, group] = tenantKey.split('_');
  const path = `files/base/${account}/${group}/migrated-files/${siteKey}`;
  const to = `https://${assetHost}/${path}/${matches[1]}`;
  return { to };
};

const getSiteRedirect = ({ from, req }) => {
  if (from === '/default.asp') {
    // Also covers ?magid=28
    return { to: '/' };
  }

  if (from === '/apps/news/articleeqw.asp') {
    const { id } = req.query;
    if (id === '62860') return { to: '/workforce/safety' };
    // Also covers ?id=55641
    return { to: '/' };
  }

  if (from === '/index.php') {
    const { s } = req.query;
    if (s === 'JLG') return { to: '/14972756' };
    if (s === 'AGC') return { to: '/14972658' };
    if (s === 'trench collapse') return { to: '/workforce/safety' };
    // Also covers ?s=rental
    return { to: '/' };
  }

  return null;
};

module.exports = ({ from, app, req }) => {
  const siteRedirect = getSiteRedirect({ from, req });
  if (siteRedirect) return siteRedirect;
  const sizedImageRedirect = getSizedImageRedirect({ from });
  if (sizedImageRedirect) return sizedImageRedirect;
  return getFileRedirect({ from, app });
};
