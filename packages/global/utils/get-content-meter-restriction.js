module.exports = (contentMeterState) => {
  if (!contentMeterState) return false;
  if (!contentMeterState.isLoggedIn && !contentMeterState.displayGate) return false;
  if (contentMeterState.isLoggedIn && !contentMeterState.requiresUserInput) return false;
  return true;
};
