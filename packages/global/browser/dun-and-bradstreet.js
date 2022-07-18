export default ({ debug = false } = {}) => (() => {
  const DB_ACCOUNT = 'api4253';
  const DB_IMG_SRC = `https://${DB_ACCOUNT}.d41.co/sync/img?req=${DB_ACCOUNT}&cust=112`;
  const DB_SCRIPT_SRC = 'https://cdn-0.d41.co/tags/dnb_coretag_v4.min.js';

  const DB_FIELDS = [
    { key: 'companyName', required: true },
    { key: 'companyZip5', required: true },
    { key: 'companyZip4', required: false },
    { key: 'duns', required: true },
    { key: 'employeesAtLocation', required: true },
    { key: 'industrySic', required: true },
    { key: 'jobFunction', required: true },
    { key: 'parentDuns', required: false },
    { key: 'salesAnnual', required: true },
    { key: 'sicCodes', required: false },
    { key: 'ultimateDuns', required: false },
    { key: 'domain', required: false },
    { key: 'companyTelephone', required: false },
    { key: 'matchSource', required: false },
  ].sort((a, b) => {
    if (a.key > b.key) return 1;
    if (a.key < b.key) return -1;
    return 0;
  });
  const DB_REQUIRED_FIELDS = DB_FIELDS
    .filter(field => field.required === true)
    .map(field => field.key);

  const log = (...args) => {
    // eslint-disable-next-line
    if (debug) console.log('D&B Olytics', ...args);
  };

  const ucFirst = string => `${string[0].toUpperCase()}${string.slice(1)}`;
  const olyticsKey = key => `dnb${ucFirst(key)}`;

  const URI = 'https://jc4f7ji1yg.execute-api.us-east-2.amazonaws.com/default/dun-and-bradstreet-enqueue';

  const supportsBeacon = () => window.navigator && typeof window.navigator.sendBeacon === 'function';

  const insertElement = ({ element, targetTag = 'body' }) => {
    const target = document.getElementsByTagName(targetTag)[0];
    if (!target) throw new Error(`Unable to find an element target using tag ${targetTag}`);
    if (targetTag === 'script') {
      target.parentNode.insertBefore(element, target);
    } else {
      target.appendChild(element);
    }
  };

  let imagePromise;
  const loadImage = () => {
    if (!imagePromise) {
      imagePromise = new Promise((resolve, reject) => {
        const img = document.createElement('img');
        img.height = 1;
        img.width = 1;
        img.style.display = 'none';
        img.src = `${DB_IMG_SRC}&p1=${Date.now()}`;

        img.onload = resolve;
        img.onerror = reject;
        insertElement({ element: img });
      });
    }
    return imagePromise;
  };


  let scriptPromise;
  const loadScript = () => {
    if (!scriptPromise) {
      scriptPromise = new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = DB_SCRIPT_SRC;
        script.async = true;

        script.onload = () => {
          resolve(window.dnbvid);
        };
        script.onerror = reject;

        insertElement({ element: script });
      });
    }
    return scriptPromise;
  };

  const getData = async () => {
    await loadImage();
    const dnb = await loadScript();
    return new Promise((resolve) => {
      dnb.getData(DB_ACCOUNT, 'json', 'T', (data) => {
        resolve(data || {});
      });
    });
  };

  const postJSON = async (body) => {
    const json = JSON.stringify(body);
    if (supportsBeacon()) {
      navigator.sendBeacon(URI, json);
    } else if (window.fetch) {
      await fetch(URI, {
        method: 'POST',
        body: json,
        headers: { 'content-type': 'application/json' },
        credentials: 'omit',
      });
    } else {
      const xhr = new XMLHttpRequest();
      await new Promise((resolve, reject) => {
        xhr.onload = resolve;
        xhr.onerror = reject;
        xhr.open('POST', URI, true);
        xhr.setRequestHeader('content-type', 'application/json');
        xhr.send(json);
      });
    }
  };

  const onWindowLoad = (callback, requestFrame) => {
    if (document.readyState === 'complete') {
      if (requestFrame) {
        requestAnimationFrame(callback);
      } else {
        callback();
      }
    } else {
      window.addEventListener('load', function fn() {
        window.removeEventListener('load', fn);
        if (requestFrame) {
          requestAnimationFrame(callback);
        } else {
          callback();
        }
      });
    }
  };

  const getOlyticsObject = (tries = 0) => new Promise((resolve, reject) => {
    if (tries > 5) {
      reject(new Error('Attempts to load Olytics script has reached maximum.'));
    } else if (window.olytics && window.olytics.fire) {
      resolve(window.olytics);
    } else {
      setTimeout(() => getOlyticsObject(tries + 1).then(resolve).catch(reject), 200);
    }
  });

  const parseCookies = () => document.cookie.split(';').reduce((obj, cookie) => {
    const trimmed = cookie.trim();
    if (!trimmed) return obj;
    const [name, value] = trimmed.split('=').map(v => decodeURIComponent(v.trim()));
    return { ...obj, [name]: value };
  }, {});

  const getOlyticsAnonId = (interval = 500, tries = 0) => new Promise((resolve, reject) => {
    if (tries > 10) {
      reject(new Error('Attempts to load Olytics anonymous ID has reached maximum.'));
    }
    const { oly_anon_id: anonId } = parseCookies();
    if (typeof anonId !== 'undefined') {
      resolve(anonId);
    } else {
      setTimeout(() => {
        getOlyticsAnonId(interval, tries + 1).then(resolve).catch(reject);
      }, interval);
    }
  });

  const getOmedaEncryptedId = () => {
    const { oly_enc_id: encryptedId } = parseCookies();
    return encryptedId && encryptedId !== 'null' ? encryptedId : null;
  };

  const parseJSON = (string) => {
    try {
      return JSON.parse(string);
    } catch (e) {
      return null;
    }
  };

  const setCookie = ({ maxAge, data }) => {
    const body = encodeURIComponent(JSON.stringify(data));
    log('setting cookie', { data, maxAge });
    if (maxAge) {
      document.cookie = `dnbState=${body}; max-age=${maxAge}`;
    } else {
      document.cookie = `dnbState=${body}`;
    }
  };

  const sendToOlytics = async ({ behaviorId }) => {
    // ensure olytics is present and anonymous ID has been found.
    const [olytics, anonId] = await Promise.all([
      getOlyticsObject(),
      getOlyticsAnonId(),
    ]);
    const encryptedId = getOmedaEncryptedId();
    const { dnbState } = parseCookies();
    log({ encryptedId });

    // when an omeda customer is present, bail.
    if (encryptedId && encryptedId !== 'null') {
      log('Omeda encrypted customer ID found. Bailing.');
      return;
    }

    const previousState = parseJSON(dnbState);
    log({ previousState });

    // when previous state is found...
    let bail = false;
    if (previousState) {
      if (previousState.match === false) {
        log('Previous state indicated no match.');
        bail = true;
      } else if (previousState.match === true && previousState.sent === false) {
        log('A previous match was found but not sent to Olytics. @todo: replay if matched fields would now satisfy the requirements.');
        bail = true;
      } else if (previousState.match === true && previousState.sent === true) {
        log('A previous match was sent to Olytics. @todo: replay if new fields were added.');
        const { olyticsAnonId } = previousState;
        if (olyticsAnonId !== anonId) {
          log('The previous Olytics anonymous ID has changed. Resyncing data.', { previousId: olyticsAnonId, currentId: anonId });
        } else {
          bail = true;
        }
      }
    }
    if (bail) {
      log('Bailing from sync.');
      return;
    }

    const currentState = {
      olyticsAnonId: anonId,
      match: false,
      sent: false,
      fields: [],
    };

    const data = await getData();
    log({ dnbData: data });

    if (!data || data.status !== '200') {
      setCookie({ data: currentState });
      await postJSON({ ...data, __olytics: { state: currentState, record: null } });
      return;
    }

    currentState.match = true;
    const record = DB_FIELDS.reduce((o, field) => {
      const value = data[field.key];
      if (value == null || value === '') return o;

      currentState.fields.push(field.key);
      return { ...o, [`${olyticsKey(field.key)}`]: value };
    }, {});

    log({ record });

    const hasRequiredFields = DB_REQUIRED_FIELDS.every(key => record[`${olyticsKey(key)}`]);
    if (!hasRequiredFields) {
      log('D&B data is missing the required fields');
      setCookie({ data: currentState, maxAge: 60 * 60 * 24 * 30 });
      await postJSON({ ...data, __olytics: { state: currentState, record } });
      return;
    }

    olytics.fire({
      behaviorId,
      ...record,
    });
    currentState.sent = true;
    log('Record sent to Olytics', record);

    setCookie({ data: currentState, maxAge: 60 * 60 * 24 * 365 });
    await postJSON({ ...data, __olytics: { state: currentState, record } });
  };

  return {
    handle: ({ behaviorId }) => {
      onWindowLoad(() => {
        sendToOlytics({ behaviorId });
      });
    },
  };
})();
