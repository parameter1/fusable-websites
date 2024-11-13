const privacyPolicy = require('./privacy-policy');
const oneTrust = require('./one-trust');

const topics = {
  primary: [
    { href: '/trucks', label: 'Trucks' },
    { href: '/vans', label: 'Vans' },
    { href: '/pickup-trucks', label: 'Pickups' },
    { href: '/alternative-power', label: 'Alternative Power' },
    { href: '/maintenance', label: 'Maintenance' },
    { href: '/products', label: 'Products' },
  ],
  expanded: [
  ],
  secondary: [
  ],
};

const utilities = [
  { href: 'https://www.ccjdigital.com/page/advertise', label: 'Advertise' },
  { href: 'https://www.ccjdigital.com/page/contact-us', label: 'Contact Us' },
  { href: 'https://www.ccjdigital.com/newsletters', label: 'Newsletters' },
];

const mobileMenu = {
  primary: [
    ...topics.primary,
    ...topics.expanded,
  ],
  secondary: [
    ...topics.secondary,
    { href: 'https://www.ccjdigital.com/newsletters', label: 'Newsletters' },
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
      { href: 'https://www.ccjdigital.com/page/contact-us', label: 'Contact Us' },
      { href: '/site-map', label: 'Site Map' },
    ],
    topics: topics.primary,
    more: utilities,
  },
};
