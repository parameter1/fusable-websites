export default () => (() => {
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

  const getOlyticsObject = async (tries = 0) => new Promise((resolve, reject) => {
    if (tries > 5) {
      reject(new Error('Attempts to load Olytics script has reached maximum.'));
    } else if (window.olytics) {
      resolve(window.olytics);
    } else {
      setTimeout(() => getOlyticsObject(tries + 1), 200);
    }
  });

  const parseCookies = () => document.cookie.split(';').reduce((obj, cookie) => {
    const trimmed = cookie.trim();
    if (!trimmed) return obj;
    const [name, value] = trimmed.split('=').map(v => decodeURIComponent(v.trim()));
    return { ...obj, [name]: value };
  }, {});

  const setCookie = (maxAge) => {
    if (maxAge) {
      document.cookie = `dnbProcessed=true; max-age=${maxAge}`;
    } else {
      document.cookie = 'dnbProcessed=true';
    }
  };

  const sendToOlytics = async () => {
    const { oly_enc_id: encryptedId, dnbProcessed } = parseCookies();
    if (encryptedId && encryptedId !== 'null') return;
    if (dnbProcessed) return;

    const [, data] = await Promise.all([
      getOlyticsObject(),
      getData(),
    ]);

    if (!data || data.status !== '200') {
      setCookie();
      await postJSON({ ...data, __olytics: { valid: false, record: null } });
      return;
    }

    const record = DB_FIELDS.reduce((o, field) => {
      const value = data[field.key];
      if (value == null || value === '') return o;
      return { ...o, [`dnb_${field.key}`]: value };
    }, {});

    const hasRequiredFields = DB_REQUIRED_FIELDS.every(key => record[`dnb_${key}`]);
    if (!hasRequiredFields) {
      setCookie();
      await postJSON({ ...data, __olytics: { valid: false, record } });
      return;
    }

    // olytics.fire({
    //   behaviorId: '',
    //   ...record,
    // });

    // const maxAge = (Date.now() / 1000) + (60 * 60 * 24 * 365);
    // setCookie(maxAge);

    await postJSON({ ...data, __olytics: { valid: true, record } });
  };

  return {
    handle: () => {
      onWindowLoad(() => {
        sendToOlytics();
      });
    },
  };
})();
