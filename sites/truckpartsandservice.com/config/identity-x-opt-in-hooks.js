module.exports = {
  onAuthenticationSuccess: {
    productIds: [13],
    promoCode: 'TPS_registration_meter',
  },
  onUserProfileUpdate: {
    appendDemographics: [
      { demographicId: 1483, valueIds: [5142] },
    ],
    promoCode: 'TPS_Profile Updated_Meter',
  },
};
