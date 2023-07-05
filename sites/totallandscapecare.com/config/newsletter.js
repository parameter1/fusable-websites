const privacyPolicy = require('./privacy-policy');

const baseConfig = {
  action: 'https://randallreilly.dragonforms.com/loading.do',
  hiddenInputs: [
    { name: 'omedasite', value: 'tlc_subscriptions' },
  ],
};

const defaults = {
  name: 'Don’t Miss Out',
  description: 'Get the business tips, industry insights and trending news every landscaping professional needs to know in the <em>TLC</em> newsletter.',
  defaultNewsletter: {
    deploymentTypeId: 17,
    name: 'Total Landscape Care Daily',
    eventCategory: 'Daily Newsletter Subscription',
  },
  privacyPolicy,
  newsletters: [
    {
      deploymentTypeId: 18,
      name: 'Total Landscape Care Weekly',
      description: 'The weeks top landscaping news and insights',
      eventCategory: 'Weekly Newsletter Subscription',
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
    imagePath: 'files/base/randallreilly/all/image/static/newsletter-pushdown/tlc-full.png',
  },
  pushdown: {
    ...defaults,
    imagePath: 'files/base/randallreilly/all/image/static/newsletter-pushdown/tlc-half.png',
    name: '14K landscapers get it. Shouldn’t you?',
    description: 'Business strategies, equipment news & project ideas delivered straight to your inbox.',
    step1CtaLabel: 'Subscribe',
    step2CtaLabel: 'Subscribe',
  },

  // links off to seperate omeda dragonform
  signupBannerLarge: {
    ...baseConfig,
    name: 'Don’t Miss Out',
    description: 'Get the business tips, industry insights and trending news every landscaping professional needs to know in the <em>TLC</em> newsletter. ',
  },
  signupFooter: {
    ...baseConfig,
    name: 'Newsletter Just for Landscapers',
    description: 'Get landscaping news and insights, plus how-to guides and equipment reviews — delivered straight to your inbox.',
  },
};
