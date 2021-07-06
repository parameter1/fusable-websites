const baseConfig = {
  action: 'https://randallreilly.dragonforms.com/loading.do',
  hiddenInputs: [
    { name: 'omedasite', value: 'tps_subscriptions' },
  ],
};

const defaults = {
  name: 'Don’t Miss Out',
  description: 'Get the business tips, industry insights and trending news every dealer and distributor needs to know in the <em>TPS</em> newsletter.',
  defaultNewsletter: {
    deploymentTypeId: 13,
    name: 'Trucks Parts Service Daily',
    eventCategory: 'Email Newsletter Signup',
  },
  newsletters: [
    {
      deploymentTypeId: 14,
      name: 'Trucks Parts Service Weekly',
      description: 'The week\'s top aftermarket and dealer industry news',
      eventCategory: 'TPS Weekly Signup',
    },
    {
      deploymentTypeId: 25,
      name: 'Successful Dealer Weekly',
      description: 'Top news and insights for commercial truck dealers',
      eventCategory: 'SD Weekly Signup',
    },
  ],
  demographic: {
    id: 422,
    label: 'Your primary role?',
    values: [
      { id: 803, label: 'Corporate Management/Owner' },
      { id: 804, label: 'Operations/Safety Mgmt' },
      { id: 805, label: 'Maintenance Management' },
      { id: 806, label: 'Technician/Mechanic' },
      { id: 807, label: 'Purchasing/Admin' },
      { id: 808, label: 'Sales' },
      { id: 809, label: 'Engineering' },
      { id: 810, label: 'Other' },
    ],
  },
};

module.exports = {
  // uses inline omeda form
  signupBanner: {
    ...defaults,
    imagePath: 'static/newsletter-pushdown/tps-full.png',
  },
  pushdown: {
    ...defaults,
    description: 'Join 20,000 dealer and aftermarket professionals who get helpful insights and important news delivered straight to their inbox with the <em>Trucks, Parts, Service</em> newsletter.',
    imagePath: 'static/newsletter-pushdown/tps-half.png',
  },

  // links off to seperate omeda dragonform
  signupBannerLarge: {
    ...baseConfig,
    name: 'Don’t Miss Out',
    description: 'Get the business tips, industry insights and trending news every dealer and distributor needs to know in the <em>TPS</em> newsletter.',
  },
  signupFooter: {
    ...baseConfig,
    name: 'Newsletter Just for Dealers and Distributors',
    description: 'Get dealer and aftermarket news, plus safety recalls and product reviews — delivered straight to your inbox.',
  },
};
