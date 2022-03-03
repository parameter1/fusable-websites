const { get } = require('@parameter1/base-cms-object-path');
const defaultValue = require('@parameter1/base-cms-marko-core/utils/default-value');

const { asyncRoute } = require('@parameter1/base-cms-utils');
const { content: loader } = require('@parameter1/base-cms-web-common/page-loaders');
const buildContentInput = require('@parameter1/base-cms-marko-web/utils/build-content-input');
const queryFragment = require('@randall-reilly/package-theme-monorail/graphql/fragments/content-meter');

const cookieName = 'contentMeter';
const now = new Date().getTime();
// @todo convert this to pull from site config to allow for overrides
const config = require('../config/content-meter');

async function shouldMeter(req) {
  const { apollo, params } = req;
  const { id } = params;
  const additionalInput = buildContentInput({ req });
  const content = await loader(apollo, { id, additionalInput, queryFragment });

  // @todo implement how the gate should be restricted
  // By type || By section || By primarySection
  // excludeContentTypes: Excludes content metering on page if type matches exclusions
  const excludeContentTypes = defaultValue(config.excludeContentTypes, []);
  if (excludeContentTypes.includes(content.type)) {
    return false;
  }
  // excludePrimarySectionIds: Excludes content metering on page that matches primarySection
  const excludePrimarySectionIds = defaultValue(config.excludePrimarySectionIds, []);
  if (excludePrimarySectionIds.includes(content.primarySection.id)) {
    return false;
  }
  // excludePrimarySectionAliass: Excludes content metering on page that matches primarySection
  const excludePrimarySectionAliass = defaultValue(config.excludePrimarySectionAliass, []);
  if (excludePrimarySectionAliass.includes(content.primarySection.alias)) {
    return false;
  }
  return true;
}

module.exports = () => asyncRoute(async (req, res, next) => {
  const { identityX, params } = req;
  const { id } = params;
  const idxObj = { isEnabled: true, requiredAccessLevelIds: [] };
  const contentAccess = await identityX.checkContentAccess(idxObj);
  const { isLoggedIn, requiresUserInput } = contentAccess;
  const olyEncId = get(req, 'query.oly_enc_id');

  if (olyEncId || (isLoggedIn && !requiresUserInput));

  else if (isLoggedIn && requiresUserInput && await shouldMeter(req)) {
    res.locals.contentMeterState = {
      isLoggedIn: true,
      requiresUserInput,
      displayGate: false,
    };
  } else if (config.enabled && await shouldMeter(req)) {
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
      ...config,
      views: valid.length,
      isLoggedIn: false,
      requiredUserInput: true,
      displayGate,
    };
    res.cookie(cookieName, JSON.stringify(valid), { maxAge: config.timeframe });
  }
  next();
});
