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
  useLinkInjectedBody: process.env.USE_LINK_INJECTED_BODY === 'true',
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
    cookieDomain: process.env.NODE_ENV === 'production' ? 'overdriveonline.com' : '',
  },
  logos: {
    navbar: {
      src: 'https://img.overdriveonline.com/files/base/randallreilly/all/image/static/ovd/ByFusableMediaBrandsLogos_OVD.svg?h=46&auto=format,compress',
      srcset: [
        'https://img.overdriveonline.com/files/base/randallreilly/all/image/static/ovd/ByFusableMediaBrandsLogos_OVD.svg?h=46&auto=format,compress&dpr=2 2x',
      ],
      width: 199,
      height: 35,
    },
    footer: {
      src: 'https://img.overdriveonline.com/files/base/randallreilly/all/image/static/ovd/ByFusableMediaBrandsLogos_OVD.svg?h=35&auto=format,compress',
      srcset: [
        'https://img.overdriveonline.com/files/base/randallreilly/all/image/static/ovd/ByFusableMediaBrandsLogos_OVD.svg?h=70&auto=format,compress 2x',
      ],
    },
    corporate: {
      alt: 'Randall-Reilly Logo',
      href: 'https://www.randallreilly.com',
      src: 'https://img.overdriveonline.com/files/base/randallreilly/all/image/static/Fusable_CMYK_Reversed-Horizontal.svg?w=200&auto=format,compress',
      srcset: [
        'https://img.overdriveonline.com/files/base/randallreilly/all/image/static/Fusable_CMYK_Reversed-Horizontal.svg?w=200&auto=format,compress&dpr=2 2x',
      ],
    },
  },
  tagline: 'The Voice of the American Trucker',
  socialMediaLinks: [
    { provider: 'facebook', href: 'https://www.facebook.com/OverdriveTrucking/', target: '_blank' },
    { provider: 'twitter', href: 'https://twitter.com/overdriveupdate', target: '_blank' },
    { provider: 'linkedin', href: 'https://www.linkedin.com/company/92929570/', target: '_blank' },
    { provider: 'youtube', href: 'https://www.youtube.com/channel/UCVb9_pwbvG99tK1apahFyIg?view_as=subscriber', target: '_blank' },
    { provider: 'instagram', href: 'https://www.instagram.com/overdriveonline/', target: '_blank' },
    { provider: 'tiktok', href: 'https://www.tiktok.com/@overdriveonline.com', target: '_blank' },
  ],
  podcastLinks: [
    { label: 'Apple Podcasts', href: 'https://podcasts.apple.com/us/podcast/overdrive-online/id736806291' },
    { label: 'Google Podcasts', href: 'https://podcasts.google.com/feed/aHR0cHM6Ly93d3cub3ZlcmRyaXZlb25saW5lLmNvbS9mZWVkL3BvZGNhc3Qv' },
    { label: 'Spotify', href: 'https://open.spotify.com/show/6P7SIZeenGgvAaaIm2SOAq' },
    { label: 'Soundcloud', href: 'https://soundcloud.com/overdriveradio' },
  ],
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
    containerId: 'GTM-NDC3FQX',
  },
  wufoo: {
    userName: 'randallreilly',
  },
  inquiry: {
    enabled: false,
    directSend: false,
    sendTo: 'support@parameter1.com',
    sendFrom: 'OverdriveOnline.com <noreply@parameter1.com>',
    logo: 'https://img.overdriveonline.com/files/base/randallreilly/all/image/static/ovd-logo-new.svg?h=35&auto=format,compress&bg=000000&pad=5',
    bgColor: '#000000',
  },
  sponsoredLabelLogos: {
    'Sponsored by RoadPro': {
      src: 'https://img.overdriveonline.com/files/base/randallreilly/all/image/static/road-pro-logo.png?auto=format&w=109&fit=crop',
      width: '109px',
    },
  },
  sponsoredSectionNameLogos: {
    gear: {
      src: 'https://img.overdriveonline.com/files/base/randallreilly/all/image/static/ovd/trucker-gear-logo.png?auto=format&w=275&fit=crop',
      width: '275px',
    },
  },
  setSearchSortFieldToScore: true,
};
