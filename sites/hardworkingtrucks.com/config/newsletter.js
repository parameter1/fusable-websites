const privacyPolicy = require('./privacy-policy');

const baseConfig = {
  action: 'https://randallreilly.dragonforms.com/loading.do',
  hiddenInputs: [
    { name: 'omedasite', value: 'hwt_subscriptions' },
  ],
};

const defaults = {
  name: 'Don’t Miss Out',
  description: 'Get the business tips, industry insights and trending news every truck owner needs to know in the <em>Hard Working Trucks</em> newsletter.',
  defaultNewsletter: {
    deploymentTypeId: 24,
    name: 'Hard Working Trucks Weekly',
    eventCategory: 'HWT Weekly Newsletter',
  },
  privacyPolicy,
  newsletters: [],
  demographic: {
    id: 1463,
    label: 'Your primary role?',
    values: [
      { id: 4924, label: 'Corporate Management/Owner' },
      { id: 4925, label: 'Safety/Operations Management' },
      { id: 4923, label: 'Maintenance/Equipment Mngmt' },
      { id: 4922, label: 'Purchasing/Admin/Marketing' },
      { id: 4929, label: 'Technician/Mechanic' },
      { id: 4928, label: 'Sales' },
      { id: 4927, label: 'Engineering' },
      { id: 4926, label: 'Heavy Equipment Operator' },
      { id: 4920, label: 'Other' },
    ],
  },
};

module.exports = {
  // uses inline omeda form
  signupBanner: {
    ...defaults,
    imagePath: 'files/base/randallreilly/all/image/static/newsletter-pushdown/hwt-full.png',
  },
  pushdown: {
    ...defaults,
    imagePath: 'files/base/randallreilly/all/image/static/newsletter-pushdown/hwt-half.png',
    name: '99K truck owners get it. Shouldn’t you?',
    description: 'Pickup, commercial van & Class 3-8 truck news & reviews delivered straight to your inbox.',
    step1CtaLabel: 'Subscribe',
    step2CtaLabel: 'Subscribe',
  },

  // links off to seperate omeda dragonform
  signupBannerLarge: {
    ...baseConfig,
    name: 'Don’t Miss Out',
    description: 'Get the business tips, industry insights and trending news every truck owner needs to know in the <em>Hard Working Trucks</em> newsletter.',
  },
  signupFooter: {
    ...baseConfig,
    name: 'Hardworking Trucks Daily',
    description: 'Sign up for the <span class="newsletter-name">Hardworking Trucks Daily</span> to keep up with...',
  },
};
