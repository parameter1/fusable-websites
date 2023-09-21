const privacyPolicy = require('./privacy-policy');

const baseConfig = {
  action: 'https://randallreilly.dragonforms.com/loading.do',
  hiddenInputs: [
    { name: 'omedasite', value: 'ct_subscriptions' },
  ],
  href: 'https://randallreilly.dragonforms.com/loading.do?omedasite=ct_subscriptions',
};

const defaults = {
  name: 'Clean trucking is here to stay. Is your business ready?',
  description: 'Breaking news on zero-emission vehicles, infrastructure and regulations, alternative fuel tech and more, delivered straight to your inbox.',
  defaultNewsletter: {
    // Update to CT's
    deploymentTypeId: 27,
    name: 'Truckers News Daily',
    eventCategory: 'Daily Newsletter Subscription',
  },
  privacyPolicy,
  newsletters: [
    // Update to CT's
    {
      deploymentTypeId: 84,
      name: 'Truckers News Monthly Gear',
      description: '',
      eventCategory: 'Monthly Gear Subscription',
    },
    // Update to CT's
    {
      deploymentTypeId: 28,
      name: 'Truckers News Weekly',
      description: '',
      eventCategory: 'Weekly Newsletter Subscription',
    },
  ],
  demographic: {
    // Update to CT's
    id: 1464,
    label: 'Your primary role?',
    values: [
      { id: 4935, label: 'Leased to for-hire car' },
      { id: 4932, label: 'With Authority for-hire' },
      { id: 4931, label: 'Not for-hire' },
      { id: 4930, label: 'Company Driver' },
      { id: 4936, label: 'School' },
      { id: 4933, label: 'Other' },
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
