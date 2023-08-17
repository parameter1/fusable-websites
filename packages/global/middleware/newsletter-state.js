const parser = require('ua-parser-js');
const defaultValue = require('@parameter1/base-cms-marko-core/utils/default-value');
const { get } = require('@parameter1/base-cms-object-path');

const cookieName = 'enlPrompted';
const positions = ['pushdown', 'inbody'];

const newsletterState = ({ setCookie = true } = {}) => (req, res, next) => {
  // account for site level enabling of initially expanded
  const newsletterConfig = req.app.locals.site.getAsObject('newsletter');
  const { device } = parser(req.headers['user-agent']);
  // config and device check to see if we should do ab testing
  const enableABTesting = defaultValue(newsletterConfig.enableABTesting && device && device.type === 'mobile', false);
  const disableMobileCBIE = defaultValue(newsletterConfig.pushdown.disableMobileCBIE, false);
  const disableExpandOnMobile = disableMobileCBIE && (device && device.type === 'mobile');
  const siteConfigCBIE = defaultValue(newsletterConfig.pushdown.canBeInitiallyExpanded, true);
  const hasCookie = Boolean(get(req, `cookies.${cookieName}`));
  const hasPositionCookie = Boolean(get(req, `cookies.${cookieName}Position`));
  const position = (hasPositionCookie && positions.includes(get(req, `cookies.${cookieName}Position`)))
    ? get(req, `cookies.${cookieName}Position`)
    : positions[(Math.floor(Math.random() * positions.length))];
  const utmMedium = get(req, 'query.utm_medium');
  const olyEncId = get(req, 'query.oly_enc_id');
  const disabled = get(req, 'query.newsletterDisabled');
  const fromEmail = utmMedium === 'email' || olyEncId || false;

  // both checks are using hasCookie vs hasCookie & hasPositioinCookie because the enlPrompted
  // cookie should still tell the injection when to inject, once per 2 weeks or 2 years
  const canBeInitiallyInjected = (
    enableABTesting
    && position === 'inbody'
    && !(
      hasCookie
      || fromEmail
      || disabled
    )
  );
  const canBeInitiallyExpanded = !canBeInitiallyInjected && siteConfigCBIE && !(
    disableExpandOnMobile
    || hasCookie
    || fromEmail
    || disabled
  );
  const initiallyInjected = setCookie === true && canBeInitiallyInjected;
  const initiallyExpanded = setCookie === true && canBeInitiallyExpanded;

  // Expire in 14 days (2yr if already signed up)
  const days = fromEmail ? 365 * 2 : 14;
  const maxAge = days * 24 * 60 * 60 * 1000;
  const positionMaxAge = maxAge * 10;

  if (initiallyExpanded || initiallyInjected) {
    res.cookie(cookieName, true, { maxAge });
    res.cookie(`${cookieName}Position`, position, { maxAge: positionMaxAge });
  }

  res.locals.newsletterState = {
    hasCookie,
    fromEmail,
    disabled,
    initiallyExpanded,
    initiallyInjected,
    enableABTesting,
    // set this for other middlewares to know it can be set later
    // if formatContentResponse conditions are met
    canBeInitiallyExpanded,
    canBeInitiallyInjected,
    cookie: { name: cookieName, maxAge },
    positionCookie: { name: `${cookieName}Position`, value: position, maxAge: positionMaxAge },
  };
  next();
};

const formatContentResponse = ({ res, content }) => {
  if (!res.locals.newsletterState) return;
  const {
    initiallyExpanded,
    canBeInitiallyExpanded,
    initiallyInjected,
    canBeInitiallyInjected,
    hasCookie,
    fromEmail,
    disabled,
    enableABTesting,
    cookie,
    positionCookie,
  } = res.locals.newsletterState;

  if (get(content, 'userRegistration.isCurrentlyRequired') === true) {
    res.locals.newsletterState.initiallyExpanded = false;
    res.locals.newsletterState.initiallyinjected = false;
  } else if (
    // both checks are using hasCookie vs hasCookie & hasPositioinCookie because the enlPrompted
    // cookie should still tell the injection when to inject, once per 2 weeks or 2 years
    (
      canBeInitiallyExpanded
      && (!initiallyExpanded && !hasCookie && !disabled && !fromEmail)
    ) || (
      canBeInitiallyInjected
      && (!initiallyInjected && !hasCookie && !disabled && !fromEmail)
    )
  ) {
    res.cookie(cookie.name, true, { maxAge: cookie.maxAge });
    if (enableABTesting) {
      res.cookie(positionCookie.name, positionCookie.value, { maxAge: positionCookie.maxAge });
    }

    res.locals.newsletterState.initiallyExpanded = !canBeInitiallyInjected;
    res.locals.newsletterState.initiallyInjected = canBeInitiallyInjected;
  }
};

module.exports = {
  newsletterState,
  formatContentResponse,
};
