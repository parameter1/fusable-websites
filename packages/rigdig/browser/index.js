const RigDigWidget = () => import(/* webpackChunkName: "rigdig-widget" */ './widget.vue');

/**
 * @typedef Browser
 * @prop {Function} register
 * @prop {import('@parameter1/base-cms-marko-web/browser/event-bus').default} EventBus
 * @param {Browser} Browser
 */
export default (Browser) => {
  const { EventBus } = Browser;
  Browser.register('RigDigWidget', RigDigWidget, { provide: { EventBus } });

  window.dataLayer = window.dataLayer || [];
  EventBus.$on('thr_lookup', (payload) => {
    window.dataLayer.push({ event: 'thr_lookup', ...payload });
  });
  EventBus.$on('thr_error', (payload) => {
    window.dataLayer.push({ event: 'thr_error', ...payload });
  });
  EventBus.$on('thr_purchase', (payload) => {
    window.dataLayer.push({ event: 'thr_purchase', ...payload });
  });
  EventBus.$on('thr_generate', (payload) => {
    window.dataLayer.push({ event: 'thr_generate', ...payload });
  });
};
