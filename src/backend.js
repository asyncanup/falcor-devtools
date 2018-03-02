'use strict';

console.log('backend');

window.addEventListener('message', welcome);
function welcome(evt) {
  if (evt.source !== window || evt.data.source !== 'falcor-devtools-content-script') {
    return;
  }

  window.removeEventListener('message', welcome);
  setup(window.__FALCOR_DEVTOOLS_GLOBAL_HOOK__);
}

function setup(hook) {
  var listeners = [];

  var wall = {
    listen(fn) {
      var listener = evt => {
        if (evt.source !== window || !evt.data || evt.data.source !== 'falcor-devtools-content-script' || !evt.data.payload) {
          return;
        }
        fn(evt.data.payload);
      };
      listeners.push(listener);
      window.addEventListener('message', listener);
    },
    send(data) {
      window.postMessage({
        source: 'falcor-devtools-bridge',
        payload: data,
      }, '*');
    },
  };
}
