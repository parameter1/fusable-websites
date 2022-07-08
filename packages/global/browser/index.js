
import MonoRail from '@parameter1/base-cms-marko-web-theme-monorail/browser';
import dunAndBradstreet from './dun-and-bradstreet';

const ContentMeterTrack = () => import(/* webpackChunkName: "content-meter-tracker" */ './track-content-meter.vue');

export default (Browser) => {
  dunAndBradstreet();
  MonoRail(Browser);
  Browser.register('ContentMeterTrack', ContentMeterTrack);
};
