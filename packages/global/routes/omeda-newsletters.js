const { Router } = require('express');
const gql = require('graphql-tag');
const { asyncRoute } = require('@parameter1/base-cms-utils');
const jsonErrorHandler = require('@parameter1/base-cms-marko-web/express/json-error-handler');
const { get } = require('@parameter1/base-cms-object-path');
const createError = require('http-errors');
const { json } = require('body-parser');
const omedaConfig = require('../config/omeda');

const RAPID_IDENT = gql`
  mutation RapidIdentifyNewsletterSignup($input: RapidCustomerIdentificationMutationInput!) {
    result: rapidCustomerIdentification(input: $input) {
      id
      encryptedCustomerId
    }
  }
`;

const OPT_IN = gql`
  mutation NewsletterSignupOptIn($input: EmailAddressOptInMutationInput!) {
    emailAddressOptIn(input: $input) {
      emailAddress
    }
  }
`;

module.exports = (app) => {
  const router = Router();
  router.use(json());
  router.post('/1', asyncRoute(async (req, res) => {
    const { email, deploymentTypeId } = req.body;
    if (!email) throw createError(400, 'An email address is required.');
    if (!deploymentTypeId) throw createError(400, 'A deployment type ID is required.');

    const productId = get(omedaConfig, 'rapidIdentification.productId');
    if (!productId) throw createError(500, 'No product ID has been configured.');
    const input = { productId, email };

    // rapidly identify the user.
    const { data } = await req.$omeda.mutate({ mutation: RAPID_IDENT, variables: { input } });
    const { encryptedCustomerId } = data.result;
    // then opt-in the email address.
    const optInInput = {
      emailAddress: email,
      deploymentTypeIds: [deploymentTypeId],
      subscribeToProducts: true,
      source: 'Website Signup Form',
    };
    await req.$omeda.mutate({ mutation: OPT_IN, variables: { input: optInInput } });
    res.json({ rapidIdentId: encryptedCustomerId });
  }));
  router.use(jsonErrorHandler());
  app.use('/__omeda/newsletter-signup', router);
};
