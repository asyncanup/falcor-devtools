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
    window.__FALCOR_DEVTOOLS_GLOBAL_HOOK__.model ||
    window.falcor ||
    (window.require && require('falcor'))
  )`, (falcorDetected, err) => {
    if (!falcorDetected || panelCreated) {
      log('no falcor detected');
      return;
    }

    log('falcor detected');
    clearInterval(loadCheckInterval);
    panelCreated = true;
    chrome.devtools.panels.create('Falcor', '', 'panel.html', (panel) => {
      log('panel created');
      panel.onShown.addListener((window) => {
        log('panel showing');
        chrome.devtools.inspectedWindow.eval(`
          window.__FALCOR_DEVTOOLS_GLOBAL_HOOK__.capturing = true;
          JSON.stringify(window.__FALCOR_DEVTOOLS_GLOBAL_HOOK__.model.getCache()).length
        `, (cacheSize, err) => {
          chrome.runtime.sendMessage({
            // falcorModelupdated: cache,
            cacheSize
          });
        });
      });
      panel.onHidden.addListener(() => {
        log('panel hiding');
        chrome.devtools.inspectedWindow.eval(`
          window.__FALCOR_DEVTOOLS_GLOBAL_HOOK__.capturing = false
        `);
      });
    });
  });
}

chrome.devtools.network.onNavigated.addListener(() => {
  log('network.onNavigated');
  createPanelIfFalcorLoaded();
});

// Check to see if Falcor has loaded once per second in case Falcor is added
// after page load
var loadCheckInterval = setInterval(function() {
  createPanelIfFalcorLoaded();
}, 1000);

createPanelIfFalcorLoaded();

