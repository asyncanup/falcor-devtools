'use strict';

/* global chrome */
var log = console.log.bind(console);
log('main');

var panelCreated = false;

function createPanelIfFalcorLoaded() {
  if (panelCreated) {
    log('panel already created');
    return;
  }
  chrome.devtools.inspectedWindow.eval(`!!(
    Object.keys(window.__FALCOR_DEVTOOLS_GLOBAL_HOOK__._models).length ||
    window.Falcor ||
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
      var falcorPanel = null;
      panel.onShown.addListener(function(window) {
        falcorPanel = window.panel;
        log('panel showing', falcorPanel);
        // falcorPanel.resumeTransfer();
      });
      panel.onHidden.addListener(function() {
        if (falcorPanel) {
          log('panel hiding');
          // falcorPanel.hideHighlight();
          // falcorPanel.pauseTransfer();
        }
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

