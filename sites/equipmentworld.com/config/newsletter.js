const privacyPolicy = require('./privacy-policy');

const baseConfig = {
  action: 'https://randallreilly.dragonforms.com/loading.do',
  hiddenInputs: [
    { name: 'omedasite', value: 'eqw_subscriptions' },
  ],
};

const defaults = {
  enableABTesting: true,
  name: 'Don’t Miss Out',
  description: 'Get the business tips, industry insights and trending news every contractor needs to know in the <span class="newsletter-name">Equipment World</span> newsletter.',
  defaultNewsletter: {
    deploymentTypeId: 22,
    name: 'Equipment World Daily',
    eventCategory: 'Daily Newsletter Subscription',
  },
  privacyPolicy,
  newsletters: [
    {
      deploymentTypeId: 101,
      name: 'Equipment World Video Highlights',
      description: 'The latest videos and insights for construction professionals',
      eventCategory: 'Twice Monthly Video Highlights Subscription',
    },
    {
      deploymentTypeId: 23,
      name: 'Equipment World Weekly',
      description: 'The week\'s top construction and heavy equipment news',
      eventCategory: 'Weekly Equipment World Report Subscription',
    },
    {
      deploymentTypeId: 20,
      name: 'Better Roads Weekly',
      description: 'Roundup of highway project and road construction news',
      eventCategory: 'Weekly Better Roads Subscription',
    },
    {
      deploymentTypeId: 21,
      name: 'Big Iron Dealer Weekly',
      description: 'Top news and insights for construction equipment dealers',
      eventCategory: 'Weekly Big Iron Dealer Subscription',
    },
    {
      deploymentTypeId: 108,
      name: 'Equipment World Weekly Technology',
      description: 'The latest news and information in equipment technology',
      eventCategory: 'Weekly Technology Subscription',
    },
  ],
  demographic: {
    id: 153,
    label: 'Your primary role?',
    values: [
      { id: 265, label: 'Corporate Management/Owner' },
      { id: 266, label: 'Safety/Operations Management' },
      { id: 267, label: 'Maintenance/Equipment Mngmt' },
      { id: 268, label: 'Purchasing/Admin/Marketing' },
      { id: 269, label: 'Technician/Mechanic' },
      { id: 270, label: 'Sales' },
      { id: 271, label: 'Engineering' },
      { id: 272, label: 'Heavy Equipment Operator' },
      { id: 273, label: 'Other' },
    ],
  },
};

module.exports = {
  // uses inline omeda form
  signupBanner: {
    ...defaults,
    imagePath: 'files/base/randallreilly/all/image/static/newsletter-pushdown/eqw-full.png',
  },
  pushdown: {
    ...defaults,
    imagePath: 'files/base/randallreilly/all/image/static/newsletter-pushdown/eqw-half.png',
    name: '55K industry pros get it. Shouldn’t you?',
    description: 'Breaking news, business solutions & equipment debuts delivered straight to your inbox.',
    step1CtaLabel: 'Subscribe',
    step2CtaLabel: 'Subscribe',
  },

  // links off to seperate omeda dragonform
  signupBannerLarge: {
    ...baseConfig,
    name: 'Don’t Miss Out',
    description: 'Get the business tips, industry insights and trending news every contractor needs to know in the <span class="newsletter-name">Equipment World</span> newsletter.',
  },
  signupFooter: {
    ...baseConfig,
    name: 'Newsletter Just for Contractors',
    description: 'Get construction news and insights, plus project tips and equipment reviews — delivered straight to your inbox.',
  },
};
