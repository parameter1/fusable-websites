module.exports = {
  onAuthenticationSuccess: {
    productIds: [33],
    promoCode: 'OV_registration_meter',
  },
  onUserProfileUpdate: {
    appendDemographics: [
      { demographicId: 1480, valueIds: [5132] },
    ],
    promoCode: 'OV_Profile Updated_Meter',
  },
};
