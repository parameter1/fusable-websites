const buildMarkoGlobal = require('@parameter1/base-cms-marko-web/utils/build-marko-global');
const sgMail = require('@sendgrid/mail');
const isDev = require('@parameter1/base-cms-marko-core/utils/is-dev');
const { SENDGRID_API_KEY, SENDGRID_DEV_TO } = require('./env');
const template = require('./templates/notification');

if (!SENDGRID_API_KEY) throw new Error('Sendgrid API key is required!');
sgMail.setApiKey(SENDGRID_API_KEY);

const send = ({ html, subject, addresses }) => {
  const { from } = addresses;
  if (!from) throw new Error('Cannot send mail without a from address!');
  const emails = isDev ? { to: SENDGRID_DEV_TO, from } : addresses;
  return sgMail.send({ html, subject, ...emails });
};

/**
 * Generates an HTML email template containing a link to the RigDig report.
 *
 * @typedef {import('./report').RigDigTruckReport} Report
 * @typedef {import('express').Response} Response
 *
 * @param {Response} res
 * @param {Object} args
 * @param {String} args.email         The default addressee emails will be sent to.
 * @param {String} args.transactionId The default addressee emails will be sent to.
 * @param {Report} args.report        The report data to include in the template.
 *
 * @returns {Promise<import('@sendgrid/client/src/response').ClientResponse>}
 */
module.exports = (res, { email, transactionId, report }) => {
  const $global = buildMarkoGlobal(res);

  const { make, model, year } = report.PoweredByVinLink;
  const subject = `Your Overdrive Truck History Report: ${year} ${make} ${model}`;
  const addresses = {
    from: 'Overdrive Truck History Reports <no-reply@overdriveonline.com>',
    to: email,
  };

  const html = template.renderToString({
    $global,
    report,
    subject,
    addresses,
    transactionId,
  });

  return send({ html, subject, addresses });
};
