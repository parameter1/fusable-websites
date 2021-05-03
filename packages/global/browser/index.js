import GTM from '@parameter1/base-cms-marko-web-gtm/browser';
import GAM from '@parameter1/base-cms-marko-web-gam/browser';
import SocialSharing from '@parameter1/base-cms-marko-web-social-sharing/browser';
import IdentityX from '@parameter1/base-cms-marko-web-identity-x/browser';
import NativeX from '@parameter1/base-cms-marko-web-native-x/browser';
import OmedaRapidIdentityX from '@parameter1/base-cms-marko-web-omeda-identity-x/browser/rapid-identify.vue';

const BlockLoader = () => import(/* webpackChunkName: "global-block-loader" */ './block-loader.vue');
const MenuToggleButton = () => import(/* webpackChunkName: "global-menu-toggle-button" */ './menu-toggle-button.vue');
const NewsletterCloseButton = () => import(/* webpackChunkName: "global-newsletter-close-button" */ './newsletter-close-button.vue');
const WufooForm = () => import(/* webpackChunkName: "global-wufoo-form" */ './wufoo-form.vue');
const TopStoriesMenu = () => import(/* webpackChunkName: "global-top-stories-menu" */ './top-stories-menu.vue');
const CommentToggleButton = () => import(/* webpackChunkName: "global-comment-toggle-button" */ './comment-toggle-button.vue');
const IdentityXAuthenticate = () => import(/* webpackChunkName: "global-identity-x-authenticate" */ './identity-x/authenticate.vue');
const IdentityXCommentStream = () => import(/* webpackChunkName: "global-identity-x-comment-stream" */ './identity-x/comments/stream.vue');

export default (Browser) => {
  GTM(Browser);
  GAM(Browser);
  SocialSharing(Browser);
  NativeX(Browser);
  IdentityX(Browser, {
    CustomAuthenticateComponent: IdentityXAuthenticate,
    CustomCommentStreamComponent: IdentityXCommentStream,
  });

  Browser.register('GlobalBlockLoader', BlockLoader);
  Browser.register('GlobalMenuToggleButton', MenuToggleButton);
  Browser.register('GlobalNewsletterCloseButton', NewsletterCloseButton);
  Browser.register('GlobalTopStoriesMenu', TopStoriesMenu);
  Browser.register('GlobalCommentToggleButton', CommentToggleButton);
  Browser.register('WufooForm', WufooForm);

  Browser.register('OmedaRapidIdentityX', OmedaRapidIdentityX, {
    on: {
      'encrypted-id-found': (encryptedId) => {
        if (encryptedId && window.p1events) {
          window.p1events('setIdentity', `omeda.rrpcd.customer*${encryptedId}~encrypted`);
        }
      },
    },
  });
};
