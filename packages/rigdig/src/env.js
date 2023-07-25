const { cleanEnv, str } = require('envalid');

module.exports = cleanEnv(process.env, {
  RIGDIG_PASSWORD: str({ desc: 'The RigDigBI service account password.' }),
  RIGDIG_USERNAME: str({ desc: 'The RigDigBI service account username.' }),
});
