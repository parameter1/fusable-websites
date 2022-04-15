
import MonoRail from '@randall-reilly/package-theme-monorail/browser';

const CustomProfileComponent = () => import(/* webpackChunkName: "custome-profile-form" */ './profile.vue');
const CustomAuthenticateComponent = () => import(/* webpackChunkName: "custome-authenticate-form" */ './authenticate.vue');

export default (Browser) => {
  MonoRail(
    Browser,
    {
      enableOmedaIdentityX: true,
      identityXComponents: {
        CustomProfileComponent,
        CustomAuthenticateComponent,
      },
    },
  );
};
