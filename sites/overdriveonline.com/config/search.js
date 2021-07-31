const MarkoWebSearchConfig = require('@parameter1/base-cms-marko-web-search/config');

module.exports = new MarkoWebSearchConfig({
  resultsPerPage: { default: 18 },
  contentTypes: ['Article', 'Blog', 'Company', 'Podcast', 'Product', 'Video', 'Whitepaper'],
  assignedToWebsiteSectionIds: [
    71371,
    71357,
    71356,
    71376,
    71382,
    71379,
    71358,
    71352,
    71362,
    71359,
    71375,
    71351,
  ],
});
