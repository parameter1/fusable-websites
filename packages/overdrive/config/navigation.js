const privacyPolicy = require('./privacy-policy');
const oneTrust = require('./one-trust');

const showInbodyLAPromo = (process.env.SHOW_INBODY_LOAD_ANALYZER_PROMO === 'true') || false;

const topics = {
  primary: [
    { href: '/equipment', label: 'Equipment' },
    { href: '/business', label: 'Business' },
    { href: '/regulations', label: 'Regulations' },
    { href: '/life', label: 'Life' },
    { href: '/custom-rigs', label: 'Custom Rigs' },
    { href: '/gear', label: 'Gear' },
  ],
  expanded: [
    { href: '/channel-19', label: 'Channel 19' },
    { href: '/partners-in-business', label: 'Partners in Business' },
    { href: '/overdrive-extra', label: 'Overdrive Extra' },
  ],
  secondary: [
    { href: '/reader-rigs', label: 'Reader Rigs' },
    { href: '/overdrive-radio', label: 'Overdrive Radio' },
    ...(
      showInbodyLAPromo
        ? [{ href: 'https://www.overdriveonline.com/load-analyzer', label: 'Load Profit Analyzer' }]
        : [{ href: '/video', label: 'Video' }, { href: '/whtiepapers', label: 'Whitepapers' }]
    ),
    { href: 'https://truckhistory.overdriveonline.com/', label: 'Truck History Report', target: '_blank' },
  ],
};

const utilities = [
  { href: '/page/advertise', label: 'Advertise' },
  { href: '/page/contact-us', label: 'Contact Us' },
  { href: '/newsletters', label: 'Newsletters' },
];

const mobileMenu = {
  user: [],
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
      { href: '/videos', label: 'Videos' },
      { href: 'https://truckhistory.overdriveonline.com/', label: 'Truck History Report', target: '_blank' },
    ],
  },
};
