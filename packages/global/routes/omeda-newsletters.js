const { Router } = require('express');
const gql = require('graphql-tag');
const { asyncRoute } = require('@parameter1/base-cms-utils');
const jsonErrorHandler = require('@parameter1/base-cms-marko-web/express/json-error-handler');
const { get } = require('@parameter1/base-cms-object-path');
const createError = require('http-errors');
const { json } = require('body-parser');
const omedaConfig = require('../config/omeda');

const { isArray } = Array;

const rapidIdentProductId = get(omedaConfig, 'rapidIdentification.productId');
if (!rapidIdentProductId) throw new Error('No rapid identification product ID has been configured.');

const RAPID_IDENT = gql`
  mutation RapidIdentifyNewsletterSignup($input: RapidCustomerIdentificationMutationInput!) {
    result: rapidCustomerIdentification(input: $input) {
      id
      encryptedCustomerId
    }
  }
`;

module.exports = (app) => {
  const router = Router();
  router.use(json());

  router.post('/', asyncRoute(async (req, res) => {
    const {
      email,
      companyName,
      postalCode,
      deploymentTypeIds,
      demographics,
    } = req.body;
    if (!email) throw createError(400, 'An email address is required.');
    if (!isArray(deploymentTypeIds) || !deploymentTypeIds.length) throw createError(400, 'At least one deployment type ID is required.');

    const input = {
      productId: rapidIdentProductId,
      email,
      deploymentTypeIds,
      ...(companyName && { companyName }),
      ...(postalCode && { postalCode }),
      ...(isArray(demographics) && demographics.length && { demographics }),
    };
    const { data } = await req.$omeda.mutate({ mutation: RAPID_IDENT, variables: { input } });
    const { encryptedCustomerId } = data.result;
    res.json({ encryptedCustomerId });
  }));

  router.use(jsonErrorHandler());
  app.use('/__omeda/newsletter-signup', router);
};
