const MarkoWebSearchConfig = require('@parameter1/base-cms-marko-web-search/config');

module.exports = new MarkoWebSearchConfig({
  resultsPerPage: { default: 18 },
  contentTypes: ['Article', 'Blog', 'Company', 'Podcast', 'Product', 'Video', 'Whitepaper'],
  assignedToWebsiteSectionIds: [

  ],
});
