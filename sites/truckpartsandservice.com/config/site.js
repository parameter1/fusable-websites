const contentMeter = require('./content-meter');
const gam = require('./gam');
const identityX = require('./identity-x');
const identityXOptInHooks = require('./identity-x-opt-in-hooks');
const nativeX = require('./native-x');
const navigation = require('./navigation');
const newsletter = require('./newsletter');
const omeda = require('./omeda');
const omedaIdentityX = require('./omeda-identity-x');
const search = require('./search');

module.exports = {
  // module configs
  contentMeter,
  gam,
  identityX,
  identityXOptInHooks,
  nativeX,
  navigation,
  newsletter,
  omeda,
  omedaIdentityX,
  search,
  // theme configs
  idxNavItems: {
    enable: process.env.IDX_NAV_ENABLE || false,
  },
  company: 'Randall-Reilly, LLC',
  p1events: {
    tenant: 'randallreilly',
    enabled: true,
    cookieDomain: process.env.NODE_ENV === 'production' ? 'truckpartsandservice.com' : '',
  },
  logos: {
    navbar: {
      src: 'https://img.truckpartsandservice.com/files/base/randallreilly/all/image/static/tps/tps-logo-new.svg?h=45&auto=format,compress',
      srcset: [
        'https://img.truckpartsandservice.com/files/base/randallreilly/all/image/static/tps/tps-logo-new.svg?h=45&auto=format,compress&dpr=2 2x',
      ],
      width: 57,
      height: 35,
    },
    footer: {
      src: 'https://img.truckpartsandservice.com/files/base/randallreilly/all/image/static/tps/tps-logo-new.svg?h=60&auto=format,compress',
      srcset: [
        'https://img.truckpartsandservice.com/files/base/randallreilly/all/image/static/tps/tps-logo-new.svg?h=60&auto=format,compress&dpr=2 2x',
      ],
    },
    corporate: {
      alt: 'Randall-Reilly Logo',
      href: 'https://www.randallreilly.com',
      src: 'https://img.truckpartsandservice.com/files/base/randallreilly/all/image/static/rr-logo-new.svg?w=200&auto=format,compress',
      srcset: [
        'https://img.truckpartsandservice.com/files/base/randallreilly/all/image/static/rr-logo-new.svg?w=200&auto=format,compress&dpr=2 2x',
      ],
    },
  },
  socialMediaLinks: [
    { provider: 'facebook', href: 'https://www.facebook.com/TrucksPartsService/', target: '_blank' },
    { provider: 'twitter', href: 'https://twitter.com/TPSdaily', target: '_blank' },
    { provider: 'linkedin', href: 'https://www.linkedin.com/groups/6559995/', target: '_blank' },
    { provider: 'youtube', href: 'https://www.youtube.com/channel/UCcBeotmXyiX_LLp7CYcjY_Q', target: '_blank' },
  ],
  gcse: {
    id: '281101e8295e963ba',
  },
  oneTrust: [
    { path: '/collection', id: 'c04235aa-e9e0-4ff9-b558-5e21aa892d20' },
    { path: '/termsandprivacy', id: 'd8f2d6c5-d9af-4d60-a93f-7441ca9ad94c' },
  ],
  gtm: {
    containerId: 'GTM-MWZ279J',
  },
  wufoo: {
    userName: 'randallreilly',
  },
  inquiry: {
    enabled: false,
    directSend: false,
    sendTo: 'support@parameter1.com',
    sendFrom: 'TruckPartsAndService.com <noreply@parameter1.com>',
    logo: 'https://img.truckpartsandservice.com/files/base/randallreilly/all/image/static/tps/tps-logo-new.svg?h=45&auto=format,compress&bg=000000&pad=5',
    bgColor: '#000000',
  },
  setSearchSortFieldToScore: true,
};
