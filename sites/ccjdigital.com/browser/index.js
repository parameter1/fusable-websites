import Browser from '@parameter1/base-cms-marko-web/browser';
import Shared from '@randall-reilly/package-global/browser';

const Top250Table = () => import(/* webpackChunkName: "site-top250-table" */ './top250/table.vue');

Shared(Browser);
Browser.register('Top250Table', Top250Table);

export default Browser;
