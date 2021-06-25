const { extractEmbeddedTags } = require('@parameter1/base-cms-embedded-media');
const buildMarkoGlobal = require('@parameter1/base-cms-marko-web/utils/build-marko-global');
const { imageHandler, invalidHandler } = require('@parameter1/base-cms-marko-web/utils/embedded-media');
const fetch = require('node-fetch');

const { OEMBED_URI } = process.env;

const oembedHandler = async (tag) => {
  const url = tag.id;
  const href = `${OEMBED_URI}?url=${encodeURIComponent(url)}`;
  try {
    const r = await fetch(href, { credentials: 'same-origin' });
    const { html } = await r.json();
    return html;
  } catch (e) {
    // nr notice?
    return `<!-- oEmbed ${url} start -->\n<pre>An unexpected error occurred: ${e.message}</pre>\n<!-- oEmbed ${url} end -->`;
  }
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
