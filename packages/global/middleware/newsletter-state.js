const parser = require('ua-parser-js');
const defaultValue = require('@parameter1/base-cms-marko-core/utils/default-value');
const { get } = require('@parameter1/base-cms-object-path');

const cookieName = 'enlPrompted';

const newsletterState = ({ setCookie = true } = {}) => (req, res, next) => {
  // account for site level enabling of initially expanded
  const newsletterConfig = req.app.locals.site.getAsObject('newsletter');
  const { device } = parser(req.headers['user-agent']);
  const disableMobileCBIE = defaultValue(newsletterConfig.pushdown.disableMobileCBIE, false);
  const canBeExpandOnMobile = disableMobileCBIE !== false || (!device || device.type !== 'mobile');
  const siteConfigCBIE = defaultValue(newsletterConfig.pushdown.canBeInitiallyExpanded, true);
  const hasCookie = Boolean(get(req, `cookies.${cookieName}`));
  const utmMedium = get(req, 'query.utm_medium');
  const olyEncId = get(req, 'query.oly_enc_id');
  const disabled = get(req, 'query.newsletterDisabled');
  const fromEmail = utmMedium === 'email' || olyEncId || false;
  const canBeInitiallyExpanded = siteConfigCBIE && !(
    canBeExpandOnMobile
    || hasCookie
    || fromEmail
    || disabled
  );
  const initiallyExpanded = (setCookie === true) && canBeInitiallyExpanded;

  // Expire in 14 days (2yr if already signed up)
  const days = fromEmail ? 365 * 2 : 14;
  const maxAge = days * 24 * 60 * 60 * 1000;

  if (initiallyExpanded) {
    res.cookie(cookieName, true, { maxAge });
  }

  res.locals.newsletterState = {
    hasCookie,
    fromEmail,
    disabled,
    initiallyExpanded,
    // set this for other middlewares to know it can be set later
    // if formatContentResponse conditions are met
    canBeInitiallyExpanded,
    cookie: { name: cookieName, maxAge },
  };
  next();
};

const formatContentResponse = ({ res, content }) => {
  if (!res.locals.newsletterState) return;
  const {
    initiallyExpanded,
    canBeInitiallyExpanded,
    hasCookie,
    fromEmail,
    disabled,
    cookie,
  } = res.locals.newsletterState;

  if (get(content, 'userRegistration.isCurrentlyRequired') === true) {
    res.locals.newsletterState.initiallyExpanded = false;
  } else if (
    canBeInitiallyExpanded
    && (!initiallyExpanded && !hasCookie && !disabled && !fromEmail)
  ) {
    res.cookie(cookie.name, true, { maxAge: cookie.maxAge });
    res.locals.newsletterState.initiallyExpanded = true;
  }
};

module.exports = {
  newsletterState,
  formatContentResponse,
};
