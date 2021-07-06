const baseConfig = {
  action: 'https://randallreilly.dragonforms.com/loading.do',
  hiddenInputs: [
    { name: 'omedasite', value: 'ccj_subscriptions' },
  ],
};

const defaults = {
  name: 'Don’t Miss Out',
  description: 'Get the business tips, industry insights and trending news every trucking professional needs to know.',
  defaultNewsletter: {
    deploymentTypeId: 29,
    name: 'CCJ Daily Report',
    eventCategory: 'Daily Newsletter Subscription',
  },
  newsletters: [
    {
      deploymentTypeId: 30,
      name: 'CCJ Equipment Weekly',
      description: 'Roundup of trucking equipment news and reviews',
      eventCategory: 'Weekly Equipment Subscription',
    },
    {
      deploymentTypeId: 31,
      name: 'CCJ Technology Weekly',
      description: 'Top tech developments in the trucking industry',
      eventCategory: 'Weekly Technology Subscription',
    },
    {
      deploymentTypeId: 32,
      name: 'CCJ Weekend Newsletter',
      description: 'The top news of the week in the trucking industry',
      eventCategory: 'CCJ Weekend Newsletter',
    },
  ],
  demographic: {
    id: 72,
    label: 'Your primary role?',
    values: [
      { id: 114, label: 'Corporate Management/Owner' },
      { id: 115, label: 'Operations/Safety Management' },
      { id: 116, label: 'Maintenance Management' },
      { id: 117, label: 'Purchasing/Administrative/Marketing Management' },
      { id: 118, label: 'Technician/Mechanic' },
      { id: 119, label: 'Sales' },
      { id: 120, label: 'Driver' },
      { id: 121, label: 'Engineering' },
      { id: 122, label: 'Recruiting' },
      { id: 123, label: 'Other' },
    ],
  },
};

module.exports = {
  // uses inline omeda form
  signupBanner: {
    ...defaults,
    imagePath: 'static/newsletter-pushdown/ccj-full.png',
  },
  pushdown: {
    ...defaults,
    imagePath: 'static/newsletter-pushdown/ccj-half.png',
    description: 'Join 80,000 trucking professionals who get helpful insights and important news delivered straight to their inbox with the CCJ newsletter.',
  },

  // links off to seperate omeda dragonform
  signupBannerLarge: {
    ...baseConfig,
    name: 'Don’t Miss Out',
    description: 'Get the business tips, industry insights and trending news every trucking professional needs to know in the CCJ newsletter.',
  },
  signupFooter: {
    ...baseConfig,
    name: 'Newsletter Just for Trucking Professionals',
    description: 'Get trucking news and insights, plus management tips and regulation updates — delivered straight to your inbox.',
  },
};
