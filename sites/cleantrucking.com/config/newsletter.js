const privacyPolicy = require('./privacy-policy');

const baseConfig = {
  action: 'https://randallreilly.dragonforms.com/loading.do',
  hiddenInputs: [
    { name: 'omedasite', value: 'tn_subscriptions' },
  ],
  href: 'https://randallreilly.dragonforms.com/loading.do?omedasite=tn_subscriptions',
};

const defaults = {
  name: 'Don’t Miss Out',
  description: 'Get the job alerts, industry insights and trending news every truck driver needs to know in the <em>Truckers News</em> newsletter.',
  defaultNewsletter: {
    deploymentTypeId: 27,
    name: 'Truckers News Daily',
    eventCategory: 'Daily Newsletter Subscription',
  },
  privacyPolicy,
  newsletters: [
    {
      deploymentTypeId: 84,
      name: 'Truckers News Monthly Gear',
      description: '',
      eventCategory: 'Monthly Gear Subscription',
    },
    {
      deploymentTypeId: 28,
      name: 'Truckers News Weekly',
      description: '',
      eventCategory: 'Weekly Newsletter Subscription',
    },
    {
      deploymentTypeId: 26,
      name: 'She Drives Weekly',
      description: '',
      eventCategory: 'She Drives Newsletter Subscription',
    },
  ],
  demographic: {
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
    imagePath: 'files/base/randallreilly/all/image/static/newsletter-pushdown/tn-full.png',
  },
  pushdown: {
    ...defaults,
    imagePath: 'files/base/randallreilly/all/image/static/newsletter-pushdown/tn-half.png',
    name: '40K truck drivers get it. Shouldn’t you?',
    description: 'News company drivers need for life on the road, delivered straight to your inbox.',
    step1CtaLabel: 'Subscribe',
    step2CtaLabel: 'Subscribe',
  },

  // links off to seperate omeda dragonform
  signupBannerLarge: {
    ...baseConfig,
    name: 'Don’t Miss Out',
    description: 'Get the job alerts, industry insights and trending news every truck driver needs to know in the <em>Truckers News</em> newsletter. ',
  },
  signupFooter: {
    ...baseConfig,
    name: 'Newsletter Just for Truck Drivers',
    description: 'Get trucking news and insights, plus job alerts and trending gear — delivered straight to your inbox.',
  },
};
