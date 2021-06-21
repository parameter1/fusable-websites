const baseConfig = {
  action: 'https://randallreilly.dragonforms.com/loading.do',
  hiddenInputs: [
    { name: 'omedasite', value: 'ccj_subscriptions' },
  ],
};

const defaults = {
  name: 'Don’t Miss Out',
  description: 'Get the business tips, industry insights and trending news every trucking professional needs to know.',
  imagePath: 'static/newsletter-pushdown/ccj-half.png',
  defaultNewsletter: {
    deploymentTypeId: 10,
    name: 'CCJ Daily',
  },
  newsletters: [
    {
      deploymentTypeId: 1,
      name: 'CCJ Equipment Weekly',
      description: 'Roundup of trucking equipment news and reviews',
    },
    {
      deploymentTypeId: 2,
      name: 'CCJ Technology Weekly',
      description: 'Top tech developments in the trucking industry',
    },
    {
      deploymentTypeId: 3,
      name: 'CCJ Weekend Newsletter',
      description: 'The top news of the week in the trucking industry',
    },
  ],
};

module.exports = {
  // uses inline omeda form
  signupBanner: {
    ...defaults,
  },
  pushdown: {
    ...defaults,
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
