function installGlobalHook(window) {
  if (window.__FALCOR_DEVTOOLS_GLOBAL_HOOK__) {
    return;
  }

  const hook = ({
    _models: {},
    helpers: {},
    inject: function(model) {
      var id = Math.random().toString(16).slice(2);
      hook._models[id] = model;
      hook.emit('model', {id, model});
      return id;
    },
    _listeners: {},
    sub: function(evt, fn) {
      hook.on(evt, fn);
      return () => hook.off(evt, fn);
    },
    on: function(evt, fn) {
      if (!hook._listeners[evt]) {
        hook._listeners[evt] = [];
      }
      hook._listeners[evt].push(fn);
    },
    off: function(evt, fn) {
      if (!hook._listeners[evt]) {
        return;
      }
      var ix = hook._listeners[evt].indexOf(fn);
      if (ix !== -1) {
        hook._listeners[evt].splice(ix, 1);
      }
      if (!hook._listeners[evt].length) {
        hook._listeners[evt] = null;
      }
    },
    emit: function(evt, data) {
      if (hook._listeners[evt]) {
        hook._listeners[evt].map(fn => fn(data));
      }
    },
  });
  Object.defineProperty(window, '__FALCOR_DEVTOOLS_GLOBAL_HOOK__', { value: hook });
}

var lastDetectionResult;

window.addEventListener('message', function(evt) {
  if (evt.source === window && evt.data && evt.data.source === 'falcor-detector') {
    lastDetectionResult = {
      falcorDetected: true,
    };
    chrome.runtime.sendMessage(lastDetectionResult);
  }
});

// NOTE: Firefox WebExtensions content scripts are still alive and not re-injected
// while navigating the history to a document that has not been destroyed yet,
// replay the last detection result if the content script is active and the
// document has been hidden and shown again.
window.addEventListener('pageshow', function(evt) {
  if (!lastDetectionResult || evt.target !== window.document) {
    return;
  }
  chrome.runtime.sendMessage(lastDetectionResult);
});

var detectFalcor = `
window.__FALCOR_DEVTOOLS_GLOBAL_HOOK__.on('model', function(evt) {
  window.postMessage({
    source: 'falcor-detector',
  }, '*');
});
`;

var js = (
  ';(' + installGlobalHook.toString() + '(window))' +
  ';' + detectFalcor
);

// This script runs before the <head> element is created, so we add the script
// to <html> instead.
var script = document.createElement('script');
script.textContent = js;
document.documentElement.appendChild(script);
script.parentNode.removeChild(script);

