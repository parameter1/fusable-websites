const privacyPolicy = require('./privacy-policy');
const oneTrust = require('./one-trust');

const topics = {
  primary: [
    { href: '/trucks', label: 'Trucks' },
    { href: '/news', label: 'News' },
    { href: '/jobs', label: 'Jobs' },
    { href: '/gear', label: 'Gear' },
    { href: '/how-to', label: 'How-To' },
    { href: '/life', label: 'Life' },
    { href: '/videos', label: 'Videos' },
    { href: '/shedrives', label: 'SheDrives' },

  ],
  expanded: [
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
      { href: 'https://randallreilly.com/legal/website-terms-and-conditions/', label: 'Terms of Use', target: '_blank' },
      privacyPolicy,
      { href: 'https://randallreilly.com/legal/dsar/', label: 'Do Not Sell or Share My Personal Information', target: '_blank' },
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
