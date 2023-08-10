const { asyncRoute } = require('@parameter1/base-cms-utils');
const { json } = require('express');

const PayFabricAPIClient = require('./client');
const {
  PAYFABRIC_DEVICE_ID,
  PAYFABRIC_DEVICE_PWD,
  PAYFABRIC_GATEWAY_NAME,
} = require('./env');

const client = new PayFabricAPIClient({
  deviceId: PAYFABRIC_DEVICE_ID,
  devicePwd: PAYFABRIC_DEVICE_PWD,
  gateway: PAYFABRIC_GATEWAY_NAME,
});

const createError = (message, code) => {
  const error = new Error(message);
  if (code) error.code = code;
  return error;
};

/**
 * @typedef ResponseContext
 * @prop {import('@parameter1/base-cms-marko-web-identity-x/service')} identityX
 *
 * @typedef IdentityXContext
 * @prop {IdxAppContext} application
 * @prop {IdxUserContext} user
 * @prop {Boolean} hasUser
 *
 * @typedef IdxAppContext
 * @typedef IdxUserContext
 */
module.exports = (app) => {
  /**
   * Handles requests to start a payment transaction
   */
  app.post('/__payfabric/create-transaction-token', json(), asyncRoute(async (req, res) => {
    try {
      const { body } = await req;
      const { vin, email } = body;
      if (!vin) throw createError('You must provide a VIN to continue.', 400);
      if (!email) throw createError('You must provide an email address to continue.', 400);

      /** @type {ResponseContext} */
      const { identityX } = res.locals;
      /** @type {IdentityXContext} */
      const ctx = await identityX.loadActiveContext();
      const user = ctx.hasUser ? ctx.user : { email };

      const { Key } = await client.createTransaction({ user, vin });
      const { Token } = await client.createJWT({ transactionId: Key });
      res.json({ Token });
    } catch (error) {
      res.status(error.code || 500).json({ error: error.message });
    }
  }));

  return client;
};
