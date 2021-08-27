const { asyncRoute } = require('@parameter1/base-cms-utils');
const { getAsArray, get } = require('@parameter1/base-cms-object-path');
const cheerio = require('cheerio');
const renderer = require('./renderer');
const client = require('./client');
const query = require('./graphql/equipment-experts-content');
const eeQuery = require('./graphql/equipment-experts-indexes');

const linkTo = (req, p, limit) => {
  const { protocol } = req;
  return `${protocol}://${req.get('host')}${req.baseUrl}?page=${p}&posts_per_page=${limit}`;
};
const filterSearchIndexes = (data, id) => getAsArray(data, 'data.findAll')
  .filter(index => index.contentId === id)
  .map(({ industry, manufacturer, model }) => ({ industry, manufacturer, model }));

function setDefaultWidth(body) {
  const $ = cheerio.load(body, {}, false);
  $('img').each(function fn() {
    const currentImg = $(this)[0];
    if (currentImg) {
      if (!currentImg.attribs['data-src']) { // If the data-src attribute is not set
        // Set the src attribute to the default width of the data-src attribute
        currentImg.attribs.src = currentImg.attribs.src.concat('?w=1440');
      }
    }
  });
  // Return the processed body back to the resolver
  return $.html();
}

module.exports = ({
  sectionAlias = 'equipment-experts',
} = {}) => asyncRoute(async (req, res) => {
  const page = parseInt(get(req, 'query.page', 1), 10);
  const limit = parseInt(get(req, 'query.posts_per_page', 20), 10);
  const skip = (page - 1) * limit;
  const { protocol } = req;
  const pathURL = `${protocol}://${req.get('host')}${req.baseUrl}`;

  const input = {
    sectionAlias,
    pagination: { limit, skip },
    sort: { field: 'published', order: 'desc' },
  };

  const siteId = req.app.locals.config.website('id');
  const variables = { input, siteId };
  const { data } = await req.apollo.query({ query, variables });

  const totalCount = get(data, 'websiteScheduledContent.totalCount');
  const lastPage = Math.ceil(totalCount / limit) || 1;

  const contentIds = getAsArray(data, 'websiteScheduledContent.edges').map(({ node }) => node.id);
  const indexes = await client.query({ query: eeQuery, variables: { contentIds } });

  res.json({
    data: await Promise.all(getAsArray(data, 'websiteScheduledContent.edges').map(async (edge) => {
      const { node } = edge;
      const body = await renderer(node.body, res, { lazyLoadImages: false });
      return {
        post_id: node.id,
        post_name: node.slug,
        post_title: node.name,
        post_content: setDefaultWidth(body),
        post_excerpt: node.teaser,
        featured_image: get(node, 'primaryImage.src'),
        keywords: getAsArray(node, 'keywords.edges').map(e => get(e, 'node.name')),
        key_pairs: filterSearchIndexes(indexes, node.id),
        blog: get(node, 'primarySite.shortName'),
        permalink: get(node, 'siteContext.url'),
        author: getAsArray(node, 'authors.edges').map(e => get(e, 'node.name')).join(', '),
      };
    })),
    links: {
      first: linkTo(req, 1, limit),
      last: linkTo(req, lastPage, limit),
      previous: page > 1 ? linkTo(req, page - 1, limit) : '',
      next: page < lastPage ? linkTo(req, page + 1, limit) : '',
    },
    meta: {
      path: pathURL,
      current_page: page,
      from: skip + 1,
      to: skip + limit,
      total: totalCount,
      last_page: lastPage,
      posts_per_page: limit,
    },
  });
});
