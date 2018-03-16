'use strict';

/* global chrome */
var log = console.log.bind(console);

const globalHookFn = `
function installGlobalHook(window) {
  var clog = console.log.bind(console);

  if (window.__FALCOR_DEVTOOLS_GLOBAL_HOOK__) {
    clog('hook already installed');
    return;
  }

  const hook = ({
    model: null,
    capturing: false,
    setModel: function(model) {
      window.postMessage({
        source: 'falcor-detector',
      }, '*');
      hook.model = model;
      model._root.onChange = function() {
        clog('model updated', hook.capturing);
        if (hook.capturing) {
          var cache = model.getCache();
          window.postMessage({
            source: 'falcor-model-updated',
            payload: {
              // cache,
              cacheSize: JSON.stringify(cache).length,
            }
          }, '*');
          window.postMessage({
            source: 'falcor-model-updated',
            payload: {
              nodeCounts: hook.getNodeCounts(cache),
            }
          }, '*');
        }
      };
    },
    getNodeCounts: function(cache) {
      const nodeCounts = {};
      Object.keys(cache).forEach((key, i) => {
        nodeCounts[key] = hook.getCounts(cache[key]);
      });
      return nodeCounts;
    },
    getCounts: function(obj) {
      if (typeof obj !== 'object') {
        return 1;
      }
      if (obj.$type) {
        return 1;
      }
      return Object.keys(obj).reduce((sum, key) => sum + hook.getCounts(obj[key]), 0);
    }
  });
  window.__FALCOR_DEVTOOLS_GLOBAL_HOOK__ = hook;
}
`;

var lastDetectionResult;
window.addEventListener('message', function(evt) {
  if (evt.source === window && evt.data && evt.data.source === 'falcor-detector') {
    log('falcor detected');
    lastDetectionResult = {
      falcorDetected: true,
    };
    chrome.runtime.sendMessage(lastDetectionResult);
  }
});
window.addEventListener('pageshow', function(evt) {
  if (!lastDetectionResult || evt.target !== window.document) {
    return;
  }
  log('sending last detection of falcor');
  chrome.runtime.sendMessage(lastDetectionResult);
});
window.addEventListener('message', function(evt) {
  if (evt.source === window &&
      evt.data &&
      evt.data.source === 'falcor-model-updated') {
    chrome.runtime.sendMessage({
      // falcorModelupdated: evt.data.payload.cache,
      cacheSize: evt.data.payload.cacheSize,
      nodeCounts: evt.data.payload.nodeCounts,
    });
  }
});

var js = ';(' + globalHookFn + '(window))';

// This script runs before the <head> element is created, so we add the script
// to <html> instead.
var script = document.createElement('script');
script.textContent = js;
document.documentElement.appendChild(script);
script.parentNode.removeChild(script);

