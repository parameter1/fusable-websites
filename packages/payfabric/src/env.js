const { cleanEnv, str } = require('envalid');

module.exports = cleanEnv(process.env, {
  PAYFABRIC_DEVICE_ID: str({ desc: 'The PayFabric Device ID.' }),
  PAYFABRIC_DEVICE_PWD: str({ desc: 'The PayFabric Device password.' }),
  PAYFABRIC_GATEWAY_NAME: str({ desc: 'The name of the PayFabric Gateway to use.', default: 'EVO US_CC' }),
});
