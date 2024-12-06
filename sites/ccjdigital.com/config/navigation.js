const privacyPolicy = require('./privacy-policy');
const oneTrust = require('./one-trust');

const topics = {
  primary: [
    { href: '/trucks', label: 'Trucks' },
    { href: '/business', label: 'Business' },
    { href: '/technology', label: 'Technology' },
    { href: '/workforce', label: 'Workforce' },
    { href: '/products', label: 'Products' },
    { href: '/regulations', label: 'Regulations' },
    { href: '/ccj-top-250', label: 'CCJ Top 250' },
  ],
  expanded: [
    { href: '/alternative-power', label: 'Alt Power' },
  ],
  secondary: [
    { href: '/maintenance', label: 'Maintenance' },
    { href: '/economic-trends/indicators', label: 'Indicators' },
    { href: '/test-drives', label: 'Test Drives' },
    { href: '/preventable-or-not', label: 'Preventable or Not?' },
    { href: '/ccj-innovators', label: 'CCJ Innovators' },
    { href: '/ccj-symposiums', label: 'CCJ Symposiums' },
    { href: '/videos', label: 'Videos' },
    { href: '/white-papers', label: 'White Papers' },
  ],
};

const utilities = [
  { href: '/page/advertise', label: 'Advertise' },
  { href: '/page/contact-us', label: 'Contact Us' },
  { href: 'https://randallreilly.dragonforms.com/loading.do?omedasite=ccj_subscriptions', label: 'Newsletters', target: '_blank' },
];

const mobileMenu = {
  primary: [
    ...topics.primary,
    ...topics.expanded,
  ],
  secondary: [
    ...topics.secondary,
    { href: 'https://randallreilly.dragonforms.com/loading.do?omedasite=ccj_subscriptions', label: 'Newsletters', target: '_blank' },
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
