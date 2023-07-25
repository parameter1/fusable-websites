const RigDigAPIClient = require('./client');
const { RIGDIG_USERNAME, RIGDIG_PASSWORD } = require('./env');

module.exports = () => new RigDigAPIClient({
  username: RIGDIG_USERNAME,
  password: RIGDIG_PASSWORD,
});
