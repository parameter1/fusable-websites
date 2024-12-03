const privacyPolicy = require('./privacy-policy');
const oneTrust = require('./one-trust');

const topics = {
  primary: [
    { href: '/equipment', label: 'Equipment' },
    { href: '/business', label: 'Business' },
    { href: '/regulations', label: 'Regulations' },
    { href: '/life', label: 'Life' },
    { href: '/custom-rigs', label: 'Custom Rigs' },
    { href: '/overdrive-extra', label: 'Overdrive Extra' },
  ],
  expanded: [
    { href: '/channel-19', label: 'Channel 19' },
    { href: '/partners-in-business', label: 'Partners in Business' },
    { href: '/electronic-logging-devices', label: 'ELDs' },
    { href: '/trucking-law', label: 'Trucking Law' },
    { href: '/trucker-of-the-year', label: 'Trucker of the Year' },
    { href: '/small-fleet-champ', label: 'Small Fleet Champ' },
  ],
  secondary: [
    { href: '/reader-rigs', label: 'Reader Rigs' },
    { href: '/overdrive-radio', label: 'Overdrive Radio' },
    { href: '/videos', label: 'Videos' },
    { href: '/white-papers', label: 'Whitepapers' },
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
