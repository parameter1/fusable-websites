const privacyPolicy = require('./privacy-policy');

const baseConfig = {
  action: 'https://randallreilly.dragonforms.com/loading.do',
  hiddenInputs: [
    { name: 'omedasite', value: 'CT_nlsignup' },
  ],
  href: 'https://randallreilly.dragonforms.com/loading.do?omedasite=CT_nlsignup',
};

const defaults = {
  name: 'Clean trucking is here to stay. Is your business ready?',
  description: 'The latest zero emission technology, infrastructure and regulatory news and analysis for trucking pros.',
  defaultNewsletter: {
    // Update to CT's
    deploymentTypeId: 119,
    name: 'Clean Trucking Weekly',
    eventCategory: 'Daily Newsletter Subscription',
  },
  privacyPolicy,
  newsletters: [],
  demographic: {
    // Update to CT's
    id: 1496,
    label: 'Your primary role?',
    values: [
      { id: 5270, label: 'Corporate Mangement/Owner' },
      { id: 5273, label: 'Operations/Safety Management' },
      { id: 5272, label: 'Maintenance Management' },
      { id: 5271, label: 'Purchasing/Adkinistrative/Marketing' },
      { id: 5277, label: 'Technician/Mechanic' },
      { id: 5276, label: 'Sales' },
      { id: 5275, label: 'Driver' },
      { id: 5274, label: 'Engineering' },
      { id: 5269, label: 'Recruiting' },
      { id: 5267, label: 'Other' },
      { id: 5268, label: 'None of the Above' },
    ],
  },
};

module.exports = {
  enableABTesting: process.env.INBODY_PUSHDOWN_INJECTION === 'true',
  // uses inline omeda form
  signupBanner: {
    ...defaults,
    imagePath: 'files/base/randallreilly/all/image/static/newsletter-pushdown/ct-full.png',
  },
  pushdown: {
    ...defaults,
    imagePath: 'files/base/randallreilly/all/image/static/newsletter-pushdown/ct-half.png',
    // Update to CT's
    name: 'Clean trucking is here to stay. Is your business ready?',
    description: 'Breaking news on zero-emission vehicles, infrastructure and regulations, alternative fuel tech and more, delivered straight to your inbox.',
    step1CtaLabel: 'Subscribe',
    step2CtaLabel: 'Subscribe',
  },

  // links off to seperate omeda dragonform
  signupBannerLarge: {
    ...baseConfig,
    // Update to CT's
    name: 'Clean trucking is here to stay. Is your business ready?',
    description: 'Breaking news on zero-emission vehicles, infrastructure and regulations, alternative fuel tech and more, delivered straight to your inbox.',
  },
  signupFooter: {
    ...baseConfig,
    // Update to CT's
    name: 'Clean trucking is here to stay. Is your business ready?',
    description: 'Breaking news on zero-emission vehicles, infrastructure and regulations, alternative fuel tech and more, delivered straight to your inbox.',
  },
};
