const contentRedirectsMap = require('./redirect-maps/content-redirects-map');
const sectionRedirectsMap = require('./redirect-maps/section-redirects-map');

module.exports = ({ req, res, next }) => {
  // Check if the request is for content from HWT
  const host = req.get('host');
  if (host.match(/hardworkingtrucks\.com/) || host.match(/hwt\.dev\.parameter1\.com/)) {
    const [, id] = req.url.match(/\/(\d{8})/) || [];
    if (id && contentRedirectsMap.has(Number(id))) {
      return res.redirect(301, contentRedirectsMap.get(Number(id)));
    }
    const sectionMatcher = new RegExp(`/(${Array.from(sectionRedirectsMap.keys()).join('|')})$`);
    const [, alias] = req.path.match(sectionMatcher) || [];
    if (alias && sectionRedirectsMap.has(alias)) {
      return res.redirect(301, sectionRedirectsMap.get(alias));
    }
    return res.redirect(301, 'https://www.ccjdigital.com');
  }
  return next();
};
