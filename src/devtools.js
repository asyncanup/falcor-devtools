'use strict';

/* global chrome */
var log = console.log.bind(console);
log('devtools');

var panelCreated = false;

function createPanelIfFalcorLoaded() {
  if (panelCreated) {
    log('panel already created');
    return;
  }
  chrome.devtools.inspectedWindow.eval(`!!(
    Object.keys(window.__FALCOR_DEVTOOLS_GLOBAL_HOOK__._models).length ||
    window.falcor ||
    (window.require && require('falcor'))
  )`, function(falcorDetected, err) {
    if (!falcorDetected || panelCreated) {
      log('no falcor detected');
      return;
    }

    log('falcor detected');
    clearInterval(loadCheckInterval);
    panelCreated = true;
    chrome.devtools.panels.create('Falcor', '', 'panel.html', function(panel) {
      log('panel created');
      panel.onShown.addListener(function(window) {
        log('panel showing');
      });
      panel.onHidden.addListener(function() {
        log('panel hiding');
      });
    });
  });
}

chrome.devtools.network.onNavigated.addListener(function() {
  log('network.onNavigated');
  createPanelIfFalcorLoaded();
});

// Check to see if Falcor has loaded once per second in case Falcor is added
// after page load
var loadCheckInterval = setInterval(function() {
  createPanelIfFalcorLoaded();
}, 1000);

createPanelIfFalcorLoaded();

