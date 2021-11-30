const { asyncRoute } = require('@parameter1/base-cms-utils');
const { get } = require('@parameter1/base-cms-object-path');
const gql = require('graphql-tag');

const query = gql`
  query allPublishedContent($input: AllPublishedContentQueryInput!) {
    allPublishedContent(input: $input){
      edges {
        node {
          id
        }
      }
    }
  }
`;

/**
 * @param {object} req The Express request object.
 * @param {String} sitePostDomain The post domain to query against (ex: wordpress.ccjdigital.posts).
 */
async function findPost(req, sitePostDomain) {
  const { apollo, query: params } = req;
  const variables = { input: { importEntity: `${sitePostDomain}*${params.p}` } };
  const { data } = await apollo.query({ query, variables });
  const { allPublishedContent } = data;
  const edges = get(allPublishedContent, 'edges');
  if (edges.length) {
    return { from: `/?p=${params.p}`, to: `/${edges[0].node.id}`, code: 301 };
  }
  return null;
}

module.exports = ({ sitePostDomain } = {}) => asyncRoute(async (req, res, next) => {
  const { p } = req.query;
  if (!p || !sitePostDomain) return next();
  const redirect = await findPost(req, sitePostDomain);
  if (redirect) return res.redirect(redirect.code, redirect.to);
  return next();
});
