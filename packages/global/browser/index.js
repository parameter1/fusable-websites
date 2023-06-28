import MonoRail from '@parameter1/base-cms-marko-web-theme-monorail/browser';

export default (Browser) => {
  const { EventBus } = Browser;
  EventBus.$on('identity-x-authenticated', (data) => {
    const {
      id,
      isFirstTimeVerifying,
      source,
      additionalEventData,
    } = data;
    if (isFirstTimeVerifying) {
      const newIdentityXUser = { userId: id, source, additionalEventData };
      window.dataLayer.push({ event: 'identity-x-created-new-user', newIdentityXUser });
    }
  });
  MonoRail(Browser);
};
