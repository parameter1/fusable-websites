const baseConfig = {
  action: 'https://randallreilly.dragonforms.com/loading.do',
  hiddenInputs: [
    { name: 'omedasite', value: 'eqw_subscriptions' },
  ],
};

const defaults = {
  name: 'Don’t Miss Out',
  description: 'Get the business tips, industry insights and trending news every contractor needs to know in the <span class="newsletter-name">Equipment World</span> newsletter.',
  imagePath: 'static/newsletter-pushdown/eqw-half.png',
  defaultNewsletter: {
    deploymentTypeId: 22,
    name: 'Equipment World Daily',
  },
  newsletters: [
    {
      deploymentTypeId: 101,
      name: 'Equipment World Video Highlights',
      description: 'The latest videos and insights for construction professionals',
    },
    {
      deploymentTypeId: 23,
      name: 'Equipment World Weekly',
      description: 'The week\'s top construction and heavy equipment news',
    },
    {
      deploymentTypeId: 20,
      name: 'Better Roads Weekly',
      description: 'Roundup of highway project and road construction news',
    },
    {
      deploymentTypeId: 21,
      name: 'Big Iron Dealer Weekly',
      description: 'Top news and insights for construction equipment dealers',
    },
    {
      deploymentTypeId: 108,
      name: 'Equipment World Weekly Technology',
      description: 'The latest news and information in equipment technology',
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
  },
  pushdown: {
    ...defaults,
    description: 'Join 55,000 construction professionals who get helpful insights and important news delivered straight to their inbox with the <span class="newsletter-name">Equipment World</span> newsletter.',
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
