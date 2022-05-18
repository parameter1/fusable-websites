const navigation = require('./navigation');
const contentMeter = require('./content-meter');
const gam = require('./gam');
const omeda = require('./omeda');
const nativeX = require('./native-x');
const top250 = require('./top250');
const identityX = require('./identity-x');
const newsletter = require('./newsletter');
const search = require('./search');

module.exports = {
  navigation,
  contentMeter,
  gam,
  omeda,
  nativeX,
  identityX,
  idxNavItems: {
    enable: process.env.IDX_NAV_ENABLE || false,
  },
  newsletter,
  search,
  top250,
  company: 'Randall-Reilly, LLC',
  p1events: {
    tenant: 'randallreilly',
    enabled: true,
    cookieDomain: process.env.NODE_ENV === 'production' ? 'ccjdigital.com' : '',
  },
  logos: {
    navbar: {
      src: 'https://img.ccjdigital.com/files/base/randallreilly/all/image/static/ccj/ccj-logo-new.svg?h=45&auto=format,compress',
      srcset: [
        'https://img.ccjdigital.com/files/base/randallreilly/all/image/static/ccj/ccj-logo-new.svg?h=90&auto=format,compress 2x',
      ],
    },
    footer: {
      src: 'https://img.ccjdigital.com/files/base/randallreilly/all/image/static/ccj/ccj-logo-new.svg?h=60&auto=format,compress',
      srcset: [
        'https://img.ccjdigital.com/files/base/randallreilly/all/image/static/ccj/ccj-logo-new.svg?h=120&auto=format,compress 2x',
      ],
    },
    corporate: {
      alt: 'Randall-Reilly Logo',
      href: 'https://www.randallreilly.com',
      src: 'https://img.ccjdigital.com/files/base/randallreilly/all/image/static/rr-logo-new.svg?w=200&auto=format,compress',
      srcset: [
        'https://img.ccjdigital.com/files/base/randallreilly/all/image/static/rr-logo-new.svg?w=200&auto=format,compress&dpr=2 2x',
      ],
    },
  },
  socialMediaLinks: [
    { provider: 'facebook', href: 'https://www.facebook.com/CommercialCarrierJournal', target: '_blank' },
    { provider: 'twitter', href: 'https://twitter.com/CCJnow', target: '_blank' },
    { provider: 'linkedin', href: 'https://www.linkedin.com/company/commercial-carrier-journal/', target: '_blank' },
    { provider: 'youtube', href: 'https://www.youtube.com/user/CCJDigital', target: '_blank' },
  ],
  podcastLinks: [],
  gcse: {
    id: 'e121ab2d7edb3a172',
  },
  oneTrust: [
    { path: '/collection', id: 'c04235aa-e9e0-4ff9-b558-5e21aa892d20' },
    { path: '/termsandprivacy', id: 'd8f2d6c5-d9af-4d60-a93f-7441ca9ad94c' },
  ],
  gtm: {
    containerId: 'GTM-PHDPM24',
  },
  wufoo: {
    userName: 'randallreilly',
  },
  inquiry: {
    enabled: false,
    directSend: false,
    sendTo: 'support@parameter1.com',
    sendFrom: 'CCJDigital.com <noreply@parameter1.com>',
    logo: 'https://img.ccjdigital.com/files/base/randallreilly/all/image/static/ccj/ccj-logo-new.svg?h=45&auto=format,compress&bg=000000&pad=5',
    bgColor: '#000000',
  },
  setSearchSortFieldToScore: true,
};
