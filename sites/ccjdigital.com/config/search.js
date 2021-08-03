const MarkoWebSearchConfig = require('@parameter1/base-cms-marko-web-search/config');

module.exports = new MarkoWebSearchConfig({
  resultsPerPage: { default: 18 },
  contentTypes: ['Article', 'Blog', 'Company', 'Podcast', 'Product', 'Video', 'Whitepaper'],
  assignedToWebsiteSectionIds: [
    71572,
    71567,
    71572,
    71568,
    71569,
    71570,
    71574,
    71571,
    71573,
    71576,
  ],
});
