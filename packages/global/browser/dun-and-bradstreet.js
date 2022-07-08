export default () => {
  const DB_ACCOUNT = 'api4253';
  const DB_IMG_SRC = `https://${DB_ACCOUNT}.d41.co/sync/img?req=${DB_ACCOUNT}&cust=112`;
  const DB_SCRIPT_SRC = 'https://cdn-0.d41.co/tags/dnb_coretag_v4.min.js';

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
        resolve(data);
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

  const track = async () => {
    const data = await getData() || {};
    await postJSON(data);
    return data;
  };

  onWindowLoad(() => {
    track().then(data => console.log('D&B data posted', data));
  });
};
