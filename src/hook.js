'use strict';

/* global chrome */
var log = console.log.bind(console);
log('hook');

function installGlobalHook(window) {
  var clog = console.log.bind(console);

  if (window.__FALCOR_DEVTOOLS_GLOBAL_HOOK__) {
    clog('hook already installed');
    return;
  }

  clog('initializing hook');
  const hook = ({
    model: null,
    setModel: function(model) {
      window.postMessage({
        source: 'falcor-detector',
      }, '*');
      hook.model = model;
    },
  });
  window.__FALCOR_DEVTOOLS_GLOBAL_HOOK__ = hook;
}

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

var js = ';(' + installGlobalHook.toString() + '(window))';

// This script runs before the <head> element is created, so we add the script
// to <html> instead.
var script = document.createElement('script');
script.textContent = js;
document.documentElement.appendChild(script);
script.parentNode.removeChild(script);

