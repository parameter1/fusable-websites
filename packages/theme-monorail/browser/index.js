const CommentToggleButton = () => import(/* webpackChunkName: "theme-comment-toggle-button" */ './comment-toggle-button.vue');

export default (Browser) => {
  Browser.register('ThemeCommentToggleButton', CommentToggleButton);
};
