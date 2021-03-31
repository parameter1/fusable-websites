const WithNativeXStory = require('@parameter1/base-cms-marko-web-native-x/middleware/with-story');
const { getAsObject } = require('@parameter1/base-cms-object-path');
const template = require('../templates/content/native-x-story');
const queryFragment = require('../graphql/fragments/native-x-story');

module.exports = (app) => {
  const config = getAsObject(app, 'locals.nativeX');
  app.get('/sponsored/:section/:slug/:id', WithNativeXStory({ config, template, queryFragment }));
};
