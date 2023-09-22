const fetch = require('node-fetch');
const debug = require('debug')('rigdig');
const { inspect } = require('util');

const API_VERSION = '1.0';
const API_BASEURL = 'https://client-api.rigdigbi.com';
const EXPIRATION_GRACE = 60;

module.exports = class ApiClient {
  constructor({ username, password } = {}) {
    this.username = username;
    this.password = password;
    this.token = null;
    this.expires = 0;
  }

  /**
   * @param {String[]} Vins Truck Vehicle Identification Numbers to look up
   */
  async verify(Vins = []) {
    const params = new URLSearchParams({ vin: Vins });
    return this.request({
      endpoint: `/api/TruckHistory/Verify?${params}`,
      method: 'get',
    });
  }

  /**
   * @param {String[]} Vins Truck Vehicle Identification Numbers to look up
   * @param {Int} RunVinIfDataIsOlderThanDays When to consider a truck report stale (3mo default)
   */
  async create(Vins = [], RunVinIfDataIsOlderThanDays = 90) {
    return this.request({
      endpoint: '/api/TruckHistory/Create',
      body: JSON.stringify({ Vins, RunVinIfDataIsOlderThanDays }),
    });
  }

  async getToken() {
    const now = Math.floor(new Date().valueOf() / 1000);
    const expires = this.expires ? Math.floor(this.expires.valueOf() / 1000) : 0;
    if (!this.token || expires + EXPIRATION_GRACE <= now) this.token = await this.fetchToken();
    return this.token;
  }

  async fetchToken() {
    const result = await fetch(`${API_BASEURL}/api/Account/Login`, {
      method: 'post',
      headers: { 'content-type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ email: this.username, password: this.password }),
    });
    if (!result.ok) {
      const error = new Error(`RigDig authentication unsuccessful: ${result.status} ${result.statusText}`);
      error.code = result.status;
      throw error;
    }
    const { token, expiresIn } = await result.json();
    const expires = new Date();
    expires.setSeconds(expires.getSeconds() + expiresIn);
    this.expires = expires;
    debug(`auth token obtained, expires in ${expiresIn}`);
    return token;
  }

  async request({
    endpoint,
    body,
    headers: reqHeaders = {},
    method = 'post',
  } = {}) {
    const token = await this.getToken();
    const url = `${API_BASEURL}${endpoint}`;
    const headers = {
      ...reqHeaders,
      'api-verison': API_VERSION,
      authorization: `Bearer ${token}`,
      'content-type': 'application/json',
    };
    /** @type {import('node-fetch').Response} */
    const result = await fetch(url, { method, body, headers });

    if (!result.ok) {
      debug(`${method.toUpperCase()} ${url} ERR`, inspect({
        request: {
          headers: JSON.stringify({ ...headers, authorization: 'Bearer [redacted]' }),
          ...(body && { body }),
        },
        response: {
          status: `${result.status} ${result.statusText}`,
          headers: JSON.stringify(result.headers.raw()),
          body: await result.text(),
        },
      }, { depth: null, colors: true }));
      const error = new Error(`RigDig response unsuccessful: ${result.status} ${result.statusText}`);
      error.code = result.status;
      throw error;
    }
    debug(`${method.toUpperCase()} ${url} OK `);
    return result.json();
  }
};
