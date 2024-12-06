const privacyPolicy = require('./privacy-policy');
const oneTrust = require('./one-trust');

const topics = {
  primary: [
    { href: '/construction-equipment', label: 'Construction Equipment' },
    { href: '/ag-equipment', label: 'Ag Equipment' },
    { href: '/roadbuilding', label: 'Roadbuilding' },
    { href: '/dealers', label: 'Dealers' },
    { href: '/business', label: 'Business' },
    { href: '/technology', label: 'Technology' },
  ],
  expanded: [
  ],
  secondary: [
    { href: '/construction-equipment/compact-equipment', label: 'Compact Equipment' },
    { href: '/gear', label: 'Gear' },
    { href: '/attachments', label: 'Attachments' },
    { href: '/maintenance', label: 'Maintenance' },
    { href: '/trucks', label: 'Trucks' },
    { href: '/workforce/safety', label: 'Safety' },
    { href: '/safety-watch', label: 'Safety Watch' },
    { href: '/videos', label: 'Videos' },
    { href: '/white-papers', label: 'White Papers' },
  ],
};

const utilities = [
  { href: '/page/advertise', label: 'Advertise' },
  { href: '/page/contact-us', label: 'Contact Us' },
  { href: 'https://randallreilly.dragonforms.com/loading.do?omedasite=eqw_subscriptions', label: 'Newsletters', target: '_blank' },
];

const mobileMenu = {
  primary: [
    ...topics.primary,
    ...topics.expanded,
  ],
  secondary: [
    ...topics.secondary,
    { href: 'https://randallreilly.dragonforms.com/loading.do?omedasite=eqw_subscriptions', label: 'Newsletters', target: '_blank' },
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
      { href: '/videos', label: 'Videos' },
    ],
  },
};
