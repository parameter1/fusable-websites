module.exports = (contentMeterState) => {
  if (!contentMeterState) return false;
  if (!contentMeterState.isLoggedIn && !contentMeterState.displayGate) return false;
  if (contentMeterState.isLoggedIn) return false;
  return true;
};
