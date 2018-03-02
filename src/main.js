'use strict';

/* global chrome */

var panelCreated = false;

function createPanelIfFalcorLoaded() {
  if (panelCreated) {
    return;
  }
  chrome.devtools.inspectedWindow.eval(`!!(
    Object.keys(window.__FALCOR_DEVTOOLS_GLOBAL_HOOK__._models).length || window.falcor
  )`, function(falcorDetected, err) {
    if (!falcorDetected || panelCreated) {
      return;
    }

    clearInterval(loadCheckInterval);
    panelCreated = true;
    chrome.devtools.panels.create('Falcor', '', 'panel.html', function(panel) {
      var falcorPanel = null;
      panel.onShown.addListener(function(window) {
        falcorPanel = window.panel;
        falcorPanel.resumeTransfer();
      });
      panel.onHidden.addListener(function() {
        if (falcorPanel) {
          falcorPanel.hideHighlight();
          falcorPanel.pauseTransfer();
        }
      });
    });
  });
}

chrome.devtools.network.onNavigated.addListener(function() {
  createPanelIfFalcorLoaded();
});

// Check to see if Falcor has loaded once per second in case Falcor is added
// after page load
var loadCheckInterval = setInterval(function() {
  createPanelIfFalcorLoaded();
}, 1000);

createPanelIfFalcorLoaded();

