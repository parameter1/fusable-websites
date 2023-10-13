const privacyPolicy = require('./privacy-policy');
const oneTrust = require('./one-trust');

const topics = {
  primary: [
    { href: '/battery-electric', label: 'Battery Electric' },
    { href: '/hydrogen', label: 'Hydrogen' },
    { href: '/alt-fuels', label: 'Alt Fuels' },
    { href: '/sales-support', label: 'Sales & Support' },
    { href: '/infrastructure', label: 'Infrastructure' },
    { href: '/funding', label: 'Funding' },
  ],
  expanded: [
    { href: '/maintenance', label: 'Maintenance' },
    { href: '/survey-report', label: 'Survey Report' },
    { href: '/videos', label: 'Videos' },
    { href: '/test-drives', label: 'Test Drives' },
    { href: '/fleet-profiles', label: 'Fleet Profiles' },
    // { href: '/applications', label: 'Applications' },
  ],
  secondary: [
  ],
};

const utilities = [
  { href: '/page/advertise', label: 'Advertise' },
  { href: '/page/contact-us', label: 'Contact Us' },
  { href: '/newsletters', label: 'Newsletters' },
];

const mobileMenu = {
  primary: [
    ...topics.primary,
    ...topics.expanded,
  ],
  secondary: [
    ...topics.secondary,
    { href: '/newsletters', label: 'Newsletters' },
  ],
};

const desktopMenu = {
  about: [...utilities],
  user: [],
  sections: [
    ...topics.primary,
    ...topics.expanded,
    ...topics.secondary,
  ],
};

module.exports = {
  desktopMenu,
  mobileMenu,
  primary: {
    items: [],
  },
  secondary: {
    items: topics.primary,
  },
  tertiary: {
    items: [],
  },
  footer: {
    items: [
      privacyPolicy,
      { href: 'https://privacyportal-cdn.onetrust.com/dsarwebform/49a9a972-547e-4c49-b23c-4cc77554cacb/cddab1bc-7e58-4eca-a20d-be42716734cf.html', label: 'Do Not Sell or Share My Personal Information', target: '_blank' },
      oneTrust,
      { href: '/page/contact-us', label: 'Contact Us' },
      { href: '/site-map', label: 'Site Map' },
    ],
    topics: topics.primary,
    more: [
      ...utilities,
    ],
  },
};
