const fetch = require('node-fetch');

const hashedCredentials = 'MTEwMDA2NDgxNzoxQjQwNzg5OEE2Q0Q5NzI2';

module.exports = async ({ postalCode }) => {
  const request = await fetch(
    `https://sandbox-rest.avatax.com/api/v2/taxrates/bypostalcode?country=US&postalCode=${postalCode}`,
    {
      method: 'GET',
      headers: {
        'content-type': 'application-json',
        Authorization: `Basic ${hashedCredentials}`,
      },
    },
  );
  if (!request.ok) throw new Error('Bad fetch response, AvaTax');
  const { totalRate } = await request.json();
  // totalRate is a percent as decimal thus this should give us the dollar amount to add
  return Number(Math.ceil((totalRate * 34.99) * 100) / 100);
};
