import Browser from '@parameter1/base-cms-marko-web/browser';
import Shared from '@randall-reilly/package-global/browser';
import dunAndBradstreet from '@randall-reilly/package-global/browser/dun-and-bradstreet';

Shared(Browser);

dunAndBradstreet({ debug: true }).handle({ behaviorId: '6567F8013245A7F' });

export default Browser;
