import MonoRail from '@parameter1/base-cms-marko-web-theme-monorail/browser';

export default (Browser) => {
  const { EventBus } = Browser;
  EventBus.$on('identity-x-login-link-sent', ({ data, source, additionalEventData }) => {
    if (additionalEventData.createdNewUser) {
      const { appUser } = data;
      const newIdentityXUser = { userId: appUser.id, source };
      window.dataLayer.push({ event: 'identity-x-created-new-user', newIdentityXUser });
    }
  });
  EventBus.$on('identity-x-authenticated', ({ additionalEventData }) => {
    const { autoSignups } = additionalEventData;
    if (autoSignups) {
      autoSignups.forEach((autoSignup) => {
        window.dataLayer.push({ event: 'identity-x-auto-signup', autoSignup });
      });
    }
  });
  MonoRail(Browser);
};
