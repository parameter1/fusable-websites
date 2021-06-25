const { extractEmbeddedTags } = require('@parameter1/base-cms-embedded-media');
const buildMarkoGlobal = require('@parameter1/base-cms-marko-web/utils/build-marko-global');
const { imageHandler, invalidHandler } = require('@parameter1/base-cms-marko-web/utils/embedded-media');

const fetchOembedPayload = async ({ endpoint, url, attrs }) => `
  <!-- oEmbed ${url} via ${endpoint}: ${attrs} -->
`;

const oembedHandler = async (tag, $global) => {
  const { config } = $global;
  return fetchOembedPayload({
    endpoint: config.oembedMountPoint(),
    url: tag.id,
    attrs: tag.attrs,
  });
};

module.exports = async (body, res, options) => {
  const $global = buildMarkoGlobal(res);
  const handlers = {
    image: imageHandler,
    oembed: oembedHandler,
    invalid: invalidHandler,
  };
  const replacements = await Promise.all(extractEmbeddedTags(body).map(async (tag) => {
    const type = ['image', 'oembed'].includes(tag.type) && tag.isValid() ? tag.type : 'invalid';
    const pattern = tag.getRegExp();
    const replacement = await handlers[type](tag, $global, options);
    return { pattern, replacement };
  }));

  let parsed = body;
  replacements.forEach(({ pattern, replacement }) => {
    parsed = parsed.replace(pattern, replacement);
  });
  return parsed;
};
