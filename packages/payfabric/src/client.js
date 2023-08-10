const fetch = require('node-fetch');
const debug = require('debug')('payfabric');

module.exports = class ApiClient {
  constructor({
    deviceId,
    devicePwd,
    gatewayName = 'EVO US_CC',
    apiBaseUrl = 'https://sandbox.payfabric.com',
  } = {}) {
    this.deviceId = deviceId;
    this.devicePwd = devicePwd;
    this.gatewayName = gatewayName;
    this.apiBaseUrl = apiBaseUrl;
    this.token = null;
    this.expires = 0;
  }

  async request({
    endpoint,
    body,
    headers: reqHeaders = {},
    method = 'post',
  } = {}) {
    const url = `${this.apiBaseUrl}${endpoint}`;
    const headers = {
      ...reqHeaders,
      authorization: `${this.deviceId}|${this.devicePwd}`,
      'content-type': 'application/json',
    };
    const result = await fetch(url, { method, body, headers });

    if (!result.ok) {
      debug(`${method.toUpperCase()} ${url} ERR`, { body, headers }, result);
      const error = new Error(`PayFabric response unsuccessful: ${result.status} ${result.statusText}`);
      error.code = result.status;
      throw error;
    }
    debug(`${method.toUpperCase()} ${url} OK `);
    return result.json();
  }

  /**
   * @typedef IdentityXUserContext
   * @prop {String} id
   * @prop {String} email
   * @prop {Boolean} verified
   * @prop {Number} verifiedCount
   * @prop {String} givenName
   * @prop {String} familyName
   * @prop {String} displayName
   * @prop {String} organization
   * @prop {String} organizationTitle
   * @prop {String} countryCode
   * @prop {String} regionCode
   * @prop {String} postalCode
   * @prop {String} city
   * @prop {String} street
   * @prop {String} addressExtra
   * @prop {String} phoneNumber
   *
   * @param {Object} args
   * @param {IdentityXUserContext} args.user
   * @param {String} args.vin @todo memo/note?
   */
  async createTransaction({ user, vin }) {
    return this.request({
      endpoint: '/payment/api/transaction/create',
      body: JSON.stringify({
        // @todo additional details, customer reference?
        Amount: 34.99,
        Currency: 'USD',
        Customer: user.id || user.email,
        SetupId: this.gatewayName,
        Shipto: {
          City: user.city,
          Country: user.countryCode,
          Customer: user.id || user.email,
          Email: user.email,
          Line1: user.street,
          Line2: user.addressExtra,
          Phone: user.phoneNumber,
          State: user.regionCode,
          Zip: user.postalCode,
        },
        TrxUserDefine1: `VIN: ${vin}`,
        // ECheckSetupId: 'EVO US_ACH',
        Type: 'Sale',
      }),
    });
  }

  /**
   * Creates a JWT to use with a hosted payment page
   */
  async createJWT({ transactionId }) {
    return this.request({
      endpoint: '/payment/api/jwt/create',
      body: JSON.stringify({ Audience: 'PaymentPage', Subject: transactionId }),
    });
  }
};
