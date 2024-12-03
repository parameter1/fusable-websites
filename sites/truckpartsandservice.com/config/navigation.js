const privacyPolicy = require('./privacy-policy');
const oneTrust = require('./one-trust');

const topics = {
  primary: [
    { href: '/business', label: 'Business' },
    { href: '/workforce', label: 'Workforce' },
    { href: '/economic-trends', label: 'Economic Trends' },
    { href: '/maintenance', label: 'Maintenance' },
    { href: '/aftermarket-truck-parts-suppliers', label: 'Buyers\' Guide' },
  ],
  expanded: [
    { href: '/commentary', label: 'Commentary' },

    { href: '/products', label: 'Products' },
    { href: '/trucks-trailers', label: 'Trucks & Trailers' },
    { href: '/alternative-power', label: 'Alternative Power' },
    { href: '/technology', label: 'Technology' },
    { href: '/regulations', label: 'Regulations' },
    { href: '/distributor-of-the-year', label: 'Distributor of the Year' },
    { href: '/successful-dealer-award', label: 'Successful Dealer Award' },
    { href: '/trailblazer-award', label: 'Trailblazer Award' },
    { href: '/white-papers', label: 'White Papers' },
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
      { href: 'https://privacyportal.onetrust.com/webform/49a9a972-547e-4c49-b23c-4cc77554cacb/3aab0bde-ec0c-4ce9-8e6f-cf12a9a950a5.html', label: 'Do Not Sell or Share My Personal Information', target: '_blank' },
      oneTrust,
      { href: '/page/contact-us', label: 'Contact Us' },
      { href: '/site-map', label: 'Site Map' },
    ],
    topics: topics.primary,
    more: utilities,
  },
};
