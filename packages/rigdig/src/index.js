const { asyncRoute } = require('@parameter1/base-cms-utils');
const { getAsObject } = require('@parameter1/base-cms-object-path');
const { json } = require('express');
const debug = require('debug')('rigdig');

const RigDigAPIClient = require('./client');
const { RIGDIG_USERNAME, RIGDIG_PASSWORD } = require('./env');

const client = new RigDigAPIClient({ username: RIGDIG_USERNAME, password: RIGDIG_PASSWORD });

const createError = (message, code) => {
  const error = new Error(message);
  if (code) error.code = code;
  return error;
};

module.exports = (app) => {
  /**
   * Handles requests for VIN verification
   */
  app.post('/__rigdig/verify', json(), asyncRoute(async (req, res) => {
    try {
      const { body } = await req;
      const { vin } = body;
      debug('verify', vin);
      if (!vin) throw createError('You must provide a VIN to continue.', 400);
      const data = await client.verify([vin]);
      const { dataExists, PoweredByVinLink } = getAsObject(data, 'items.0');
      if (dataExists) {
        res.json({ vin, PoweredByVinLink });
      } else {
        throw createError(`No records found for VIN ${vin}.`, 404);
      }
      res.json(data.items[0]);
    } catch (error) {
      res.status(error.code || 500).json({ error: error.message });
    }
  }));

  /**
   * Handles requests for VIN report creation
   */
  app.post('/__rigdig/create', json(), asyncRoute(async (req, res) => {
    try {
      const { body } = await req;
      const { vin, email, authorization } = body;
      if (!vin) throw createError('You must provide a VIN to continue.', 400);
      if (!email) throw createError('You must provide your email address to continue.', 401);
      if (!authorization) throw createError('You must provide payment to continue.', 402);
      const r = await client.create([vin]);
      debug(r);
      res.json({ ok: true });
    } catch (error) {
      res.status(error.code || 500).json({ error: error.messge });
    }
  }));
};
