const contentMeter = require('./content-meter');
const gam = require('./gam');
const identityX = require('./identity-x');
// const identityXOptInHooks = require('./identity-x-opt-in-hooks');
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
  useLinkInjectedBody: process.env.USE_LINK_INJECTED_BODY === 'true',
  identityX,
  // identityXOptInHooks,
  mindful: {
    namespace: 'rr/default',
  },
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
    cookieDomain: process.env.NODE_ENV === 'production' ? 'hardworkingtrucks.com' : '',
  },
  logos: {
    navbar: {
      src: 'https://img.hardworkingtrucks.com/files/base/randallreilly/all/image/static/hwt/ByFusableMediaBrandsLogos_HWT.svg?h=45&auto=format,compress',
      srcset: [
        'https://img.hardworkingtrucks.com/files/base/randallreilly/all/image/static/hwt/ByFusableMediaBrandsLogos_HWT.svg?h=45&auto=format,compress&dpr=2 2x',
      ],
      width: 94,
      height: 35,
    },
    footer: {
      src: 'https://img.hardworkingtrucks.com/files/base/randallreilly/all/image/static/hwt/ByFusableMediaBrandsLogos_HWT.svg?h=60&auto=format,compress',
      srcset: [
        'https://img.hardworkingtrucks.com/files/base/randallreilly/all/image/static/hwt/ByFusableMediaBrandsLogos_HWT.svg?h=60&auto=format,compress&dpr=2 2x',
      ],
    },
    corporate: {
      alt: 'Randall-Reilly Logo',
      href: 'https://www.randallreilly.com',
      src: 'https://img.hardworkingtrucks.com/files/base/randallreilly/all/image/static/Fusable_CMYK_Reversed-Horizontal.svg?w=200&auto=format,compress',
      srcset: [
        'https://img.hardworkingtrucks.com/files/base/randallreilly/all/image/static/Fusable_CMYK_Reversed-Horizontal.svg?w=200&auto=format,compress&dpr=2 2x',
      ],
    },
  },
  socialMediaLinks: [
    { provider: 'facebook', href: 'https://www.facebook.com/hardworkingtrucks/', target: '_blank' },
    { provider: 'twitter', href: 'https://twitter.com/workingtrucks', target: '_blank' },
    { provider: 'linkedin', href: 'https://www.linkedin.com/showcase/hard-working-trucks-partner-solutions/', target: '_blank' },
    { provider: 'youtube', href: 'https://www.youtube.com/user/hardworkingtrucks', target: '_blank' },
  ],
  gcse: {
    id: '14c37f5dc982aa830',
  },
  oneTrust: [
    { path: '/collection', oneTrustIds: ['c04235aa-e9e0-4ff9-b558-5e21aa892d20'] },
    {
      path: '/termsandprivacy',
      oneTrustIds: [
        '0e533e95-c4d0-415f-9f16-a9f2e3840ff8',
        'd6a774b4-bf5c-46a8-b8b9-0b12da49ef4b',
      ],
    },
  ],
  gtm: {
    containerId: 'GTM-KN35FTZ',
  },
  wufoo: {
    userName: 'randallreilly',
  },
  inquiry: {
    enabled: false,
    directSend: false,
    sendTo: 'support@parameter1.com',
    sendFrom: 'HardWorkingTrucks.com <noreply@parameter1.com>',
    logo: 'https://img.hardworkingtrucks.com/files/base/randallreilly/all/image/static/hwt/hwt-logo-new.svg?h=45&auto=format,compress&bg=000000&pad=5',
    bgColor: '#000000',
  },
};
