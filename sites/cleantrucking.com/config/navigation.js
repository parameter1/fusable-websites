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
    { href: '/regulation-legislation', label: 'Regulation & Legislation' },
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
  { href: 'https://randallreilly.dragonforms.com/loading.do?omedasite=CT_nlsignup', label: 'Newsletters', target: '_blank' },
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
      { href: 'https://privacyportal.onetrust.com/webform/49a9a972-547e-4c49-b23c-4cc77554cacb/3aab0bde-ec0c-4ce9-8e6f-cf12a9a950a5.html', label: 'Do Not Sell or Share My Personal Information', target: '_blank' },
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
