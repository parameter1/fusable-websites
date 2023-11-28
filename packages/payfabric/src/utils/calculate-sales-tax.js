const fetch = require('node-fetch');
const { AVATAX_API_HOST, AVATAX_HASHED_CREDENTIALS } = require('../env');

module.exports = async ({ postalCode, pretaxAmount }) => {
  const request = await fetch(
    `${AVATAX_API_HOST}/api/v2/taxrates/bypostalcode?country=US&postalCode=${postalCode}`,
    {
      method: 'GET',
      headers: {
        'content-type': 'application-json',
        Authorization: `Basic ${AVATAX_HASHED_CREDENTIALS}`,
      },
    },
  );
  if (!request.ok) throw new Error('Bad fetch response, AvaTax');
  const { totalRate } = await request.json();
  // totalRate is a percent as decimal thus this should give us the dollar amount to add
  return Number(Math.ceil((totalRate * pretaxAmount) * 100) / 100);
};
