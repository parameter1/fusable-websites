import Browser from '@parameter1/base-cms-marko-web/browser';
import Shared from '@randall-reilly/package-global/browser';
// import dunAndBradstreet from '@randall-reilly/package-global/browser/dun-and-bradstreet';

const Top250Table = () => import(/* webpackChunkName: "site-top250-table" */ './top250/table.vue');

Shared(Browser);
Browser.register('Top250Table', Top250Table);

// dunAndBradstreet({ debug: true }).handle({ behaviorId: '2672C9123356A8B' });

export default Browser;
