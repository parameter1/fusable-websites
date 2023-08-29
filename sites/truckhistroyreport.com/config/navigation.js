const privacyPolicy = require('./privacy-policy');
const oneTrust = require('./one-trust');

const topics = {
  primary: [
    { href: 'https://www.overdriveonline.com/equipment', label: 'Equipment' },
    { href: 'https://www.overdriveonline.com/business', label: 'Business' },
    { href: 'https://www.overdriveonline.com/regulations', label: 'Regulations' },
    { href: 'https://www.overdriveonline.com/life', label: 'Life' },
    { href: 'https://www.overdriveonline.com/custom-rigs', label: 'Custom Rigs' },
    { href: 'https://www.overdriveonline.com/gear', label: 'Gear' },
  ],
  expanded: [
    { href: 'https://www.overdriveonline.com/channel-19', label: 'Channel 19' },
    { href: 'https://www.overdriveonline.com/partners-in-business', label: 'Partners in Business' },
    { href: 'https://www.overdriveonline.com/overdrive-extra', label: 'Overdrive Extra' },
  ],
  secondary: [
    { href: 'https://www.overdriveonline.com/reader-rigs', label: 'Reader Rigs' },
    { href: 'https://www.overdriveonline.com/overdrive-radio', label: 'Overdrive Radio' },
    { href: 'https://www.overdriveonline.com/videos', label: 'Videos' },
    { href: 'https://www.overdriveonline.com/white-papers', label: 'Whitepapers' },
  ],
};

const utilities = [
  { href: 'https://www.overdriveonline.com/page/advertise', label: 'Advertise' },
  { href: 'https://www.overdriveonline.com/page/contact-us', label: 'Contact Us' },
  { href: 'https://www.overdriveonline.com/newsletters', label: 'Newsletters' },
];

const mobileMenu = {
  user: [],
  primary: [
    ...topics.primary,
    ...topics.expanded,
  ],
  secondary: [
    ...topics.secondary,
    { href: 'https://www.overdriveonline.com/newsletters', label: 'Newsletters' },
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
      { href: 'https://www.overdriveonline.com/page/contact-us', label: 'Contact Us' },
      { href: 'https://www.overdriveonline.com/site-map', label: 'Site Map' },
    ],
    topics: topics.primary,
    more: [
      ...utilities,
      { href: 'https://www.overdriveonline.com/videos', label: 'Videos' },
    ],
  },
};
