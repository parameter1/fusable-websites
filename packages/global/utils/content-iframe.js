const { buildImgixUrl } = require('@parameter1/base-cms-image');
const cheerio = require('cheerio');
const { URL, URLSearchParams } = require('url');

const supportedUrl = src => src.match(/^(http:\/\/|https:\/\/)(player\.vimeo\.com|vimeo\.com|youtu\.be|www\.youtube\.com|youtube\.com)\/([\w/]+)([?].*)?$/gm);

const autoplayUrl = (src) => {
  const url = new URL(src);
  const searchParams = new URLSearchParams(url.search);
  searchParams.set('autoplay', 1);
  url.search = searchParams;
  return url.toString();
};

module.exports = (content) => {
  if (!content.embedCode) return content;
  const { embedCode } = content;
  const $ = cheerio.load(embedCode, {}, false);
  $('iframe').each(function fn() {
    const src = $(this).attr('src');
    if (supportedUrl(src)) {
      const primaryImageSrc = buildImgixUrl(content.primaryImage.src, { w: 640, auto: 'format,compress' });
      const autoplaySrc = autoplayUrl(src);
      const srcdoc = `<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}span{height:1.5em;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.5em black}</style><a href='${autoplaySrc}'><img src='${primaryImageSrc}' alt='${content.name}'><span>&#x25BA;</span></a>`;
      $(this).attr('srcdoc', srcdoc);
    }
  });
  const iframeContent = {
    ...content,
    embedCode: $.html(),
  };
  return iframeContent;
};
