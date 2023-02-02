
import MonoRail from '@parameter1/base-cms-marko-web-theme-monorail/browser';

const ContentMeterTrack = () => import(/* webpackChunkName: "content-meter-tracker" */ './track-content-meter.vue');

export default (Browser) => {
  const { EventBus } = Browser;
  EventBus.$on('identity-x-authenticated', ({ additionalEventData }) => {
    const { autoSignups } = additionalEventData;
    if (autoSignups) {
      autoSignups.forEach((autoSignup) => {
        window.dataLayer.push({ event: 'identity-x-auto-signup', autoSignup });
      });
    }
  });
  MonoRail(Browser);
  Browser.register('ContentMeterTrack', ContentMeterTrack);
};
