const { get } = require('@parameter1/base-cms-object-path');

const redirectToPrimarySite = new Set([
  15383937,
  15383951,
  15446875,
  15447477,
  15383970,
  15447484,
  15383974,
  15446925,
  15383928,
  15286428,
  15290865,
  15447268,
  15448422,
  15382537,
  15447749,
  15540920,
  15539758,
  15447412,
  15446925,
  15447668,
]);

module.exports = ({ content, requestingSiteId }) => {
  if (requestingSiteId !== get(content, 'primarySite.id') && redirectToPrimarySite.has(content.id)) {
    return get(content, 'siteContext.canonicalUrl');
  }
  return null;
};
