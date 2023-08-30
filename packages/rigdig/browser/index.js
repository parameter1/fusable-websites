const RigDigWidget = () => import(/* webpackChunkName: "rigdig-widget" */ './widget.vue');

export default (Browser) => {
  Browser.register('RigDigWidget', RigDigWidget);
};
